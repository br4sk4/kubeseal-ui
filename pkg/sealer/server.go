package sealer

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"time"
)

var (
	config Configuration
)

func StartServer() {
	if err := config.Get(); err != nil {
		log.Fatal(err)
		return
	}

	mux := http.NewServeMux()
	mux.Handle("/", http.HandlerFunc(uiHandler))

	mux.Handle("/api/seal", http.StripPrefix("/api/seal", http.HandlerFunc(sealEnpointHandler)))
	mux.Handle("/api/seal/", http.StripPrefix("/api/seal", http.HandlerFunc(sealEnpointHandler)))
	mux.Handle("/api/reencrypt", http.StripPrefix("/api/reencrypt", http.HandlerFunc(reencryptEnpointHandler)))
	mux.Handle("/api/reencrypt/", http.StripPrefix("/api/reencrypt", http.HandlerFunc(reencryptEnpointHandler)))
	mux.Handle("/api/projects", http.StripPrefix("/api/projects", http.HandlerFunc(projectsEndpoointHandler)))
	mux.Handle("/api/projects/", http.StripPrefix("/api/projects", http.HandlerFunc(projectsEndpoointHandler)))

	if config.Server.DynamicProjectDiscovery.Enabled {
		period, err := time.ParseDuration(config.Server.DynamicProjectDiscovery.Period)
		if err != nil {
			log.Fatal(err)
			return
		}

		config.DiscoverProjects()
		go func() {
			channel := time.Tick(period)
			for range channel {
				config.DiscoverProjects()
			}
		}()
	}

	log.Default().Printf("Listening on :%s ...", config.Server.Port)
	if err := http.ListenAndServe(fmt.Sprintf(":%s", config.Server.Port), mux); err != nil {
		log.Fatal(err)
	}
}

func uiHandler(w http.ResponseWriter, r *http.Request) {
	fileServer := http.FileServer(http.Dir(config.Frontend.Directory))
	fileServer.ServeHTTP(w, r)
}

func sealEnpointHandler(w http.ResponseWriter, r *http.Request) {
	body, err := io.ReadAll(r.Body)
	if !checkError(w, err, "error while reading secret") {
		return
	}

	var requestBody SealingRequestBody
	if !checkError(w, json.Unmarshal(body, &requestBody), "error while unmarshalling request body") {
		return
	}

	cluster, controllerNamespace, controllerName, err := getControllerInfo(requestBody.Project)
	if !checkError(w, err, "error while searching project") {
		return
	}

	sealedSecret, err := Seal(cluster, controllerNamespace, controllerName, []byte(requestBody.RawSecret))
	if !checkError(w, err, "error while sealing secret") {
		return
	}

	responseBody, err := json.Marshal(SealingResponseBody{SealedSecret: string(sealedSecret)})
	if !checkError(w, err, "error while marashalling response body") {
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write(responseBody)
}

func reencryptEnpointHandler(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
}

func projectsEndpoointHandler(w http.ResponseWriter, r *http.Request) {
	projects := make([]ProjectSelection, 0)

	for _, project := range config.Server.Projects {
		projects = append(projects, ProjectSelection{
			Identifier: project.Hash(),
			Label:      project.ProjectName + " (" + project.ClusterName + ")",
		})
	}

	responseBody, err := json.Marshal(ProjectsResponseBody{Projects: projects})
	if !checkError(w, err, "error while marashalling response body") {
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write(responseBody)
}

func getControllerInfo(projectId string) (*Cluster, string, string, error) {
	for _, project := range config.Server.Projects {
		if project.Hash() == projectId {
			return project.Cluster, project.ControllerNamespace, project.ControllerName, nil
		}
	}

	return nil, "", "", fmt.Errorf("could not find project")
}

func checkError(w http.ResponseWriter, err error, message string) (ok bool) {
	if err != nil {
		handleError(w, fmt.Errorf("%s: %s", message, err))
		ok = false
	} else {
		ok = true
	}
	return ok
}

func handleError(w http.ResponseWriter, err error) {
	log.Default().Println(err)
	w.WriteHeader(http.StatusInternalServerError)
	w.Write([]byte(err.Error()))
}

type SealingRequestBody struct {
	Project   string `json:"project"`
	RawSecret string `json:"rawSecret"`
}

type SealingResponseBody struct {
	SealedSecret string `json:"sealedSecret"`
}

type ProjectsResponseBody struct {
	Projects []ProjectSelection `json:"projects"`
}

type ProjectSelection struct {
	Identifier string `json:"id"`
	Label      string `json:"label"`
}

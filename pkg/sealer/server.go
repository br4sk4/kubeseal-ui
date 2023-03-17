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

	log.Print(fmt.Sprintf("Listening on :%s ...", config.Server.Port))
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

	controllerNamespace, controllerName, err := getControllerInfo(requestBody.Project)
	if !checkError(w, err, "error while searching project") {
		return
	}

	sealedSecret, err := Seal(controllerNamespace, controllerName, []byte(requestBody.RawSecret))
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
	projects := make([]string, 0)

	for _, project := range config.Server.Projects {
		projects = append(projects, project.Name)
	}

	responseBody, err := json.Marshal(ProjectsResponseBody{Projects: projects})
	if !checkError(w, err, "error while marashalling response body") {
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write(responseBody)
}

func getControllerInfo(projectName string) (string, string, error) {
	for _, project := range config.Server.Projects {
		if project.Name == projectName {
			return project.ControllerNamespace, project.ControllerName, nil
		}
	}

	return "", "", fmt.Errorf("could not find project")
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
	Projects []string `json:"projects"`
}

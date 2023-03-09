package sealer

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
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

	var requestBody RequestBody
	if !checkError(w, json.Unmarshal(body, &requestBody), "error while unmarshalling request body") {
		return
	}

	sealedSecret, err := Seal("sealed-secrets", "sealed-secrets", []byte(requestBody.RawSecret))
	if !checkError(w, err, "error while sealing secret") {
		return
	}

	responseBody, err := json.Marshal(ResponseBody{SealedSecret: string(sealedSecret)})
	if !checkError(w, err, "error while marashalling response body") {
		return
	}
	json.Marshal(ResponseBody{SealedSecret: string(sealedSecret)})

	w.WriteHeader(http.StatusOK)
	w.Write(responseBody)
}

func reencryptEnpointHandler(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
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

type RequestBody struct {
	Project   string `json:"project"`
	RawSecret string `json:"rawSecret"`
}

type ResponseBody struct {
	SealedSecret string `json:"sealedSecret"`
}

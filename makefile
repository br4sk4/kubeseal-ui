.PHONY: backend
backend:
	GOOS=linux GOARCH=amd64 go build -o ./.dist/backend/kubeseal-ui .

.PHONY: frontend
frontend:
	yarn --cwd ./frontend run build

.PHONY: docker-image
docker-image: backend frontend
	docker build -t naffets/kubeseal-ui -f dockerfile.local .
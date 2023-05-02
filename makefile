.PHONY: backend
backend:
	GOOS=linux GOARCH=amd64 go build -o ./.dist/backend/kubeseal-ui .

.PHONY: frontend
frontend:
	yarn --cwd ./frontend install
	yarn --cwd ./frontend run build

.PHONY: docker-image
docker-image:
	docker build -t br4sk4/kubeseal-ui -f docker/local.Dockerfile .

.PHONY: local-build
local-build: backend frontend docker-image

.PHONY: docker-build
docker-build:
	docker build -t br4sk4/kubeseal-ui -f docker/github.Dockerfile .

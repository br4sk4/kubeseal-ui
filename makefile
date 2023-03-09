.PHONY: backend
backend:
	GOOS=linux GOARCH=amd64 go build -o ./.dist/backend/webseal .

.PHONY: frontend
frontend:
	yarn --cwd ./frontend run build

.PHONY: docker-image
docker-image: backend frontend
	docker build -t naffets/webseal -f dockerfile.local .
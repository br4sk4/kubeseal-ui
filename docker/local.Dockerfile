FROM alpine:3.17

# copy ditribution files
COPY .dist/backend/kubeseal /usr/local/bin
COPY .dist/backend/webseal opt/webseal/webseal
COPY ../.dist/frontend /opt/webseal/.dist/frontend/

WORKDIR /opt/webseal/
ENTRYPOINT ["webseal"]
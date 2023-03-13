FROM golang:1.20.0-alpine3.16 AS go-builder

WORKDIR /usr/local/src/kubeseal-ui

COPY .. .

RUN go build -o ./.dist/backend/kubeseal-ui kubeseal-ui

##################################################

FROM node:19.6-alpine3.16 AS node-builder

WORKDIR /usr/local/src/kubeseal-ui/

COPY .. .

WORKDIR /usr/local/src/kubeseal-ui/frontend

RUN yarn install
RUN yarn run build

##################################################

FROM alpine:3.17

# copy module files for CVE scanning / dependency analysis.
COPY --from=go-builder /usr/local/src/kubeseal-ui/go.mod /usr/local/src/kubeseal-ui/go.sum /usr/local/src/kubeseal-ui/
COPY --from=node-builder /usr/local/src/kubeseal-ui/frontend/package.json /usr/local/src/kubeseal-ui/frontend/yarn.lock /usr/local/src/kubeseal-ui/

# copy distribution files
COPY --from=go-builder /usr/local/src/kubeseal-ui/.dist/backend/kubeseal-ui /usr/local/bin/kubeseal-ui
COPY --from=node-builder /usr/local/src/kubeseal-ui/.dist/frontend /opt/kubeseal-ui/frontend

# copy configuration files
COPY --from=go-builder /usr/local/src/kubeseal-ui/.conf/config.docker.yaml /etc/kubeseal-ui/config.yaml

# set permissions
RUN chown 1001:1001 /etc/kubeseal-ui
RUN chmod 0755 /usr/local/bin/kubeseal-ui

# configure run
USER 1001:1001
CMD ["kubeseal-ui", "--config", "/etc/kubeseal-ui/config.yaml"]
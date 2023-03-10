FROM alpine:3.17 AS kubeseal-loader

ENV KUBESEAL_VERSION=0.19.5
WORKDIR /usr/local/src/kubeseal
RUN wget https://github.com/bitnami-labs/sealed-secrets/releases/download/v$KUBESEAL_VERSION/kubeseal-$KUBESEAL_VERSION-linux-amd64.tar.gz
RUN tar -xvzf kubeseal-$KUBESEAL_VERSION-linux-amd64.tar.gz kubeseal

##################################################

FROM golang:1.20.0-alpine3.16 AS go-builder

WORKDIR /usr/local/src/webseal

COPY .. .

RUN go build -o ./.dist/backend/webseal webseal

##################################################

FROM node:19.6-alpine3.16 AS node-builder

WORKDIR /usr/local/src/webseal/

COPY .. .

WORKDIR /usr/local/src/webseal/frontend

RUN yarn install
RUN yarn run build

##################################################

FROM alpine:3.17

# copy module files for CVE scanning / dependency analysis.
COPY --from=go-builder /usr/local/src/webseal/go.mod /usr/local/src/webseal/go.sum /usr/local/src/webseal/
COPY --from=node-builder /usr/local/src/webseal/frontend/package.json /usr/local/src/webseal/frontend/yarn.lock /usr/local/src/webseal/

# copy distribution files
COPY --from=kubeseal-loader /usr/local/src/kubeseal/kubeseal /usr/local/bin/kubeseal
COPY --from=go-builder /usr/local/src/webseal/.dist/backend/webseal /usr/local/bin/webseal
COPY --from=node-builder /usr/local/src/webseal/.dist/frontend /opt/webseal/frontend

# copy configuration files
COPY --from=go-builder /usr/local/src/webseal/.conf/config.docker.yaml /etc/webseal/config.yaml

# set permissions
RUN chown 1001:1001 /etc/webseal
RUN chmod 0755 /usr/local/bin/kubeseal
RUN chmod 0755 /usr/local/bin/webseal

# configure run
USER 1001:1001
CMD ["webseal", "--config", "/etc/webseal/config.yaml"]
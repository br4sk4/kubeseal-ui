FROM alpine:3.17

# copy module files for CVE scanning / dependency analysis.
COPY go.mod go.sum /usr/local/src/kubeseal-ui/
COPY frontend/package.json frontend/yarn.lock /usr/local/src/kubeseal-ui/

# copy distribution files
COPY .dist/backend/kubeseal-ui /usr/local/bin/kubeseal-ui
COPY .dist/frontend /opt/kubeseal-ui/frontend

# copy configuration files
COPY .conf/config.docker.yaml /etc/kubeseal-ui/config.yaml

# set permissions
RUN chown 1001:1001 /etc/kubeseal-ui
RUN chmod 0755 /usr/local/bin/kubeseal-ui

# configure run
USER 1001:1001
CMD ["kubeseal-ui", "--config", "/etc/kubeseal-ui/config.yaml"]
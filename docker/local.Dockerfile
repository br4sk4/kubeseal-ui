FROM alpine:3.17

# copy ditribution files
COPY .dist/backend/kubeseal /usr/local/bin
COPY .dist/backend/kubeseal-ui opt/kubeseal-ui/kubeseal-ui
COPY ../.dist/frontend /opt/kubeseal-ui/.dist/frontend/

WORKDIR /opt/kubeseal-ui/
ENTRYPOINT ["kubeseal-ui"]
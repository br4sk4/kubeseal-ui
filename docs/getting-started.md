# Getting Started

## Projects

KubeSeal UI follows a concept of projects. That means a project refers to a sealed secret controller, which is
responsible for managing secrets in one or more namespaces. A project configuration consits of the following attributes:

```json
{
    "name": "project-name",
    "controllerName": "sealed-secrets-controller-name",
    "controllerNamespace": "sealed-secrets-controller-namespace"
}
```

Configured projects are picked up by KubeSeal UI and are selectable in the web interface. The following examples will
demonstrate two options to configure projects.

---
<br />

### Static Project Configuration

With the static project configuration you configure your projects in the helm values, so they get deployed into the
container via a config file.

1. Deploy Sealed-Secrets with defaults.

    ```bash
    kubectl create namespace sealed-secrets
    helm install sealed-secrets sealed-secrets/sealed-secrets -n sealed-secrets
    ```

2. Create a values.yaml file for KubeSeal UI with a staticly configured project.

    ```yaml
    config:
      useStaticProjectConfiguration: true
      projects:
        - name: "sealed-secrets"
          controllerName: "sealed-secrets"
          controllerNamespace: "sealed-secrets"
    ```

3. Deploy KubeSeal UI with the defined values.yaml.

    ```shell
    kubectl create namespace kubeseal-ui
    helm install kubeseal-ui kubeseal-ui/kubeseal-ui -n kubeseal-ui -f values.yaml
    ```

---
<br />

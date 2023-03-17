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

With the static project configuration you configure your projects in the helm values, so they get mounted into the
container via a config file.

1. Deploy Sealed-Secrets with defaults.

    ```bash
    kubectl create namespace sealed-secrets
    helm install sealed-secrets sealed-secrets/sealed-secrets -n sealed-secrets
    ```

2. Create a values.yaml file for KubeSeal UI with a staticly configured project.

    ```yaml
    config:
      staticProjectConfiguration:
        enabled: true
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

### Dynamic Project Discovery

With the dynamic project discovery you just need to label/annotate the namespace where the sealed secrets controller is
located. KubeSeal UI will periodically search for those namespaces and pick them up into its configuration.

1. Create a namespace.yaml file with labels and annotations.

    ```yaml
    apiVersion: v1
    kind: Namespace
    metadata:
      name: "sealed-secrets"
      labels:
        kubeseal-ui: "sealed-secrets"
      annotations:
        kubeseal-ui/projectName: "sealed-secrets"
        kubeseal-ui/controllerName: "sealed-secrets"
    ```

2. Deploy Sealed-Secrets with defaults.

    ```bash
    kubectl apply -f namespace.yaml
    helm install sealed-secrets sealed-secrets/sealed-secrets -n sealed-secrets
    ```

3. Create a values.yaml file for KubeSeal UI with a staticly configured project.

    ```yaml
    config:
      staticProjectConfiguration:
        enabled: false
      dynamicProjectConfiguration:
        enabled: true
        period: 15m
    ```

4. Deploy KubeSeal UI with the defined values.yaml.

    ```shell
    kubectl create namespace kubeseal-ui
    helm install kubeseal-ui kubeseal-ui/kubeseal-ui -n kubeseal-ui -f values.yaml
    ```

---
<br />

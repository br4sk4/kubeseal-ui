# Getting Started

## Projects

KubeSeal UI follows a concept of projects. That means a project refers to a sealed secret controller, which is
responsible for managing secrets in one or more namespaces. A project configuration consits of the following attributes:

```json
{
    "id": "project-identifier",
    "name": "visible-project-name",
    "controllerName": "sealed-secrets-controller-name",
    "controllerNamespace": "sealed-secrets-controller-namespace"
}
```

Configured projects are picked up by KubeSeal UI and are selectable in the web interface. The following examples will
demonstrate two options to configure projects.

### Static Project Configuration

!!! note
    to be documented

### Dynamic Project Discovery

!!! note
    to be documented

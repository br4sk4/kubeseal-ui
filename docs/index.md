# Overview

A web frontend for Sealed Secrets by Bitnami

## What is KubeSeal UI?

Kubeseal UI is a web interface for Sealed Secrets by Bitnami. Sealed Secrets lets you manage your K8s secrets in git by
encrypting/sealing your Secrets and decrypting them once they get deployed to your K8s cluster. To seal your secrets you
usually use the corresponding command line tool kubeseal and KubeSeal UI wraps it into a web interface.

![KubeSeal UI](assets/screenshot.png)

## Why KubeSeal UI?

In a simple scenario where you have one K8s cluster with one sealed secrets controller deployed KubeSeal UI just gives
you a web interface to seal your secrets. There may be complexer scenarios with one K8s cluster and multiple sealed
secret controllers deployed or even a multi cluster environment with one or more sealed secret controllers deployed on
each cluster. With KubeSeal UI users of Sealed Secrets don't have to set up the kubeseal command line tool and
connections to one or more clusters to seal their secrets. You configure all clusters and available sealed secret
controllers in one single place.

## Getting Started

### Quickstart

Prerequisites:

- running and accessible K8s cluster (e.g. kind)
- Helm installed
- kubectl installed and configured

<br />
Install the Helm repositories:

```bash
helm repo add sealed-secrets https://bitnami-labs.github.io/sealed-secrets
helm repo add kubeseal-ui https://br4sk4.github.io/kubeseal-ui/charts
```

<br />
Deploy Sealed Secrets:

For further configuration of Sealed Secrets please refer to the
official [repository](https://github.com/bitnami-labs/sealed-secrets).

```bash
kubectl create namespace sealed-secrets
helm install sealed-secrets sealed-secrets/sealed-secrets -n sealed-secrets
```

<br />
Deploy KubeSeal-ui:

For further configuration and more complex scenarios refer to the [Getting Started Guide](getting-started.md).

```bash
kubectl create namespace kubeseal-ui
helm install kubeseal-ui kubeseal-ui/kubeseal-ui -n kubeseal-ui
```

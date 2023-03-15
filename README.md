# KubeSeal UI

A web frontend for Sealed Secrets by Bitnami

> **Warning**
> KubeSeal UI is actually in development

<br />

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/br4sk4/kubeseal-ui/publish-dev.yaml?style=plastic)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/br4sk4/kubeseal-ui?style=plastic)
[<img src="https://img.shields.io/static/v1?label=Docs&logo=Gitbook&logoColor=white&message=KubeSeal UI&color=blue&style=plastic">](https://br4sk4.github.io/kubeseal-ui/docs)
[<img src="https://img.shields.io/static/v1?label=GitHub&logo=Github&message=Sealed%20Secrets&color=blue&style=plastic">](https://github.com/bitnami-labs/sealed-secrets)

## What is KubeSeal UI?

Kubeseal UI is a web interface for Sealed Secrets by Bitnami. Sealed Secrets lets you manage your K8s secrets in git by
encrypting/sealing your Secrets and decrypting them once they get deployed to your K8s cluster. To seal your secrets you
usually use the corresponding command line tool kubeseal and KubeSeal UI wraps it into a web interface.

![KubeSeal UI](docs/assets/screenshot.png)

## Why KubeSeal UI?

In a simple scenario where you have one K8s cluster with one sealed secrets controller deployed KubeSeal UI just gives
you a web interface to seal your secrets. There may be complexer scenarios with one K8s cluster and multiple sealed
secret controllers deployed or even a multi cluster environment with one or more sealed secret controllers deployed on
each cluster. With KubeSeal UI users of Sealed Secrets don't have to set up the kubeseal command line tool and
connections to one or more clusters to seal their secrets. You configure all clusters and available sealed secret
controllers in one single place.

## Documentation

To learn more about KubeSeal UI and getting
started, [go to the documentation](https://br4sk4.github.io/kubeseal-ui/docs).

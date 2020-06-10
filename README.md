# Sample Node Application Web Server

This is a basic `Hello World` node application web server.

This is used to test container platform builds such as K8s, Messos (DC/OS) etc.

## Prerequisites

- Container Platform

## Deployment

To deploy locally:

```shell
docker run -d -p 80:80 saidsef/node-webserver
```

To deploy in Kubernetes:

```shell
kubectl apply -k ./deployments/
```

> Remeber to update `/deployments/ingress.yml` ingress hostname

Then navigate to:

```shell
http://hostname.tld
```

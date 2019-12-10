# Sample Node Application Web Server

This is a basic `Hello World` node application web server.

I use this container to test DC/OS and Kubernetes (K8S) platform builds.

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

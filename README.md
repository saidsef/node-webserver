# Sample Node Application Web Server

This is a basic `Hello World` node application web server.

This is used to test container platform builds such as Kubernetes and other container schedulers.

## Prerequisites

- Container Platform

## Deployment

To deploy locally:

```shell
docker run -d -p 8080:8080 docker.io/saidsef/node-webserver:latest
```

To deploy in Kubernetes:

```shell
kubectl apply -k ./deployments/
```

```shell
kubectl port-forward svc/server 8080:8080
```

> To access from `Ingress`, remeber to update file `/deployments/ingress.yml` hostname

Then navigate to:

```shell
http://localhost:8080
```

## Source

Our latest and greatest source of Jenkins can be found on [GitHub](#deployment). Fork us!

## Contributing

We would :heart:  you to contribute by making a [pull request](https://github.com/saidsef/node-webserver/pulls).

Please read the official [Contribution Guide](./CONTRIBUTING.md) for more information on how you can contribute.

#!/bin/sh

BUILD_ID=$1

info() {
  echo """
    This is a containerised NodeJS Application Webserver
  """
}

cleanup() {
  echo "Remove dorment containers"
  if [ -n "$(docker ps -a -q | head -n 1)" ]; then
    docker stop "$(docker ps -a -q)" || true
    docker rm -f "$(docker ps -a -q)" || true
  else
    echo "There is no dorment containers"
  fi
}

delete() {
  echo "Remove dorment images"
  if [ -n "$(docker images -a -q | head -n 1)" ]; then
    docker rmi -f "$(docker images -a -q)" || true
  else
    echo "There is no dorment images"
  fi
}

build() {
  echo "Building image"
  docker build --build-arg "BUILD_ID=${BUILD_ID}" -t docker.io/saidsef/node-webserver .
}


push() {
  echo "Pushing image to docker hub"
  docker push docker.io/saidsef/node-webserver
  echo $?
}

main() {
  info
  cleanup
  build
  push
}

main

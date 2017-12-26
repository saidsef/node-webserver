FROM node:7-alpine
MAINTAINER Said Sef <saidsef@gmail.com> (http://saidsef.co.uk/)

ARG BUILD_ID=""

ENV BUILD_ID ${BUILD_ID:-'0.0.0.0-boo!'}

WORKDIR /code
COPY ./app/ /code

RUN npm install && \
    npm shrinkwrap

#  create build id
RUN echo ${BUILD_ID} > build_id.txt

EXPOSE 80
CMD npm run start

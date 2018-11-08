FROM node:7-alpine
MAINTAINER Said Sef <saidsef@gmail.com> (saidsef.co.uk/)

ARG BUILD_ID=""
ARG PORT=""

ENV BUILD_ID ${BUILD_ID:-'0.0.0.0-boo!'}
ENV PORT ${PORT:-80}
WORKDIR /code
COPY ./app/ /code

RUN npm install && \
    npm shrinkwrap

#  create build id
RUN echo ${BUILD_ID} > build_id.txt

EXPOSE $PORT
CMD npm run start

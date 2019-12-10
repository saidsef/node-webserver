FROM node:13-alpine
MAINTAINER Said Sef <saidsef@gmail.com> (saidsef.co.uk/)

ARG BUILD_ID=""
ARG PORT=""

ENV NODE_ENV production
ENV NPM_CONFIG_FETCH_RETRIES 10
ENV NPM_CONFIG_LOGLEVEL warn
ENV BUILD_ID ${BUILD_ID:-'0.0.0.0-boo!'}
ENV PORT ${PORT:-8080}

WORKDIR /code
COPY ./app/ /code

RUN echo ${BUILD_ID} > build_id.txt
RUN apk add --update --no-cache curl && \
    rm -rfv /var/cache/apk/* && \
    yarn install && \
    yarn check && \
    yarn autoclean --init && \
    yarn autoclean --force && \
    chown -R nobody .

USER nobody

EXPOSE ${PORT}

# health check endpoint
HEALTHCHECK --interval=30s --timeout=10s CMD curl --fail 'http://localhost:${PORT}/' || exit 1

CMD ["run", "start"]
ENTRYPOINT ["npm"]

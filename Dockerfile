FROM node:18-alpine3.16

LABEL maintainer="Said Sef <saidsef@gmail.com> (saidsef.co.uk/)"

ARG BUILD_ID=""
ARG PORT=""

ENV NODE_ENV production
ENV NPM_CONFIG_FETCH_RETRIES 10
ENV NPM_CONFIG_LOGLEVEL warn
ENV BUILD_ID ${BUILD_ID:-'0.0.0.0-boo!'}
ENV PORT ${PORT:-8080}

WORKDIR /code
COPY ./app/ /code

RUN echo "${BUILD_ID}" > build_id.txt
RUN apk add --update --no-cache curl && \
    rm -rfv /var/cache/apk/* && \
    yarn install --prod && \
    yarn check && \
    yarn autoclean --init && \
    yarn autoclean --force && \
    chown -R nobody .

USER nobody

EXPOSE ${PORT}

# health check endpoint
HEALTHCHECK --interval=60s --timeout=10s CMD curl --fail 'http://localhost:${PORT}/healthz' || exit 1

CMD /usr/local/bin/node index.js

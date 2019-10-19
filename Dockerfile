FROM node:12-alpine
MAINTAINER Said Sef <saidsef@gmail.com> (saidsef.co.uk/)

ARG BUILD_ID=""
ARG PORT=""

ENV BUILD_ID ${BUILD_ID:-'0.0.0.0-boo!'}
ENV PORT ${PORT:-80}

WORKDIR /code
COPY ./app/ /code

RUN echo ${BUILD_ID} > build_id.txt
RUN npm install && \
    npm shrinkwrap

EXPOSE ${PORT}

# health check endpoint
HEALTHCHECK --interval=30s --timeout=10s CMD curl --fail 'http://localhost:${PORT}/' || exit 1

CMD ["run", "start"]
ENTRYPOINT ["npm"]

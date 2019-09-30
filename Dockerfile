FROM node:12-alpine
MAINTAINER Said Sef <saidsef@gmail.com> (saidsef.co.uk/)

ARG BUILD_ID=""
ARG PORT=""

ENV BUILD_ID ${BUILD_ID:-'0.0.0.0-boo!'}
ENV PORT ${PORT:-80}

WORKDIR /code
COPY ./app/ /code

RUN echo ${BUILD_ID} > build_id.txt
RUN rm -rf /var/cache/apk/* && \
    yarn install && \
    yarn check && \
    yarn autoclean --init && \
    yarn autoclean --force

EXPOSE ${PORT}

CMD ["run", "start"]
ENTRYPOINT ["npm"]

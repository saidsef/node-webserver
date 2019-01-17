FROM node:10-alpine
MAINTAINER Said Sef <saidsef@gmail.com> (saidsef.co.uk/)

ARG BUILD_ID=""
ARG PORT=""

ENV BUILD_ID ${BUILD_ID:-'0.0.0.0-boo!'}
ENV PORT ${PORT:-80}

WORKDIR /code
COPY ./app/ /code

RUN echo ${BUILD_ID} > build_id.txt
RUN npm install && \
    npm shrinkwrap && \
    chown -R nobody:nobody .

USER nobody

EXPOSE ${PORT}

CMD ["npm", "run", "start"]

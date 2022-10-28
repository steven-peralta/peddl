FROM node:18 as build
ARG PROJECT

WORKDIR /build
COPY package.json .
COPY tsconfig.json .
COPY .yarnrc.yml .
COPY ./packages/common/package.json packages/common/
COPY ./packages/$PROJECT/package.json packages/$PROJECT/
RUN yarn
COPY ./packages/common packages/common/
COPY ./packages/$PROJECT packages/$PROJECT
RUN yarn $PROJECT compile
RUN cp ./packages/$PROJECT/dist/server.js .

FROM node:18
WORKDIR /srv
COPY --from=0 /build/server.js ./
CMD ["node", "server.js"]

FROM node:18 as build
ARG BUILD_CONTEXT

WORKDIR /build
COPY package.json .
COPY tsconfig.json .
COPY .yarnrc.yml .
COPY ./packages/common/package.json packages/common/
COPY ./packages/$BUILD_CONTEXT/package.json packages/$BUILD_CONTEXT/
RUN yarn
COPY ./packages/common packages/common/
COPY ./packages/$BUILD_CONTEXT packages/$BUILD_CONTEXT
RUN yarn $BUILD_CONTEXT compile
RUN cp ./packages/$BUILD_CONTEXT/dist/server.js .

FROM node:18
WORKDIR /srv
COPY --from=0 /build/server.js ./
CMD ["node", "server.js"]

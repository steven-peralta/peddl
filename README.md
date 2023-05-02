# ![logo.png](doc/images/logo.png)
Built by [Jade](https://github.com/Jbennett1498) and [Steven](https://github.com/steven-peralta).

Peddl is a people finder application for musicians to connect and collaborate with other musicians.
Developed over the course of a semester at St. Edward's University.

Features:

* Real-time messaging and notifications
* Profile search and matching
* Account creation and validation

# Packages
The monorepo is separated into four packages:

* `/api` - API server built on top of Express and MongoDB.
* `/wss` - WebSocket server powered by socket.io
* `/ui` - Peddl UI built with React
* `/common` - Common code shared between the three above.

# Setting up
Setting up the workspace is as simple as cloning the repository.

The API and WSS code base have these npm scripts:
* `build` - Builds the TypeScript project and its dependencies (e.g. the common pkg)
* `rollup` - Produces a minimized production-ready build
* `clean` - Cleans the project
* `compile` - Utility script that runs `build` and `rollup` in one go
* `start` - Starts the production-ready service
* `dev` - Starts the dev server

The UI was bootstrapped with CRA, so it is configured with npm scripts provided by React:
* `dev` - Starts the webpack based dev server
* `build` - Builds the project for production
* `test` - Runs tests (spoiler alert: there aren't any)

There are convenience scripts that allows you to run any of these scripts from the root of the repo. You can use them by
specifying the package before the script you're trying to run e.g. `yarn api start` or `yarn ui dev`.

Before running any code locally, it's recommended to have a .env configured with the following variables:

```.dotenv
MONGO_ROOT_USERNAME="admin"
MONGO_ROOT_PASSWORD="mongo"
MONGO_DB="peddl"
NODE_ENV="development"
MONGO_URI="mongodb://admin:mongo@mongo:27017/"
```

MongoDB is required to be up and running before starting the WSS and API servers. 
docker-compose.yml makes setting that up easy: `docker compose up mongo`

# Preview
![profile_default.png](doc/images/profile_default.png)
![messages.png](doc/images/messages.png)
![message_thread.png](doc/images/message_thread.png)

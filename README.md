# Project Name

> Pithy project description

## Team

* **Product Owner**: teamMember
* **Scrum Master**: teamMember
* **Development Team Members**: teamMember, teamMember

## Table of Contents

1.  [Usage](#Usage)
1.  [Requirements](#requirements)
1.  [Development](#development)
    1.  [Installing Dependencies](#installing-dependencies)
    1.  [Tasks](#tasks)
1.  [Team](#team)
1.  [Contributing](#contributing)

## Usage

> Some usage instructions

## Requirements

* Node 0.10.x
* Redis 2.6.x
* Postgresql 9.1.x
* etc
* etc

## Development

### Installing Dependencies

From within the root directory:

```sh
sudo npm install -g bower
npm install
bower install
```

### Roadmap

a
View the project roadmap [here](LINK_TO_PROJECT_ISSUES)

TO START BACKEND
cd thesis-api
npm run buildEnv
npm run setup:socket-server
npm run setup:rest-server
npm run setup:s3-server
npm run start

TO SETUP DATABASE
cd thesis-api
cd rest-server
cd index.js
uncomment line 5
comment line 5

TO START FRONT
cd thesis-ui
npm run buildEnv
npm run setup:server
npm run setup:client
npm run build
npm run start:server

TO INSERT SEED DATA
go to thesis-api/rest-server/src/index.js
--uncomment line 5, and then comment line 5
go to the app, and create 3 users
--after creating 5 users,
--uncomment line 7 and 8 on thesis-api/rest-server/src/index.js
--and comment them after

Front end code dependent on localstorage
convert to be Redux depedent vs LocalStorage
MVP++ --> ComponentWillMount get data if store prop is null after page refresh

## Contributing

See [CONTRIBUTING.md](_CONTRIBUTING.md) for contribution guidelines.

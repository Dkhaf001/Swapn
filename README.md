# Project Name

> Swap'n - Inspired by craigslist, Swap’n is a user friendly application for bartering, developed with modern web technology. Swap’n is for anyone who wants to swap their unused items for something else. Users will be able to communicate with other users, make offers and deals through our app.

## Team

* **Development Team Members**: Daniel Khafi, Eddie Roh, Shayne Song, Elbert Chao

## Table of Contents

1.  [Usage](#Usage)
1.  [Installing Dependencies](#installing-dependencies)
1.  [Team](#team)

## Usage

> Some usage instructions

## Installing Dependencies

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

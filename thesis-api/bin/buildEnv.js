const fs = require('fs');
const _ = require('lodash');

const envVariables = require('../config/.env.sample');
console.log(envVariables)
const createENVFile = (directory, variables) => {
  _.each(variables, (variable) => {
    fs.appendFileSync(`../${directory}/.env`, variable + '\n');
  })
}

const buildEnv = () => {
  _.each(envVariables, (value, key) => {
    // console.log('this is the key and value', key, value)
    fs.writeFileSync(`../${key}/.env`, '')
    createENVFile(key, value);
  });
}

buildEnv();
require('dotenv').config();

import { Pool } from 'pg';
import Promise from 'bluebird';


const config = {
    user: process.env.NODE_ENV ,
    host: process.env.NODE_ENV,
    database: process.env.NODE_ENV ,
    password: process.env.NODE_ENV,
    port: process.env.NODE_ENV,
    max: 20
  };
  
//To connect Posgress
const db = new Pool(config);
/**
 * config for pg pool 
 * limiting number of connections to 20
 * must end connection after each query => database.end()
 */


db.on("connect", () => {
  success("successfully connected to pg", config.database);
});

db.on("remove", client => {
  success("successfully removed client= ", client);
});

db.on("error", err => {
  error("error in pg ", err);
});

db.connect();

Promise.promisifyAll(db);

export default db;

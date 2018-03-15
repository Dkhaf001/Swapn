require('dotenv').config();
import Promise from 'bluebird';
import { Pool } from 'pg';

const config = {
    user: process.env.NODE_ENV ,
    host: process.env.NODE_ENV,
    database: process.env.NODE_ENV ,
    password: process.env.NODE_ENV,
    port: process.env.NODE_ENV,
    // limiting number of connections to 20
    max: 20
  };
  
//To connect Posgress
//config for pg pool 
// same createing new squalize 
const db = new Pool(config);
 //must end connection after each query => database.end()

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

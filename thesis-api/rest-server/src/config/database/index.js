require('dotenv').config();

import Promise from 'bluebird';
import { Pool } from 'pg';

const config = {
  user: process.env.NODE_ENV === 'production' ? process.env.AWS_USER : process.env.LOCAL_USER,
  host: process.env.NODE_ENV === 'production' ? process.env.AWS_HOST : process.env.LOCAL_HOST,
  database:
    process.env.NODE_ENV === 'production' ? process.env.AWS_DATABASE : process.env.LOCAL_DATABASE,
  password:
    process.env.NODE_ENV === 'production' ? process.env.AWS_PASSWORD : process.env.LOCAL_PASSWORD,
  port: process.env.NODE_ENV === 'production' ? process.env.AWS_PORT : process.env.LOCAL_PORT,

  // limiting number of connections to 20
  max: 20,
};

// To connect Posgress
// config for pg pool
// same createing new squalize
const db = new Pool(config);
// must end connection after each query => database.end()

db.on('connect', () => {
  console.log('successfully connected to pg', config.database);
});

// db.on('remove', client => {
//   console.log('successfully removed client= ', client);
// });

db.on('error', (err) => {
  console.log('error in pg ', err);
});

db.connect();

Promise.promisifyAll(db);

export default db;

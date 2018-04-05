import http from 'http';
import App from './config/express';
import { bulkCategories, bulkPost, bulkPhotos } from './config/database/seedData';
import './config/database/index';
import path from 'path';
import fs from 'fs';
// Drop and Add Tables Uncomment to activate
// import './config/database/setup';

// // First uncomment to activate
// bulkCategories();
// bulkPost();

// // Second uncomment after first to activate
// bulkPhotos();

const app = App.express;
// ---------------------AWS
//const options = {
 // key: fs.readFileSync(path.resolve(__dirname, '../../../../../../etc/nginx/sites-available/swapn.key'),'utf8'),
 // cert: fs.readFileSync(path.resolve(__dirname, '../../../../../../etc/nginx/sites-available/ssl-bandle.crt'),'utf8'),
// };
// const server = http.createServer(options, app);
//-----------------------------
 const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

server.listen(PORT, (err) => {
  if (err) console.error(err);
  console.log('successfully connected to port', PORT);
});

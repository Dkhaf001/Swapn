import http from 'http';
import App from './config/express';
import { bulkCategories, bulkPost, bulkPhotos } from './config/database/seedData';
// when we complete our schema tables
import './config/database/index';
// import './config/database/setup';

// bulkCategories();
// bulkPost();
// bulkPhotos();

const app = App.express;

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

server.listen(PORT, (err) => {
  if (err) console.error(err);
  console.log('successfully connected to port', PORT);
});

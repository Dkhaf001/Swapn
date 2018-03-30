import http from 'http';
import App from './config/express';
// when we complete our schema tables
import './config/database/index';
// import './config/database/setup';

// import { bulkCategories, bulkPost } from './config/database/seedData';

// bulkCategories();
// bulkPost();

const app = App.express;

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

server.listen(PORT, err => {
  if (err) console.error(err);
  console.log('successfully connected to port', PORT);
});

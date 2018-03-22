import http from 'http';
import App from './config/express';
// when we complete our schema tables
import './config/database/index';
// import './config/database/setup';



server.listen(PORT, err => {
  if (err) console.error(err);
  console.log('successfully connected to port', PORT);
});


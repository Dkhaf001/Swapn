import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
//Helmet helps you secure your Express apps by setting various HTTP headers.
import helmet from 'helmet';
//headers setting
import cors from 'cors';
import router from '../../routes/index';
import passport from '../../middleware/validation/passport'

const midWare = [
  helmet(),
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true }),
  morgan('dev'),
  cors({
    allowedHeaders: 'Content-Type, authorization',
    methods: ['GET, POST, PUT, DELETE', 'OPTIONS']
  })
];

class App {
  constructor() {
    this.express = express();
    this.mountMiddleWare();
    this.mountRoutes();
  }
  mountRoutes() {
    this.express.use('/api', router);
  }
  mountMiddleWare() {
    this.express.use(...midWare);
  }
}

export default new App();

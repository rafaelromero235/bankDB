const express = require('express');
const cors = require('cors');
const { db } = require('../database/db');
const userRouter = require('../routes/users.routes');
const transferRouter = require('../routes/transfers.routes');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.paths = {
      users: '/api/v1/users',
      transfers: '/api/v1/transfers',
    };

    this.database();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.paths.users, userRouter);
    this.app.use(this.paths.transfers, transferRouter);
  }

  database() {
    db.authenticate()
      .then(() => {
        console.log('database aunthenticated');
      })
      .catch(err => {
        console.log(err);
      });

    db.sync()
      .then(() => {
        console.log('DB synced');
      })
      .catch(err => {
        console.log(err);
      });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`app started at port ${this.port}`);
    });
  }
}

module.exports = Server;

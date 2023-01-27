const { Sequelize } = require('sequelize');

const db = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: process.env.DB_PASSSWORD,
  database: 'bankDB',

  logging: false,
});

module.exports = { db };

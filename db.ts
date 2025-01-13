import { config } from 'dotenv';
const { Sequelize } = require('sequelize');

config();

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST as string,
  port: process.env.DB_PORT as string,
  username: parseInt(process.env.DB_USER as string, 10),
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_NAME as string,
});

module.exports = sequelize;
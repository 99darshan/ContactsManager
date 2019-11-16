require('dotenv').config();
const {Pool} = require('pg');

const isProd = process.env.NODE_ENV === 'production';
const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

//console.log(`connection string: ${connectionString}`);
const dbConfig = {
  //connectionString: connectionString,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE
};

const pool = new Pool(dbConfig);
module.exports = { pool }
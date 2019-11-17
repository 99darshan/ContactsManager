require('dotenv').config();
const {Pool} = require('pg');

const isProd = process.env.NODE_ENV === 'production';

let dbConfig;
if(isProd){
   dbConfig = 
    {
      connectionString: process.env.DATABASE_URL,
      ssl: true
      };
}else{
   dbConfig = {
    //connectionString: connectionString,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE
  };
}

const pool = new Pool(dbConfig);
module.exports = { pool }
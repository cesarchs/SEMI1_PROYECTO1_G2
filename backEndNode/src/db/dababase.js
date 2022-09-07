
import 'dotenv/config' 
//require('dotenv').config()

import mysql from 'mysql'

const conexion = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

export default conexion;
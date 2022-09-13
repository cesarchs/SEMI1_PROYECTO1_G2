//import conexion from '../db/dababase.js'
import db_credentials from '../db/db_creds.js'
import mysql from 'mysql'
var conn = mysql.createPool(db_credentials);

import express from 'express'
const appHotel = express()
import bodyParser from 'body-parser'
appHotel.use(bodyParser.json());

//import db_credentials from '../db/db_creds.js'
// const db_credentials = require('./db_creds'); //<-- Se importa las credenciales de la base de datos 
//var conn = mysql.createPool(db_credentials); // <- Se crea un pool para realizar la conexion a la base de datos 


appHotel.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
  });

//Peticion de prueba
appHotel.get("/getdata", async (req, res) => {
    conn.query(`select * from AMIGO;`, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});
appHotel.get('/', function (req, res ) {
	res.json({messaje: 'Hola Seminario'})
});


appHotel.get('/prueba',(request, response)=>{
    //var idservicio = request.body.idservicio;
    var miQuery = "select * from AMIGO;";
    conn.query(miQuery, function(err, result){
        if(err){
            console.log(err);
            response.status(502).send;
        }else{
            console.log(result[0]);
            response.status(200).send(result[0]);
        }
    }); 
})

export default appHotel
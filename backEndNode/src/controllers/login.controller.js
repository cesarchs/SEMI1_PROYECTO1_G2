//import conexion from '../db/dababase.js'
// cargar el modulo de express
import express from 'express'
// y crea una instancia de la aplicación express
const appTerciario = express()
// cargar body parser para leer el body de los request
import bodyParser from 'body-parser'
//importar para encriptar 
import crypto  from 'crypto';
// encriptaco
import sha256 from 'js-sha256';
//var sha256 = require('js-sha256');
// recibir datos en formato json
appTerciario.use(bodyParser.json());


// PARA AWS ///////////////////////////////////////////////////////////////////////////////////////////////////////
//var AWS = require('aws-sdk');
//const aws_keys = require('./creds_template'); // <-- se agrega la clase en donde estan las credenciales 

//const s3 = new AWS.S3(aws_keys.s3);  //--------> Alamacenamiento S3
//const ddb = new AWS.DynamoDB(aws_keys.dynamodb); //------> Base de datos - Dynamo 
//const rek = new AWS.Rekognition(aws_keys.rekognition); //----> Inteligencia Artificial 


const db_credentials = require('../db/dababase'); //<-- Se importa las credenciales de la base de datos 
var conn = mysql.createPool(db_credentials); // <- Se crea un pool para realizar la conexion a la base de datos 


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

appTerciario.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
  });


//Ver reseña de cualquier tipo de usuario tercerizado
appTerciario.post('/resenas-usuario',(request, response)=>{
    var idUsuario = request.body.idUsuario;
    //var idservicio = request.body.idservicio;
    var miQuery = "CALL getResenaUsuario("+idUsuario+");";
    conexion.query(miQuery, function(err, result){
        if(err){
            console.log(err);
            response.status(502).send;
        }else{
            console.log(result[0]);
            response.status(200).send(result[0]);
        }
    }); 
})


appTerciario.post('/registrar-servicio',(request,response) =>{
    var nombre   = request.body.nombre  ;
    var pais   = request.body.pais  ;
    var ciudad   = request.body.ciudad  ;
    var contraseña   = request.body.contraseña  ;
    var correo   = request.body.correo  ;
    var servicio   = request.body.tipo  ;
    
    if (servicio == 1) {
        servicio = 'Hotel'
    } else if (servicio == 2) {
        servicio = 'Aerolinea'
    } else if (servicio == 3) {
        servicio = 'Renta de Autos'
    }
    
    var hash = sha256(contraseña);
    var miQuery = "CALL addTerciario ("+
    "\'"+nombre+"\',"+
    "\'"+pais+"\',"+
    "\'"+ciudad+"\',"+
    "\'"+hash+"\',"+
    "\'"+correo+"\',"+
    "\'"+servicio+"\');";

    //console.log (miQuery);
    conexion.query(miQuery, function(err, result){
        if(err){
            //throw err;
            response.status(502).send;
            console.log(err);
        }else{
            console.log(result[0][0]);
            response.status(200).send(result[0][0]);
        }
    });
    
})

export default appTerciario
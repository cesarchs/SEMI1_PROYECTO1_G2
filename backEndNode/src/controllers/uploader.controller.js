//////////////// IMPORTAMOS CREDENCIALES DE BASE DE DATOS Y S3 ///////////////////////////////////////
import AWS from 'aws-sdk'
//var AWS = require('aws-sdk');
import db_credentials from '../db/db_creds.js' //Se importa las credenciales de la base de datos 
import aws_keys from '../db/creds_template.js' // se importa las credenciales para conectarnos a S3, credenciales del usuario IAM
import mysql from 'mysql' // IMPORTAMOS MYSQL
var conn = mysql.createPool(db_credentials); // CREAMOS UN POOL PARA LAS PETICIONES A LA BASE DE DATOS 
const s3 = new AWS.S3(aws_keys.s3);  //--------> Alamacenamiento S3

// CREACION DE VARIABLES PARA S3 
AWS.config.update({
    region: 'us-east-1', // se coloca la region del bucket 
    accessKeyId: '',
    secretAccessKey: ''
});
//////////////////////////////////////////////////////////////////////////////////////////////////
import express from 'express'
const app = express() // creamos instancia de express para exportar al .router
import bodyParser from 'body-parser'
import cors from 'cors'

var corsOptions = { origin: true, optionsSuccessStatus: 200 };
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))


app.use(bodyParser.json());
/**
 * Básicamente, lo que body-parser es lo que permite a Express leer el cuerpo 
 * y luego analizarlo en un objeto Json que podamos entender
 */

import sha256 from 'js-sha256' // libreria para emcriptar 

/**
 * El encabezado de respuesta Access-Control-Allow-Origin 
 * indica si los recursos de la respuesta pueden ser compartidos con el origen (en-US) dado
 * 
 * El encabezado de respuesta Access-Control-Allow-Headers es usado en la respuesta a una 
 * solicitud preflight para indicar cuáles encabezados HTTP pueden ser usados durante dicha solicitud
 */
 app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
  });

  app.get('/holaUpload', function (req, res ) {
	res.json({messaje: 'Hola desde controlador de upload'})
});


app.post('/subirfoto', function (req, res){

    var id = req.body.id;
    var foto = req.body.foto;
    //carpeta y nombre que quieran darle a la imagen
  
    var nombrei = "fotos/" + id + ".jpg"; // fotos -> se llama la carpeta 
    //se convierte la base64 a bytes
    let buff = new Buffer.from(foto, 'base64');
  


    AWS.config.update({
        region: 'us-east-1', // se coloca la region del bucket 
        accessKeyId: '',
        secretAccessKey: ''
    });

    var s3 = new AWS.S3(); // se crea una variable que pueda tener acceso a las caracteristicas de S3
    // metodo 1
    const params = {
      Bucket: "archivos-2grupo-p1",
      Key: nombrei,
      Body: buff,
      ContentType: "image"
    };
    const putResult = s3.putObject(params).promise();
    res.json({ mensaje: putResult })

});

app.post('/obtenerfoto', function (req, res) {
    var id = req.body.id;
    var nombrei = "fotos/"+id+".jpg";

    AWS.config.update({
        region: 'us-east-1', // se coloca la region del bucket 
        accessKeyId: '',
        secretAccessKey: ''
    });

    var S3 = new AWS.S3();

    var getParams = 
    {
        Bucket: "archivos-2grupo-p1",
        Key: nombrei
    }

    S3.getObject(getParams, function(err, data){
        if (err)
        {
            res.json(err)
        }else
        {
            var dataBase64 = Buffer.from(data.Body).toString('base64'); //resgresar de byte a base
            res.json({mensaje: dataBase64})
        }

    })

});

export default app
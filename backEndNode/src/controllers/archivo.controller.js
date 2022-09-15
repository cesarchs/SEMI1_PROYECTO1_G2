//////////////// IMPORTAMOS CREDENCIALES DE BASE DE DATOS ///////////////////////////////////////
import db_credentials from '../db/db_creds.js' //Se importa las credenciales de la base de datos 
import mysql from 'mysql' // IMPORTAMOS MYSQL
var conn = mysql.createPool(db_credentials); // CREAMOS UN POOL PARA LAS PETICIONES A LA BASE DE DATOS 
//////////////////////////////////////////////////////////////////////////////////////////////////
import express from 'express'
const appLogin = express() // creamos instancia de express para exportar al .router
import bodyParser from 'body-parser'

import sha256 from 'js-sha256' // libreria para emcriptar 

appLogin.use(bodyParser.json());


appLogin.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
  });

appLogin.get('/holaArchivo', function (req, res ) {
	res.json({messaje: 'Hola desde el controlador de log in'})
});



// peticion para crear un archivo (subir)
appLogin.post('/uploadFile',(request, response)=>{
    //RECOGER DATOS
    var file_name = request.body.file_name;
    var user = request.body.user;
    var privado = request.body.private;
    var file = request.body.file;
    var pwd = request.body.pwd;

    var hash = sha256(pwd);

    var miQuery = "SELECT * FROM USUARIO " +
    'WHERE ( idUsuario = ' + "\'"+user+"\' "+ 
    'AND pwd = '+"\'"+hash+"\' ); " 
    ;
    console.log(miQuery);
    conn.query(miQuery, function(err, result){
        if(err || result[0] == undefined ){
            console.log(err );
            response.status(502).send('Status: bad pwd');
        }else{
            var miQuery2 = "INSERT INTO ARCHIVO(file_name, propietario, private, URL, FechaCreacion, FechaModificacion) " +
            'VALUES( ' + "\'"+file_name+"\' "+ 
            ", "+user + 
            ", "+privado + 
            ", \'"+file+"\' , DATE_SUB(now(), INTERVAL 6 HOUR), "+
            "DATE_SUB(now(), INTERVAL 6 HOUR));"
            ;
            console.log(miQuery2);
            conn.query(miQuery2, function(err, result){
                if(err){
                    console.log(err);
                    response.status(502).send('Status: false');
                }else{
                    console.log(result[0]);
                    response.status(200).send('Status: true');
                }
            });
        }
    });

    
     
})


export default appLogin
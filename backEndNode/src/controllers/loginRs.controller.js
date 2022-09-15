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

appLogin.get('/holaLogin', function (req, res ) {
	res.json({messaje: 'Hola desde el controlador del log in'})
});



// peticion para log in 
appLogin.post('/login',(request, response)=>{
    //RECOGER DATOS
    var user = request.body.user;
    var pwd = request.body.pwd;

    var hash = sha256(pwd);

    // ENCRIPTAR CONTRASEÑA bycript bcrypt xd

    // CONSULTA A LA BASE DE DATOS VERIFICAR USUARIO
        // SI es correcta
            // respose.status(200).send(USUARIOCOMPLETO)
        // NO es correcta
            // respose.status(501).send(erro:)

    var miQuery = "SELECT * FROM USUARIO " +
    'WHERE ( user = ' + "\'"+user+"\' "+ 
    'AND pwd = '+"\'"+hash+"\' ) " +
    'OR ( email = ' + "\'"+user+"\' "+ 
    'AND pwd = '+"\'"+hash+"\' ) "
    ;
    console.log(miQuery);
    conn.query(miQuery, function(err, result){
        if(err || result[0] == undefined){
            console.log(err);
            response.status(502).send('Status: false');
        }else{
            console.log(result[0]);
            response.status(200).send(result[0]);
        }
    }); 
})

/* // PETICION ANTERIOR PARA ENCRIPTAR DIRECTO EN LA PETICION 

    var miQuery = "SELECT * FROM USUARIO " +
    'WHERE ( user = ' + "\'"+user+"\' "+ 
    'AND pwd = aes_encrypt( ' + '\'1\',' + "\'"+pwd+"\' ) ) " +
    'OR ( email = ' + "\'"+user+"\' "+ 
    'AND pwd = aes_encrypt( ' + '\'1\',' + "\'"+pwd+"\' ) )" 
    ;
*/

export default appLogin
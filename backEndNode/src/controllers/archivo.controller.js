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
	res.json({messaje: 'Hola desde el controlador de Archivo'})
});



// CREAR ARCHIVO (SUBIRLO)
appLogin.post('/uploadFile',(request, response)=>{
    //RECOGER DATOS
    var file_name = request.body.file_name;
    var idUsuario = request.body.idUsuario;
    var privado = request.body.private;
    var file = request.body.file;
    var pwd = request.body.pwd;

    var hash = sha256(pwd);

    var miQuery = "SELECT * FROM USUARIO " +
    'WHERE ( idUsuario = ' + "\'"+idUsuario+"\' "+ 
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
            ", "+idUsuario + 
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


//  BORRAR ARCHIVO

appLogin.post('/deleteFile',(request, response)=>{
    //RECOGER DATOS
    var idUsuario = request.body.idUsuario;
    var id_file = request.body.id_file;
    var file_name = request.body.file_name;
    var pwd = request.body.pwd;

    var hash = sha256(pwd);

    var miQuery = "SELECT * FROM USUARIO " +
    'WHERE ( idUsuario = ' + "\'"+idUsuario+"\' "+ 
    'AND pwd = '+"\'"+hash+"\' ); " 
    ;
    console.log(miQuery);
    conn.query(miQuery, function(err, result){
        if(err || result[0] == undefined ){
            console.log(err );
            response.status(502).send('Status: bad pwd');
        }else{
            var miQuery2 = "DELETE FROM ARCHIVO WHERE idArchivo = " +
            id_file+ 
            " AND propietario = "+ 
            idUsuario 
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



// EDITAR ARCHIVO 

appLogin.post('/editFile',(request, response)=>{
    //RECOGER DATOS
    var idUsuario = request.body.idUsuario;
    var id_file = request.body.id_file;
    var file_name = request.body.file_name;
    var privado = request.body.private;
    var pwd = request.body.pwd;

    var hash = sha256(pwd);

    var miQuery = "SELECT * FROM USUARIO " +
    'WHERE ( idUsuario = ' + "\'"+idUsuario+"\' "+ 
    'AND pwd = '+"\'"+hash+"\' ); " 
    ;
    console.log(miQuery);
    conn.query(miQuery, function(err, result){
        if(err || result[0] == undefined ){
            console.log(err );
            response.status(502).send('Status: bad pwd');
        }else{
            var miQuery2 = "UPDATE ARCHIVO SET file_name = " +
            "\'"+file_name+"\' , "+ 
            "private = "+ 
            privado +
            " , FechaModificacion = DATE_SUB(now(), INTERVAL 6 HOUR) "+
            "WHERE idArchivo = "+ id_file +
            " AND propietario = "+ idUsuario + " ;"
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
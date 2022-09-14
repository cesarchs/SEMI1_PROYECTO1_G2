//////////////// IMPORTAMOS CREDENCIALES DE BASE DE DATOS ///////////////////////////////////////
import db_credentials from '../db/db_creds.js' //Se importa las credenciales de la base de datos 
import mysql from 'mysql' // IMPORTAMOS MYSQL
var conn = mysql.createPool(db_credentials); // CREAMOS UN POOL PARA LAS PETICIONES A LA BASE DE DATOS 
//////////////////////////////////////////////////////////////////////////////////////////////////
import express from 'express'
const appUsuario = express() // creamos instancia de express para exportar al .router
import bodyParser from 'body-parser'
appUsuario.use(bodyParser.json());

import sha256 from 'js-sha256' // libreria para emcriptar 


appUsuario.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
  });

appUsuario.get('/holaUsuario', function (req, res ) {
	res.json({messaje: 'Hola desde controlador usuario'})
});

// REGISTRAR USUARIO
appUsuario.post('/register',(request, response)=>{
    var user = request.body.user;
    var fullname = request.body.fullname;
    var email = request.body.email;
    var pwd = request.body.pwd;
    var photo = request.body.photo;

    var hash = sha256(pwd);

    var miQuery = "insert into USUARIO (user,fullname, email,pwd,photo) VALUES ( " +
    "\'"+user+"\' ,"+
    "\'"+fullname+"\' ,"+
    "\'"+email+"\' ,"+
    "\'"+hash+"\', " +
    "\'"+photo+"\' );"
    ;
    console.log(miQuery);

    conn.query(miQuery, function(err, result){
        if(err){
            console.log(err || result[0] == undefined);
            response.status(502).send('Status: false');
        }else{
            console.log(result[0]);
            response.status(200).send('Status: true');
        }
    }); 
})

// ARCHIVOS DE USUARIO
appUsuario.get('/userFiles/:idUser',(request, response)=>{
    var idUser = request.params.idUser;
    var miQuery = "SELECT idArchivo, file_name, private, URL, date_format(FechaCreacion, '%d/%m/%Y') as FechaCreada , date_format(FechaModificacion, '%d/%m/%Y') as FechaModificacion " +
    "FROM ARCHIVO WHERE propietario = '" +idUser+"'"+" ORDER BY private ASC;"
    ;
    console.log(miQuery);
    conn.query(miQuery, function(err, result){
        if(err || result[0] == undefined){
            console.log(err);
            response.status(502).send('Status: false');
        }else{
            console.log(result);
            response.status(200).send(result);
        }
    }); 
})
/* // CONSULTA
SELECT idArchivo, file_name, private, URL, date_format(FechaCreacion, '%d/%m/%Y') as FechaCreada , date_format(FechaModificacion, '%d/%m/%Y') as FechaModificacion
FROM ARCHIVO WHERE propietario = '6' ORDER BY private ASC;
*/

/*
appHotel.get('/getResenaHotel/:id',(request, response)=>{
    var idservicio = request.params.id;
    var miQuery = "prcedure getResena ("+idservicio+");";
    conexion.query(miQuery, function(err, result){
        if(err){
            console.log(err);
        }else{
            console.log(result);
            response.send(result);
        }
    }); 
})
*/

export default appUsuario
//////////////// IMPORTAMOS CREDENCIALES DE BASE DE DATOS ///////////////////////////////////////
import db_credentials from '../db/db_creds.js' //Se importa las credenciales de la base de datos 
import mysql from 'mysql' // IMPORTAMOS MYSQL
var conn = mysql.createPool(db_credentials); // CREAMOS UN POOL PARA LAS PETICIONES A LA BASE DE DATOS 
//////////////////////////////////////////////////////////////////////////////////////////////////
import express from 'express'
const appUsuario = express() // creamos instancia de express para exportar al .router
import bodyParser from 'body-parser'
appUsuario.use(bodyParser.json());


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
   

    var miQuery = "insert into USUARIO (user,fullname, email,pwd,photo) VALUES ( " +
    "\'"+user+"\' ,"+
    "\'"+fullname+"\' ,"+
    "\'"+email+"\' ,"+
    'aes_encrypt(' + '\'1\',' + "\'"+pwd+"\'), " +
    "\'"+photo+"\' );"
    ;
    console.log(miQuery);

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

// ARCHIVOS DE USUARIO


export default appUsuario
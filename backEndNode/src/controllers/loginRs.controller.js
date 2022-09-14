//////////////// IMPORTAMOS CREDENCIALES DE BASE DE DATOS ///////////////////////////////////////
import db_credentials from '../db/db_creds.js' //Se importa las credenciales de la base de datos 
import mysql from 'mysql' // IMPORTAMOS MYSQL
var conn = mysql.createPool(db_credentials); // CREAMOS UN POOL PARA LAS PETICIONES A LA BASE DE DATOS 
//////////////////////////////////////////////////////////////////////////////////////////////////
import express from 'express'
const appLogin = express() // creamos instancia de express para exportar al .router
import bodyParser from 'body-parser'
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
    var user = request.body.user;
    var pwd = request.body.pwd;

    var miQuery = "SELECT * FROM USUARIO " +
    'WHERE ( user = ' + "\'"+user+"\' "+ 
    'AND pwd = aes_encrypt( ' + '\'1\',' + "\'"+pwd+"\' ) ) " +
    'OR ( email = ' + "\'"+user+"\' "+ 
    'AND pwd = aes_encrypt( ' + '\'1\',' + "\'"+pwd+"\' ) )" 
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



export default appLogin
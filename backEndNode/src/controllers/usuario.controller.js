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
            console.log(err);
            response.status(502).send('Status: false');
        }else{
            console.log(result[0]);
            response.status(200).send('Status: true');
        }
    }); 
})

// ARCHIVOS DE MI USUARIO, O ARCHIVOS SEGUN ID

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

// ARCHIVOS PUBLICOS DE USUARIOS AMIGO

appUsuario.get('/friendFiles/:idUser',(request, response)=>{
    var idUser = request.params.idUser;
    var miQuery = "SELECT aux.idArchivo, aux.file_name, aux.user, date_format(aux.FechaModificacion, '%d/%m/%Y') AS FechaModificacion " +
    "FROM ( "+
        "SELECT a.idArchivo, u.idUsuario, a.file_name, u.user, a.FechaModificacion "+
        "FROM USUARIO u "+
        "INNER JOIN ARCHIVO a ON u.idUsuario = a.propietario "+
        "WHERE a.private = 0 AND u.idUsuario <> " + idUser +
        " GROUP BY u.idUsuario, u.user "+
        "ORDER BY u.user ASC "+
        ") aux "+
    "INNER JOIN( "+
            "(SELECT usuario2 as idUsuario FROM AMIGO where usuario1 = "+ idUser +" ) "+
            "UNION "+
            "(SELECT usuario1 as idUsuario FROM AMIGO where usuario2 = "+ idUser +" ) "+
        ")aux1 ON aux.idUsuario = aux1.idUsuario "+
    "ORDER BY aux.user ASC; "
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

// TODOS LOS USUARIOS 

appUsuario.get('/allUsers/:idUser',(request, response)=>{
    var idUser = request.params.idUser;
    var miQuery = " " 
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


// AGREGAR AMIGO

appUsuario.post('/addFriend',(request, response)=>{
    var id_user = request.body.id_user;
    var id_friend = request.body.id_friend;


    var miQuery = "INSERT INTO AMIGO VALUES( " +
    id_user+", "+
    id_friend+", "+
    "DATE_SUB(now(), INTERVAL 6 HOUR));"
    ;
    console.log(miQuery);

    conn.query(miQuery, function(err, result){
        if(err){
            console.log(err);
            response.status(502).send('Status: false');
        }else{
            console.log(result[0]);
            response.status(200).send('Status: true');
        }
    }); 
})



export default appUsuario
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

    var miQuery = "SELECT * FROM USUARIO WHERE USUARIO.user = " +
    "\'"+user+"\' " +
    "or USUARIO.email = "+
    "\'"+email+"\' ;" 
    ;
    console.log(miQuery);
    conn.query(miQuery, function(err, result){
        if(err || result[0] != undefined){
            console.log(err);
            response.status(502).send('Status: UserExists');
        }else{
            var miQuery2 = "insert into USUARIO (user,fullname, email,pwd,photo) VALUES ( " +
                            "\'"+user+"\' ,"+
                            "\'"+fullname+"\' ,"+
                            "\'"+email+"\' ,"+
                            "\'"+hash+"\', " +
                            "\'"+photo+"\' );"
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


/**SELECT * FROM USUARIO WHERE USUARIO.user = 'mine' or USUARIO.email = 'minerva@gmail.com'; */


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
        ") aux "+
    "INNER JOIN( "+
            "(SELECT usuario2 as idUsuario FROM AMIGO where usuario1 = "+ idUser +" ) "+
            "UNION "+
            "(SELECT usuario1 as idUsuario FROM AMIGO where usuario2 = "+ idUser +" ) "+
        ")aux1 ON aux.idUsuario = aux1.idUsuario "+
    "ORDER BY aux.user ASC; "
    ;

    /**
		WHERE a.private = 1  AND u.idUsuario <> 2
	 */

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
    var miQuery = "SELECT aux.idUsuario, aux.user, aux.ArchivosPublicos , aux.ArchivosPrivados " +
    "FROM ( "+
            "SELECT u.idUsuario, u.user, COUNT(CASE WHEN a.private = 0 THEN 0 END) as ArchivosPublicos, COUNT(CASE WHEN a.private=1 THEN 1 END) as ArchivosPrivados "+
            "FROM USUARIO u "+
            "INNER JOIN ARCHIVO a ON u.idUsuario = a.propietario "+
            "WHERE u.idUsuario <> "+ idUser +
            " GROUP BY u.idUsuario, u.user "+
            "ORDER BY u.idUsuario ASC "+
        ") aux "+
    "LEFT JOIN (SELECT usuario2 as idUsuario FROM AMIGO where usuario1 = "+ idUser + ") aux1 ON aux.idUsuario = aux1.idUsuario "+
    "LEFT JOIN (SELECT usuario1 as idUsuario FROM AMIGO where usuario2 = "+ idUser + ") aux2 ON aux.idUsuario = aux2.idUsuario "+
    "WHERE aux1.idUsuario is NULL AND aux2.idUsuario is NULL "+
    "ORDER BY aux.user ASC ; "
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
import express from 'express'

import appUsuario from '../controllers/usuario.controller.js'
import appLogin from '../controllers/loginRs.controller.js'
import appArchivo from '../controllers/archivo.controller.js'

const Router = express();

//Routers 
Router.get('/holaLogin',              appLogin) // de prueba
Router.get('/holaUsuario',          appUsuario) // de prueba
Router.get('/holaArchivo',          appArchivo) // de prueba
Router.get('/holaU',                appArchivo) // de prueba
//RUTAS LOGIN
Router.post('/login',                 appLogin)
//RUTAS USUARIO
Router.post('/register',            appUsuario)
Router.get('/userFiles/:idUser',    appUsuario)
Router.get('/friendFiles/:idUser',  appUsuario)
Router.get('/allUsers/:idUser',     appUsuario) // AUN SIN CONSULTA 
Router.post('/addFriend',           appUsuario)
Router.get('/myFriends/:idUser',    appUsuario)
//RUTAS ARCHIVO
Router.post('/uploadFile',          appArchivo)
Router.post('/deleteFile',          appArchivo)
Router.post('/editFile',            appArchivo)
// RUTAS PRUEBA S3
Router.post('/subirPdf',            appArchivo)
Router.post('/subirtxt',            appArchivo)
Router.get('/allFile',            appArchivo)
Router.post('/getPhoto',            appArchivo)
Router.post('/subirfoto',           appArchivo)
Router.post('/deleteFilee',           appArchivo)


export default Router

/**
 login -> trabajando correctamente
 registro -> trabajando correctamente
 userFiles -> trabajando correctamente, al no tener archivos, tambien devuelve false asi como al no existir el user
 friendFiles -> trabajando correctamente, al no tener archivos, tambien devuelve false asi como al no existir el user  // falla al solo devolver el primer archivo publico de cada usuario.
 allUsers -> aun no tiene consulta, por falla en la existente
 addFriend -> trabaja correctamente. devuelve false si ya eres amigo, tambien si no existe el usuario // falla, si puede agregarse a si mismo.
 uploadFile -> trabaja correctamente.
 deleteFile -> trabaja correctamente. al no existir el documento a eliminar retorna false
 editFile -> tabaja correctamente, al no existir usuario o contrasena retorna bad pwd, // falla, al no existir el id del archivo, retorna true por que ejecuta la query, mas no afecta en las tablas
 
 NOTAS:
 SI NO TIENE ARCHIVOS PUBLICOS O PRIVADOS NO VA A APARCER PARA AGREGAR COMO AMIGO.
 


 se hicieron correxiones como el que ahora ya muestra bien los posibles amigos, asi como solo los amigos agregados
 */
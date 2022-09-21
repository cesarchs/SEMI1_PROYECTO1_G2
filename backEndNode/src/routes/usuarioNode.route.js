import express from 'express'

import appUsuario from '../controllers/usuario.controller.js'
import appLogin from '../controllers/loginRs.controller.js'
import appArchivo from '../controllers/archivo.controller.js'
import app from '../controllers/uploader.controller.js'

const Router = express();

//Routers 
Router.get('/holaLogin',              appLogin) // de prueba
Router.get('/holaUsuario',          appUsuario) // de prueba
Router.get('/holaArchivo',          appArchivo) // de prueba
Router.get('/holaU',                appUsuario) // de prueba
Router.post('/login',                 appLogin)
Router.post('/register',            appUsuario)
Router.get('/userFiles/:idUser',    appUsuario)
Router.get('/friendFiles/:idUser',  appUsuario)
Router.get('/allUsers/:idUser',     appUsuario) // AUN SIN CONSULTA 
Router.post('/addFriend',           appUsuario)
Router.get('/myFriends/:idUser',    appUsuario)
Router.get('/allPhotos',            appUsuario)
Router.post('/getPhoto',            appUsuario)
Router.post('/subirfoto',           appUsuario)
Router.post('/uploadFile',          appArchivo)
Router.post('/deleteFile',          appArchivo)
Router.post('/editFile',            appArchivo)

Router.post('/subirPdf',            appUsuario)
Router.post('/subirtxt',            appUsuario)


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
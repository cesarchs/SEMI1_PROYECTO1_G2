import express from 'express'

import appUsuario from '../controllers/usuario.controller.js'
import appLogin from '../controllers/loginRs.controller.js'
import appArchivo from '../controllers/archivo.controller.js'


const Router = express();

//Routers 
Router.get('/holaLogin',appLogin)
Router.post('/login',appLogin)
Router.get('/holaUsuario',appUsuario)
Router.post('/register',appUsuario)
Router.get('/userFiles/:idUser',appUsuario)
Router.get('/friendFiles/:idUser',appUsuario)
Router.post('/uploadFile',appArchivo)
Router.post('/deleteFile',appArchivo)
Router.post('/editFile',appArchivo)

export default Router
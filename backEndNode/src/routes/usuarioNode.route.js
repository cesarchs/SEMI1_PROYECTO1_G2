import express from 'express'

import appUsuario from '../controllers/usuario.controller.js'
import appLogin from '../controllers/loginRs.controller.js'

const Router = express();

//Routers 
Router.get('/holaLogin',appLogin)
Router.post('/login',appLogin)
Router.get('/holaUsuario',appUsuario)
Router.post('/register',appUsuario)


export default Router
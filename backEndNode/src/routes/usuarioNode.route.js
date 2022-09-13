import express from 'express'

import appUsuario from '../controllers/usuario.controller.js'
import appLogin from '../controllers/loginRs.controller.js'

const Router = express();

//Routers 
Router.get('/getdata',appUsuario)
Router.get('/',appUsuario)
Router.get('/holaLogin',appLogin)
Router.post('/login',appLogin)


export default Router
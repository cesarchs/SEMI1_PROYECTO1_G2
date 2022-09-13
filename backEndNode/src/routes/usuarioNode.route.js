import express from 'express'

import appUsuario from '../controllers/usuario.controller.js'

const Router = express();

//Routers 
Router.post('/getdata',appUsuario)
Router.post('/',appUsuario)
Router.post('/prueba',appUsuario)


export default Router
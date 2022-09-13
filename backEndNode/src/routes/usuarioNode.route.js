import express from 'express'

import appUsuario from '../controllers/usuario.controller.js'

const Router = express();

//Routers 
Router.get('/getdata',appUsuario)
Router.get('/',appUsuario)


export default Router
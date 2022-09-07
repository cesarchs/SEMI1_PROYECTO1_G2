import express from 'express'

import appUsuario from '../controllers/usuario.controller.js'
import appLogin from '../controllers/login.controller.js'

const Router = express();

//Routers 

Router.post('/agregar-habitacion',appUsuario)
    //resenas
Router.post('/resenas-usuario',appLogin)
    // log in usuarios tercerizados
Router.post('/registrar-servicio',appLogin)



export default Router
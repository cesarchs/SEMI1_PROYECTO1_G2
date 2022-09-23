import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
/*
Intercambio de Recursos de Origen Cruzado (CORS) es una característica de seguridad 
del navegador que restringe las solicitudes HTTP de origen cruzado que se inician 
desde secuencias de comandos que se ejecutan en el navegador.

El intercambio de recursos de origen cruzado (CORS) es un mecanismo que permite a una
página web realizar solicitudes a otro dominio distinto del desde el que se sirvió la
página. Normalmente, las solicitudes entre dominios estarían prohibidas por los navegadores web.
*/
const PORT = process.env.PORT || 5000;

import Router from './routes/usuarioNode.route.js'
var corsOptions = { origin: true, optionsSuccessStatus: 200 };
const app = express();
app.use(cors(corsOptions))
app.use(express.json({limit: '50mb'}));
app.use(bodyParser.json({ limit: "200mb" }));
app.use(bodyParser.urlencoded({ limit: "200mb",  extended: true, parameterLimit: 1000000 }));

//Routes
app.use('/apiUsuarioN',Router);

//incio app
app.listen(PORT,() => { 
    console.log('Server running on port', PORT)
})

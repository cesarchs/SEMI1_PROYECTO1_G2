import express from 'express'
import cors from 'cors'
const PORT = process.env.PORT || 5000;

import Router from './routes/usuarioNode.route.js'

const app = express();
app.use(cors())

//Routes
app.use('/apiTerciario',Router);

//incio app
app.listen(PORT,() => { 
    console.log('Server running on port', PORT)
})

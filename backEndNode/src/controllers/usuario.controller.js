import conexion from '../db/dababase.js'
// cargar el modulo de express
import express from 'express'
// y crea una instancia de la aplicación express
const appHotel = express()
// cargar body parser para leer el body de los request
import bodyParser from 'body-parser'
// recibir datos en formato json
appHotel.use(bodyParser.json());


appHotel.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
  });

//Agregar auto para renta
appHotel.post('/agregar-habitacion', (request,response) =>{
    var hotel   = request.body.idServicio  ;
    var fechaH   = request.body.fecha  ;
    var cantidad   = request.body.habitaciones  ;
    var precio   = request.body.precio  ;
    var miQuery = "CALL addHabitacion (" 
    + hotel + ","+
    "\'"+fechaH+"\'"+
    ","+cantidad+
    ","+precio+
    ");"
    console.log(miQuery);
    conexion.query(miQuery, function(err, result){
        if(err){
            response.status(502).send;
            console.log(err);
        }else{
            console.log(result[0][0]);
            response.status(200).send(result[0][0]);
        }
    });
})


export default appHotel
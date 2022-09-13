var express = require('express');
var bodyParser = require('body-parser');
var app = express();

const cors = require('cors');


var corsOptions = { origin: true, optionsSuccessStatus: 200 };
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

//Nuevo 
const mysql = require('mysql');  //<- para importar la base de datos 

var port = 9000;
app.listen(port);
console.log("Escuchando en el puerto", port)


// se manda a llamar las credenciales de Mysql 
const db_credentials = require('./db_creds'); //<-- Se importa las credenciales de la base de datos 
var conn = mysql.createPool(db_credentials); // <- Se crea un pool para realizar la conexion a la base de datos 


app.get('/', function (req, res ) {
	res.json({messaje: 'Hola Seminario'})
});


//---------------------------------Ejemplo DB ------------------------------------

/******************************RDS *************/
//obtener datos de la BD
app.get("/getdata", async (req, res) => {
    conn.query(`select * from USUARIO;`, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

//insertar datos
app.post("/insertdata", async (req, res) => {
    let body = req.body;
    conn.query('INSERT INTO ejemplo VALUES(?,?)', [body.id, body.nombre], function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});


//////////////// IMPORTAMOS CREDENCIALES DE BASE DE DATOS Y S3 ///////////////////////////////////////
import AWS from 'aws-sdk'
import aws_keys from '../db/creds_template.js' // se importa las credenciales para conectarnos a S3, credenciales del usuario IAM
const s3 = new AWS.S3(aws_keys.s3);  //--------> Alamacenamiento S3

//////////////////////////////////////////////////////////////////////////////////////////////////
import express from 'express'
const app = express() 
import bodyParser from 'body-parser'
import cors from 'cors'


// para extender el tamanio aceptado del string que entra en el body
var corsOptions = { origin: true, optionsSuccessStatus: 200 };
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))


//////////////////////////////////////////////////////////////////////////////////
// /////////////////////////// FUNCIONES PARA S3  ////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
/**
 *  // todas las funciones podian ser peticiones si se haria desde aca la peticion
 *app.get('/holaUpload', function (req, res ) {
	res.json({messaje: 'Hola desde controlador de upload'})
});
*/
export function holaU (req, res ) {
	res.json({messaje: 'Hola desde controlador de upload 2'})
}

export function subirfoto (request){

    var id = request.body.user;
    var foto = request.body.photo;
    //carpeta y nombre que quieran darle a la imagen
  
    var nombrei = "fotos/" + id + ".jpg"; // fotos -> se llama la carpeta 
    //se convierte la base64 a bytes
    let buff = new Buffer.from(foto, 'base64');
  


    AWS.config.update({
        region: aws_keys.s3.region, // se coloca la region del bucket 
        accessKeyId: aws_keys.s3.accessKeyId,
        secretAccessKey: aws_keys.s3.secretAccessKey
    });

    var s3 = new AWS.S3(); // se crea una variable que pueda tener acceso a las caracteristicas de S3
    // metodo 1
    const params = {
      Bucket: "archivos-2grupo-p1",
      Key: nombrei,
      Body: buff,
      ContentType: "image"
    };
    const putResult = s3.putObject(params).promise();
   // response.json({ mensaje: putResult })

}







export function getPhoto (req, res) {
    var id = req.body.id;
    var nombrei = "fotos/"+id+".jpg";

    AWS.config.update({
        region: aws_keys.s3.region, // se coloca la region del bucket 
        accessKeyId: aws_keys.s3.accessKeyId,
        secretAccessKey: aws_keys.s3.secretAccessKey
    });


    var S3 = new AWS.S3();

    var getParams = 
    {
        Bucket: "archivos-2grupo-p1",
        Key: nombrei
    }

    S3.getObject(getParams, function(err, data){
        if (err)
        {
            res.json(err)
        }else
        {
            var dataBase64 = Buffer.from(data.Body).toString('base64'); //resgresar de byte a base
            res.json({mensaje: dataBase64})
        }

    })

}





export function VerS3 (req, res) {

    AWS.config.update({
        region: aws_keys.s3.region, // se coloca la region del bucket 
        accessKeyId: aws_keys.s3.accessKeyId,
        secretAccessKey: aws_keys.s3.secretAccessKey
    });


    var S3 = new AWS.S3();

    var getParams = 
    {
        Bucket: "archivos-2grupo-p1"
    }

    S3.listObjectsV2(getParams, function(err, data){
        if (err)
        {
            res.json(err)
        }else
        {
            res.json({mensaje: data.Contents})
        }

    })

}







export default app
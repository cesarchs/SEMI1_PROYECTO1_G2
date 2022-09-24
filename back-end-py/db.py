from app import app
from flask_mysqldb import MySQL 

app.config['MYSQL_USER'] = 'admin'
app.config['MYSQL_PASSWORD'] = 'administrador12345'
app.config['MYSQL_HOST'] = 'bdproyecto1.cgofcdyhh2sv.us-east-1.rds.amazonaws.com'
app.config['MYSQL_DB'] = 'BD_PROYECTO1'
app.config['MYSQL_PORT'] = 2022

mysql = MySQL(app)

def generateArray(cursor, data):
    array = []
    for i in range(len(data)):
        temp = {}
        for j in range(len(data[i])):
            temp[cursor.description[j][0]] = data[i][j] 
        array.append(temp)
    return array

# CONFIGURACION DEL BUCKET

import boto3, botocore

# S3_REGION = "us-east-1"
# S3_ACCKEY = "AKIA3OAU7UXZKTE6CQGU"
# S3_SACCKEY = "YDgabyM8JUlaAWNtMhMPjenCa/g0Fcrt6m8nxhGV"


app.config['S3_BUCKET'] = "S3_BUCKET_NAME"
app.config['S3_KEY'] = "AKIA3OAU7UXZKTE6CQGU"
app.config['S3_SECRET'] = "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"
app.config['S3_LOCATION'] = 'http://{}.s3.amazonaws.com/'.format(S3_BUCKET)
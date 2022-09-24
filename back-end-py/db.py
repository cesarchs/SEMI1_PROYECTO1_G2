from app import app
from flask_mysqldb import MySQL 
import base64
import boto3
import os
import uuid

app.config['MYSQL_USER'] = os.getenv('MYSQL_USER')
app.config['MYSQL_PASSWORD'] = os.getenv('MYSQL_PASSWORD')
app.config['MYSQL_HOST'] = os.getenv('MYSQL_HOST')
app.config['MYSQL_DB'] = os.getenv('MYSQL_DB')
app.config['MYSQL_PORT'] = os.getenv('MYSQL_PORT')

mysql = MySQL(app)

def generateArray(cursor, data):
    array = []
    for i in range(len(data)):
        temp = {}
        for j in range(len(data[i])):
            temp[cursor.description[j][0]] = data[i][j] 
        array.append(temp)
    return array

def upload_file(head:str, file_base64:str):
    file_name = str(uuid.uuid1())
    print(file_name, head)
    ext =""
    folder = ""
    if "pdf" in head:
        ext = '.pdf'
        folder = 'pdf/'
    elif "text" in head:
        ext = '.txt'
        folder = 'txt/'
    else:
        # data:image/png;base64
        ext = "." + head.split(';')[0].split('/')[1]
        folder = 'fotos/'
    bucket_name = os.getenv("S3_NAME")
    file_path = folder + file_name + ext
    s3 = boto3.resource('s3',
        aws_access_key_id = os.getenv("S3_ACCESS_KEY"),
        aws_secret_access_key = os.getenv("S3_SECRET_KEY")
    )

    obj = s3.Object(bucket_name, file_path)
    obj.put(Body = base64.b64decode(file_base64))
    object_url = "https://%s.s3.amazonaws.com/%s" % (bucket_name, file_path)
    print(object_url)
    return object_url
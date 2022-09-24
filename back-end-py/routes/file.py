from xmlrpc.client import ResponseError
from flask import Blueprint, Response, request
from db import mysql, generateArray
import hashlib
import json

# RUTAS EN ESTE ARCHIVO
# http://localhost:5000/apiUsuarioN/userFiles/:idUsuario		GET
# http://localhost:5000/apiUsuarioN/friendFiles/:idUsuario	 	GET
# http://localhost:5000/apiUsuarioN/uploadFile				    POST
# http://localhost:5000/apiUsuarioN/editFile				    POST


file_endpoints = Blueprint("file", __name__, url_prefix="/apiUsuarioN")

# -------------------------------------------------------------------
# /apiUsuarioN/userFiles/:idUsuario
# -------------------------------------------------------------------
@file_endpoints.route("/userFiles/<id_user>", methods=["GET"])
def user_files(id_user):
    query = """
        SELECT idArchivo, tipoArchivo, file_name, private, URL, date_format(FechaCreacion, '%d/%m/%Y') as FechaCreada,
        date_format(FechaModificacion, '%d/%m/%Y') as FechaModificacion
        FROM ARCHIVO WHERE propietario = " +{id}+" ORDER BY private ASC""".format(id = id_user)
    try:
        cur = mysql.connection.cursor()
        cur.execute(query)
        data = cur.fetchall()
        res = generateArray(cur, data)
        cur.close()
        
        return Response(json.dumps(res), status=200, content_type='application/json')
    except Exception as e:
        print("MyFriends: ", e)
        return Response("{'Status': 'false'}", status=500, content_type='application/json')


# -------------------------------------------------------------------
# /apiUsuarioN/friendFiles/:idUsuario
# -------------------------------------------------------------------
@file_endpoints.route("/friendFiles/<id_user>", methods=["GET"])
def friend_files(id_user):
    query = "CALL ArchivosAmigos(" + str(id_user) + ")" 
    try:
        cur = mysql.connection.cursor()
        cur.execute(query)
        data = cur.fetchall()
        res = generateArray(cur, data)
        cur.close()
        return Response(json.dumps(res), status=200, content_type='application/json')
    except Exception as e:
        print("MyFriends: ", e)
        return Response("{'Status': 'false'}", status=500, content_type='application/json')

# -------------------------------------------------------------------
# /apiUsuarioN/editFile
# -------------------------------------------------------------------
@file_endpoints.route("/editFile", methods=["POST"])
def edit_file():
    id_user = request.json['idUsuario']
    id_file = request.json['id_file']
    file_name = request.json['file_name']
    private = request.json['private']
    pwd = request.json['pwd']

    pwdHash = hashlib.sha256(pwd.encode('utf-8')).hexdigest()
    query = "CALL EditarArchivo("+str(id_user)+","+str(id_file)+",'"+file_name+"',"+str(private)+", '"+pwdHash+"')";
    print(pwdHash)
    
    try:
        cur = mysql.connection.cursor()
        cur.execute(query)
        mysql.connection.commit()
        cur.close()
        return Response("{'Status': 'true'}", status=200, content_type='application/json')
    except Exception as e:
        print("MyFriends: ", e)
        return Response("{'Status': 'false'}", status=500, content_type='application/json')
    
# -------------------------------------------------------------------
# /apiUsuarioN/deleteFile
# -------------------------------------------------------------------
@file_endpoints.route("/deleteFile", methods=["POST"])
def delete_file():
    return "hola"

# -------------------------------------------------------------------
# /apiUsuarioN/uploadFile
# -------------------------------------------------------------------
@file_endpoints.route("/uploadFile", methods=["POST"])
def upload_file():
    return "Todo bien otra vez desde file"
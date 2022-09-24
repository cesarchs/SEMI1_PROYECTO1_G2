from fileinput import filename
from flask import Blueprint, Response, request
from db import mysql, generateArray, upload_file
import hashlib
import json
# RUTAS EN ESTE ARCHIVO
# http://localhost:5000/apiUsuarioN/login 					    POST
# http://localhost:5000/apiUsuarioN/register				    POST

user_endpoints = Blueprint("user", __name__, url_prefix="/apiUsuarioN")

# -------------------------------------------------------------------
# /apiUsuarioN/login
# -------------------------------------------------------------------
@user_endpoints.route("/login", methods=["POST"])
def login(): 
    user = request.json['user']
    pwd = request.json['pwd']
    pwdHash = hashlib.sha256(pwd.encode('utf-8')).hexdigest()
    
    query = """ 
        SELECT * FROM USUARIO 
        WHERE (user = '{user}' OR user = '{email}') AND pwd = '{pwd}' 
    """.format(user=user, email=user, pwd=pwdHash)
    try:
        cur = mysql.connection.cursor()
        cur.execute(query)
        data = cur.fetchall()
        res = generateArray(cur, data)
        cur.close()
        if len(res) > 0:
            return Response(json.dumps(res[0]), status=200, content_type='application/json')
        else:
            return Response("{'Status': 'false'}", status=500, content_type='application/json')
    except Exception as e:
        print("MyFriends: ", e)
        return Response("{'Status': 'false'}", status=500, content_type='application/json')

# -------------------------------------------------------------------
# /apiUsuarioN/register
# -------------------------------------------------------------------
@user_endpoints.route("/register", methods=["POST"])
def register():
    user = request.json['user']
    fullname = request.json['fullname']
    email = request.json['email']
    pwd = request.json['pwd']
    base64 = request.json['base64']
    temp = base64.split(',')
    try:
        url = upload_file(temp[0], temp[1])
                

    except Exception as e:
        print("Register: ", e)
        return Response("{'Status': 'false'}", status=500, content_type='application/json')

    return "register"

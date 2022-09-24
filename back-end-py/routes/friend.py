from flask import Blueprint, request, Response
from db import mysql, generateArray
import json

# RUTAS EN ESTE ARCHIVO
# http://localhost:5000/apiUsuarioN/addFriend				    POST
# http://localhost:5000/apiUsuarioN/myFriends/:idUsuario		GET
# http://localhost:5000/apiUsuarioN/allUsers/:idUsuario			GET

friend_endpoints = Blueprint("friend", __name__, url_prefix="/apiUsuarioN")

# -------------------------------------------------------------------
# /apiUsuarioN/addFriend
# -------------------------------------------------------------------
@friend_endpoints.route("/addFriend", methods=["POST"])
def add_friend():
    user = request.json['id_user']
    friend = request.json['id_friend']
    query = "INSERT INTO AMIGO VALUES( " +str(user)+", "+ str(friend)+", DATE_SUB(now(), INTERVAL 6 HOUR));"
    try:
        cur = mysql.connection.cursor()
        cur.execute(query)
        mysql.connection.commit();
        cur.close()
        return Response("{'Status': 'true'}", status=200, content_type='application/json')
    except Exception as e:
        print("AddFriend: ", e)
        return Response("{'Status': 'false'}", status=500, content_type='application/json')


# -------------------------------------------------------------------
# /apiUsuarioN/myFriends/:idUsuario
# -------------------------------------------------------------------
@friend_endpoints.route("/myFriends/<id_user>", methods=["GET"])
def my_friends(id_user):
    query = "CALL MisAmigos(" + str(id_user) + ")" 
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
# /apiUsuarioN/allUsers/:idUsuario
# -------------------------------------------------------------------
@friend_endpoints.route("/allUsers/<id_user>", methods=["GET"])
def all_users(id_user):
    query = "CALL NuevosAmigos(" + str(id_user) + ")" 
    try:
        cur = mysql.connection.cursor()
        cur.execute(query)
        data = cur.fetchall()
        res = generateArray(cur, data)
        cur.close()
        return Response(json.dumps(res), status=200, content_type='application/json')
    except Exception as e:
        print("allUsers: ", e)
        return Response("{'Status': 'false'}", status=500, content_type='application/json')
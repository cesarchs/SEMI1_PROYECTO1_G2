from flask import Flask, jsonify, request
import pymysql
import mysql.connector
import hashlib
from flask_cors import CORS

'''conexion = mysql.connector.connect(
    host = '127.0.0.1',
    port = 3306,
    user = 'root',
    password = '1517',
    database = 'db_prueba'
)
print("conexion local: " + str(conexion))
'''
conexion = mysql.connector.connect(
    host = 'bdproyecto1.cgofcdyhh2sv.us-east-1.rds.amazonaws.com',
    port = 2022,
    user = 'admin',
    password = 'administrador12345',
    database = 'BD_PROYECTO1'
)
print("conexion aws: " + str(conexion))

app = Flask(__name__)
CORS(app)

imageS3 = "https://archivos-2grupo-p1.s3.amazonaws.com/fotos/"


#ALLFRIENDS
@app.route('/allFriends', methods=['GET'])
def allFriends():
    amigos = []
    sql = ("SELECT * FROM AMIGO")
    with conexion.cursor() as cursor:
        cursor.execute(sql)
        #amigos = cursor.fetchone()[0]
        amigos = cursor.fetchall()
    conexion.close()
    #return str(amigos[0][1])
    return amigos




#LOGIN USER
@app.route('/login', methods=['POST'])
def login():
    try:
        userLogin = None
        userOrEmail = request.json['user']
        pwd = request.json['pwd']
        pwdHash = hashlib.sha256(pwd.encode('utf-8')).hexdigest()
        Mensaje = ("Usuario a logear: " + str(userOrEmail) + ", " + str(pwdHash))
        print(Mensaje)
        q1 = "SELECT * FROM USUARIO WHERE ( user = '" + userOrEmail + "' AND pwd = '" + pwdHash + "')"
        q2 =  " OR ( email = '" + userOrEmail + "' AND pwd = '" + pwdHash + "')"
        query = q1 + q2
        with conexion.cursor() as cursor:
            cursor.execute(query)
            userLogin = cursor.fetchall()
            if len(userLogin) == 0:
                return ("Usuario o contraseña incorrecta")
        conexion.close()
        #return userLogin
        respuesta = {
            "idUsuario" : userLogin[0][0],
            "user" : userLogin[0][1],
            "email" : userLogin[0][3],
            "pwd" : userLogin[0][4],
            "fullname" : userLogin[0][2],
            "photo" : userLogin[0][5]
        }
        return jsonify(respuesta)
        #return str(respuesta)
    except:
        return ("Error en login de usuario")


#REGISTER
@app.route('/register', methods=['POST'])
def register():
    try:
        userRegister = None
        user = request.json['user']
        fullname = request.json['fullname']
        email = request.json['email']
        pwd = request.json['pwd']
        urlPhotoS3 = str(imageS3)+str(user)+".jpg"

        pwdHash = hashlib.sha256(pwd.encode('utf-8')).hexdigest()
        Mensaje = ("Usuario a registrar: " + str(user) + ", " + str(pwdHash))
        print(Mensaje)

        q1 = "SELECT * FROM USUARIO WHERE ( user = '" + user + "' OR email = '" + email + "')"
        with conexion.cursor() as cursor:
            cursor.execute(q1)
            userRegister = cursor.fetchall()
            if len(userRegister) > 0:
                return "(502), Usuario ya existe"
        q1 = "insert into USUARIO (user,fullname, email,pwd,photo) values ("
        q2 = "'" + user + "', '" + fullname + "', '" + email + "', '" + pwdHash + "', '" + urlPhotoS3 + "')"
        query = q1 + q2
        with conexion.cursor() as cursor:
            cursor.execute(query)
        conexion.commit()
        conexion.close()
        #return ("(200), Usuario registrado\n" + str(userRegister))
        return ("Status: true")
    except:
        return ("Status: false")


#ADD FRIEND
@app.route('/addFriend', methods=['POST'])
def addFriend():
    try:
        addFriend = None
        idUser = request.json['id_user']
        idFriend = request.json['id_friend']
 
        q1 = "INSERT INTO AMIGO (usuario1,usuario2,fechaAmistad) VALUES("
        q2 = "" + str(idUser) + ", " + str(idFriend) + ", DATE_SUB(now(), INTERVAL 6 HOUR) )"
        query = q1 + q2
        #print(query)
        with conexion.cursor() as cursor:
            cursor.execute(query)
        conexion.commit()
        conexion.close()
        return ("Status: true")
    except:
        return ("Status: false")


#ALLUSERS
@app.route('/allUsers/<idUser>', methods=['GET'])
def allUsers(idUser):
    try:
        usuarios = []
        sql = ("CALL NuevosAmigos(" + str(idUser) + ")" )
        with conexion.cursor() as cursor:
            cursor.execute(sql)
            usuarios = cursor.fetchall()
        conexion.close()
        respuestas = [] #ARRGLO
        for i in usuarios:
            respuesta = { #DICCIONARIO/OBJETO
                "idUsuario" : i[0],
                "user" : i[1],
                "photo" : i[2],
                "ArchivosPublicos" : i[3],
                "ArchivosPrivados" : i[4]
            }
            respuestas.append(respuesta)
        return respuestas
    except:
        return ("Error en CALL NuevosAmigos")

# ARCHIVOS PUBLICOS DE USUARIOS AMIGO
@app.route('/friendFiles/<idUser>', methods=['GET'])
def friendFiles(idUser):
    try:
        usuarios = []
        q1 = "SELECT aux.idArchivo, aux.tipoArchivo, aux.URL , aux.file_name, aux.user, date_format(aux.FechaModificacion, '%d/%m/%Y') "
        q2 = "AS FechaModificacion FROM ( SELECT a.idArchivo, a.tipoArchivo, a.URL , u.idUsuario, a.file_name, u.user, a.FechaModificacion "
        q3 = "FROM USUARIO u INNER JOIN ARCHIVO a ON u.idUsuario = a.propietario WHERE a.private = 0 AND u.idUsuario <> " + str(idUser)
        q4 = " ) aux INNER JOIN( (SELECT usuario2 as idUsuario FROM AMIGO where usuario1 = " + str(idUser)
        q5 = " ) UNION (SELECT usuario1 as idUsuario FROM AMIGO where usuario2 = " + str(idUser)
        q6 = " ) ) aux1 ON aux.idUsuario = aux1.idUsuario ORDER BY aux.user ASC"
        query = q1 + q2 + q3 + q4 + q5 + q6 
        print(query)
        with conexion.cursor() as cursor:
            cursor.execute(query)
            result = cursor.fetchall()
        conexion.close()
        #return result
        return ("Status: true")
    except:
        return ("Status: false")


#ARCHIVOS DE MI USUARIO, O ARCHIVOS SEGUN ID
@app.route('/userFiles/<idUser>', methods=['GET'])
def userFiles(idUser):
    try:
        files = []
        q1 = "SELECT idArchivo, tipoArchivo, file_name, private, URL, date_format(FechaCreacion, '%d/%m/%Y') as FechaCreada, "
        q2 = "date_format(FechaModificacion, '%d/%m/%Y') as FechaModificacion "
        q3 = "FROM ARCHIVO WHERE propietario = " + str(idUser) + " ORDER BY private ASC"
        query = q1 + q2 + q3
        print(query)
        with conexion.cursor() as cursor:
            cursor.execute(query)
            files = cursor.fetchall()
            if len(files) == 0:
                return ("No hay datos para el usuario " + str(idUser))
        conexion.close()
        respuestas = [] #ARRGLO
        for i in files:
            respuesta = { #DICCIONARIO/OBJETO
                "idArchivo" : i[0],
                "tipoArchivo" : i[1],
                "file_name" : i[2],
                "private" : i[3],
                "URL" : i[4],
                "FechaCreada" : i[5],
                "FechaModificacion" : i[6]
            }
            respuestas.append(respuesta)
        return respuestas
    except:
        return ("(502), Error en archivos de usuario")


#MIS AMIGOS
@app.route('/myFriends/<idUser>', methods=['GET'])
def myFriends(idUser):
    try:
        amigos = []
        sql = ("CALL MisAmigos(" + str(idUser) + ")" )
        with conexion.cursor() as cursor:
            cursor.execute(sql)
            amigos = cursor.fetchall()
        conexion.close()
        respuestas = [] #ARRGLO
        for i in amigos:
            respuesta = { #DICCIONARIO/OBJETO
                "idUsuario" : i[0],
                "fullname" : i[1],
                "user" : i[2],
                "email" : i[3],
                "photo" : i[4]
            }
            respuestas.append(respuesta)
        return respuestas
    except:
        return ("Error en CALL MisAmigos")

if __name__ == '__main__':
    app.run(debug=True)
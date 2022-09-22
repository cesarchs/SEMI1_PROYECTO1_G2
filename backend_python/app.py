from flask import Flask, jsonify, request
import pymysql
import mysql.connector
import hashlib

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

imageS3 = "https://archivos-2grupo-p1.s3.amazonaws.com/fotos/"

#ALLUSERS
@app.route('/allUsers', methods=['GET'])
def allUsers():
    usuarios = []
    sql = ("SELECT * FROM USUARIO")
    with conexion.cursor() as cursor:
        cursor.execute(sql)
        usuarios = cursor.fetchall()
    conexion.close()
    return usuarios

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
        #print(jsonify(respuesta))
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
        return ("(200), Usuario registrado\n" + str(userRegister))
    except:
        return ("(502), Error en registro de usuario")


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
        return ("(200), Amigo registrado\n" + str(addFriend))
    except:
        print("(502), Error en registro de Amgio")
        return None


@app.route('/userFiles/<idUser>', methods=['GET'])
def userFiles(idUser):
    try:
        files = None

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
        return files
    except:
        return ("(502), Error en archivos de usuario")



if __name__ == '__main__':
    app.run(debug=True)
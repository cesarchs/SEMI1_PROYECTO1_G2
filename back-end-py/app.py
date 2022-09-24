from flask import Flask

# LISTA DE ENDPOINTS POR HACER 
# http://localhost:5000/apiUsuarioN/login 					    POST
# http://localhost:5000/apiUsuarioN/register				    POST

# http://localhost:5000/apiUsuarioN/friendFiles/:idUsuario	 	GET
# http://localhost:5000/apiUsuarioN/userFiles/:idUsuario		GET
# http://localhost:5000/apiUsuarioN/uploadFile				    POST
# http://localhost:5000/apiUsuarioN/editFile				    POST

# http://localhost:5000/apiUsuarioN/addFriend				    POST
# http://localhost:5000/apiUsuarioN/myFriends/:idUsuario		GET
# http://localhost:5000/apiUsuarioN/allUsers/:idUsuario			GET


app = Flask(__name__)

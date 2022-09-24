from routes.user import user_endpoints
from routes.file import file_endpoints
from routes.friend import friend_endpoints
from app import app
from flask_cors import CORS

# MIDDELWARES
CORS(app)

# ROUTES
app.register_blueprint(user_endpoints)
app.register_blueprint(file_endpoints)
app.register_blueprint(friend_endpoints)


if __name__ == '__main__':
    app.run(debug = True, port = 5000)
# Author: Carlos Paredes

from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
# from dotenv import load_dotenv
# import os
# from flask_jwt_extended import get_jwt_identity
# from flask_jwt_extended import jwt_required
from .logged_in_user import LoggedUser

app = Flask(__name__)

# Config:
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///../habitTracker.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
cors = CORS(app)
# load_dotenv()
# SECRET_KEY = os.environ["SECRET_KEY"]

# TODO: Change this and store it in .env!
app.config['SECRET_KEY'] = 'TEST_SECRET_KEY@°2' 
app.config["JWT_SECRET_KEY"] = "7b4d8e2f9c1a6f5e3c4e1c9a2f6d8e7b"  # TODO: Change this and store it in .env!

# jwt = JWTManager(app)

logged_user = LoggedUser("")


# Register blueprints
from app.endpoints import user_bp, habit_bp
app.register_blueprint(user_bp)
app.register_blueprint(habit_bp)

if __name__ == '__main__':
    app.run(debug=True)

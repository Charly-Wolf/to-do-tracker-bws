# Author: Carlos Paredes

from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
# from dotenv import load_dotenv
# import os

app = Flask(__name__)

# Config:
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///../habitTracker.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
cors = CORS(app)
# load_dotenv()
# SECRET_KEY = os.environ["SECRET_KEY"]

# Register blueprints
from app.endpoints import user_bp, habit_bp
app.register_blueprint(user_bp)
app.register_blueprint(habit_bp)

if __name__ == '__main__':
    app.run(debug=True)

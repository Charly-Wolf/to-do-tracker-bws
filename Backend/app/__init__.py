# Author: Carlos Paredes

from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# DB config:
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///../habitTracker.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
cors = CORS(app)

# Register blueprints
from app.routes import user_bp, habit_bp
app.register_blueprint(user_bp)
app.register_blueprint(habit_bp)

if __name__ == '__main__':
    app.run(debug=True)

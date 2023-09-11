from flask import Flask, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, Date, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship, backref
from sqlalchemy import func

app = Flask(__name__)

# DB config:
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///habitTracker.db'
db = SQLAlchemy(app)
cors = CORS(app)  # Enable CORS for all routes

# Classes:
class User(db.Model):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    lastname = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    password = Column(String(128), nullable=False)
    last_login_date = Column(DateTime)
    userType = Column(String(50))

    # Define the habits relationship without a column in the database
    habits = relationship('Habit', backref=backref('user', uselist=False), lazy='dynamic')

    __mapper_args__ = {
        'polymorphic_on': userType,
        'polymorphic_identity': 'user'
    }

class Admin(User):
    __tablename__ = 'admins'

    adminId = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))

    __mapper_args__ = {
        'polymorphic_identity': 'admin'
    }

class NormalUser(User):
    __tablename__ = 'normal_users'

    normalUserId = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    account_activated = Column(Boolean)

    __mapper_args__ = {
        'polymorphic_identity': 'normal_user'
    }

class Habit(db.Model):
    habit_id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    name = Column(String(100), nullable=False)
    status = Column(Boolean, default=False)
    # created_at = Column(DateTime, default=datetime.utcnow)
    @property
    def habitLogs(self):
        return HabitLog.query.filter_by(habit_id=self.habit_id).all()


class HabitLog(db.Model):
    log_id = Column(Integer, primary_key=True)
    habit_id = Column(Integer, ForeignKey('habit.habit_id'), nullable=False)
    log_date = Column(DateTime, nullable=False)

# Routes
@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()

    users_list = []

    for user in users:
        user_data = {
            "id": user.id,
            "name": user.name,
            "lastname": user.lastname,
            "email": user.email,
            "password": user.password,
            "last_login_date": user.last_login_date,
            "userType": user.userType
        }
        users_list.append(user_data)

    return jsonify(users_list)

@app.route('/habits', methods=['GET'])
def get_habits():
    #TODO user_id = request.cookies.get('user_id')  # Get user ID from the cookie
    # if user_id is None:
    #     return jsonify({'message': 'User not logged in'}), 401

    # habit_list = get_current_user_habits_in_a_dictionary(user_id)

    habits = Habit.query.all()

    habits_list = []

    for habit in habits:
        habit_data = {
            "habit_id": habit.habit_id,
            "user_id": habit.user_id,
            "name": habit.name,
            "status": habit.status,
            "habitLogs": [{"log_id": log.log_id, "log_date": log.log_date} for log in habit.habitLogs]
        }
        habits_list.append(habit_data)


    return jsonify(habits_list)

@app.route('/log_entries', methods=['GET'])
def get_log_entries():
    log_entries = HabitLog.query.all() # Fetch all log entries from the database
    log_entry_list = []

    for log_entry in log_entries:
        log_entry_data = {
            "log_id": log_entry.log_id,
            "habit_id": log_entry.habit_id,
            "log_date": log_entry.log_date
        }
    
        log_entry_list.append(log_entry_data)
    
    return jsonify(log_entry_list)

# Create DB:
db.create_all() 

if __name__ == '__main__':
    app.run()
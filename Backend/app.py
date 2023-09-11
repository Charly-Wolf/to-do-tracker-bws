from flask import Flask, jsonify, request, render_template, redirect, url_for, make_response
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Date, func
from sqlalchemy.orm import relationship, backref
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

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
    last_login_date = Column(Date)
    userType = Column(String(50))
    
    habits = relationship('Habit', backref=backref('user', uselist=False), lazy='dynamic') # Defines the habits relationship without a column in the database

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
            "userType": user.userType,
            # "habits": user.habits
        }
        users_list.append(user_data)

    return jsonify(users_list)

@app.route('/habits', methods=['GET'])
def get_habits():
    user_id = request.cookies.get('user_id')  # Get user ID from the cookie
    if user_id is None:
        return jsonify({'message': 'User not logged in'}), 401

    habits_list = []

    habits_list = get_current_user_habits_in_a_dictionary(user_id)

    if not habits_list:
        return jsonify({'message': 'The current user does not have any habits'}), 401

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

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        data = request.get_json()
        email = data.get('email').strip() #TODO: regex validation!
        name = data.get('name').strip()
        lastname = data.get('lastname').strip()
        password = data.get('password')
        password2 = data.get('password2')

        if not email or not name or not lastname or not password or not password2:
            return jsonify({'message': 'Email address, name, lastname and password are required'}), 400

        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return jsonify({'message': 'Email already in use'}), 409

        if password != password2:
            return jsonify({'message': 'Passwords must be the same'}), 400
        # Hash the password
        hashed_password = generate_password_hash(password, method='sha256')

        new_user = NormalUser(email=email, name=name, lastname=lastname, password=hashed_password, account_activated = False)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({'message': 'User registered successfully'}), 201
    return render_template('register.html')

@app.route('/activationPending')
def activationPending():
    return render_template('activationPending.html') #TODO: only accessible after registering...

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        data = request.get_json()
        email= data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({'message': 'Email address and password are required'}), 400
        
        user = User.query.filter_by(email=email.strip()).first()

        if user and check_password_hash(user.password, password):

            if user.userType == 'normal_user':
                normal_user = NormalUser.query.filter_by(user_id=user.id).first()
                if not normal_user.account_activated:
                    return jsonify({'message': 'Account not yet activated'}), 401 

            if user.last_login_date != datetime.today().date():
                reset_user_habits_status(user.id)

            #else:
                #TODO
                print("\nLast login was today\n")

            user.last_login_date = datetime.today()  # Update the last login date
            db.session.commit()
            response = make_response(jsonify({'message': 'Login successful'}), 200)
            response.set_cookie('user_id', str(user.id))  # Set the user_id cookie

            return response
        else:
            return jsonify({'message': 'Wrong username or password'}), 401 
    return render_template('login.html')

@app.route('/logout', methods=['POST'])
def logout():
    response = make_response(jsonify({'message': 'Logged out'}), 200)
    response.delete_cookie('user_id')  # Clear the user_id cookie
    #TODO: failed logout (for example if the user already logged out...)
    return response

@app.route('/')
def index():
    user_id = request.cookies.get('user_id')
    if user_id is None:
        return redirect(url_for('login'))  # Redirect to the login page if user is not logged in
    user = User.query.filter_by(id=user_id).first()
    if user.userType == 'admin':
        return render_template('index_admin.html')
    return render_template('index.html')


# Helper Functions
def reset_user_habits_status(user_id):   
    habits = Habit.query.filter_by(user_id=user_id).all()
    if habits:
        for habit in habits:
            habit.status = False
        db.session.commit()
    # else:
        #TODO

def get_current_user_habits_in_a_dictionary(user_id):
    habits = Habit.query.filter_by(user_id=user_id).all() 
    habit_list = []

    for habit in habits:
        habit_data = {
            "habit_id": habit.habit_id,
            "user_id": habit.user_id,
            "name": habit.name,
            "status": habit.status,
            "habitLogs": [{"log_id": log.log_id, "log_date": log.log_date} for log in habit.habitLogs]
        }
        habit_list.append(habit_data)

    print("\n\n")
    for habit in habits:
        print(f"Habit: {habit.name}")
        for log in habit.logs:
            print(str(log.log_date.date()))

    return habit_list


# Create DB:
db.create_all() 

if __name__ == '__main__':
    app.run()
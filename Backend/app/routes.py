from flask import Blueprint, jsonify, request, render_template, redirect, url_for, make_response
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from app.models import User, Habit, HabitLog, NormalUser, db
from app.helpers import reset_user_habits_status, get_current_user_habits_in_a_dictionary
from validate_email_address import validate_email

user_bp = Blueprint('user', __name__)
habit_bp = Blueprint('habit', __name__)

@user_bp.route('/users', methods=['GET'])
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

@habit_bp.route('/habits', methods=['GET'])
def get_habits():
    user_id = request.cookies.get('user_id')  # Get user ID from the cookie
    if user_id is None:
        return jsonify({'message': 'User not logged in'}), 401

    habits_list = []

    habits_list = get_current_user_habits_in_a_dictionary(user_id)

    # if not habits_list:
    #     return jsonify({'message': 'The current user does not have any habits'}), 401 # TODO: check if this can be optimized so that the Frontend accordingly adapts when there are no habits for this user

    return jsonify(habits_list)

@habit_bp.route('/add_habit', methods=['POST'])
def add_habit():
    try:
        data = request.get_json()
        habit_name = data.get('name')
        user_id = request.cookies.get('user_id') 

        if not habit_name or not habit_name.strip():
            return jsonify({'message': 'Habit name cannot be empty!'}), 400

        #Check if the user already has a habit with that name
        user_id = request.cookies.get('user_id')
        user_habits = get_current_user_habits_in_a_dictionary(user_id)  # Call the function to get the list of habits

        for user_habit in user_habits:
            if habit_name.lower() == user_habit['name'].lower():
                return jsonify({'message': 'That habit already exists.'}), 400

        new_habit = Habit(user_id=user_id, name=habit_name)  # Associate habit with the user

        db.session.add(new_habit)
        db.session.commit()

        return jsonify({'message': 'Habit added successfully'}), 201
    except Exception as e:
        return jsonify({'message': 'An error occurred while adding the habit.'}), 500

@habit_bp.route('/log_entries', methods=['GET'])
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

@user_bp.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        data = request.get_json()
        email = data.get('email').strip() 
        name = data.get('name').strip()
        lastname = data.get('lastname').strip()
        password = data.get('password')
        password2 = data.get('password2')

        if not email or not name or not lastname or not password or not password2:
            return jsonify({'message': 'Email address, name, lastname and password are required'}), 400
        
        if not validate_email(email):
            return jsonify({'message': 'Wrong email address format'}), 400

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

@user_bp.route('/activationPending')
def activationPending():
    return render_template('activationPending.html') #TODO: only accessible after registering...

@user_bp.route('/login', methods=['GET', 'POST'])
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

@user_bp.route('/logout', methods=['POST'])
def logout():
    response = make_response(jsonify({'message': 'Logged out'}), 200)
    response.delete_cookie('user_id')  # Clear the user_id cookie
    #TODO: failed logout (for example if the user already logged out...)
    return response

@habit_bp.route('/')
def index():
    user_id = request.cookies.get('user_id')
    if user_id is None:
        return redirect(url_for('user.login'))  # Redirect to the login page if user is not logged in
    user = User.query.filter_by(id=user_id).first()
    if user.userType == 'admin':
        return render_template('index_admin.html')
    return render_template('index.html')
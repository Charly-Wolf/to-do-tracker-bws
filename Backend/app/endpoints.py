# Author: Carlos Paredes

from flask import Blueprint, jsonify, request, render_template, redirect, url_for, make_response
from werkzeug.security import check_password_hash
from datetime import datetime
from app.models import User, Habit, HabitLog, NormalUser, db
from app.helpers import reset_user_habits_status, prepare_habit_list, validate_habit_name_format, validate_habit_name_length, filter_logs_by_date, filter_logs_by_habit_id, prepare_user_list, prepare_log_entries, get_logged_in_user, validate_add_habit, validate_register_user, validate_edit_habit_name
from app import logged_user

user_bp = Blueprint('user', __name__)
habit_bp = Blueprint('habit', __name__)

# @habit_bp.route('/')
# def index():
#     user = get_logged_in_user()
#     if user is None:
#         return redirect(url_for('user.login'))  # Redirect to the login page if user is not logged in
#     if user.userType == 'admin':
#         return render_template('index_admin.html') # TODO: change this to fit REACT
#     return render_template('index.html') # TODO: change this to fit REACT

@user_bp.route('/api/users', methods=['GET'])
def get_users():
    users_list_data = prepare_user_list()

    if users_list_data is None:
        return jsonify({'message': 'No permissions to see the users list'}), 401

    return jsonify(users_list_data)

@habit_bp.route('/api/habits', methods=['GET'])
def get_habits():
    #user = get_logged_in_user() #TODO: USE AUTHORIZATION 
    # if user is None:
    #     return jsonify({'message': 'No permissions to see the habits list'}), 401

    habits_list = prepare_habit_list()
    # if not habits_list:
    #     return jsonify({'message': 'The current user does not have any habits'}), 401 # TODO: check if this can be optimized so that the Frontend accordingly adapts when there are no habits for this user
    return jsonify(habits_list)

@habit_bp.route('/api/add_habit', methods=['POST'])
def add_habit():
    try:
        data = request.get_json()
        habit_name = data.get('name')

        return validate_add_habit(habit_name)
        
    except Exception as e:
        return jsonify({'message': 'An error occurred while adding the habit.'}), 500

@habit_bp.route('/api/log_entries', methods=['GET'])
def get_log_entries():
    log_entry_list = prepare_log_entries()
    
    if log_entry_list is None:
        return jsonify({'message': 'No permissions to see the log entries'}), 401

    return jsonify(log_entry_list)

@user_bp.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email').strip() 
    name = data.get('name').strip()
    lastname = data.get('lastname').strip()
    password = data.get('password')
    password2 = data.get('password2')

    return validate_register_user(email, name, lastname, password, password2)

@user_bp.route('/api/activationPending')
def activationPending():
    return render_template('activationPending.html') # TODO: 1) change this to fit REACT TODO: 2) make it only accessible after registering...

@user_bp.route('/api/login', methods=['POST'])
def login():
    credentials = request.get_json()
    email= credentials.get('email')
    password = credentials.get('password')

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

        user.last_login_date = datetime.today()  # Update the last login date
        db.session.commit()
        response = make_response(jsonify({'message': 'Login successful', 'user_id': user.id, 'user_type': user.userType}), 200)
        logged_user.set_id(user.id)

        return response
    else:
        return jsonify({'message': 'Wrong username or password'}), 401 

@user_bp.route('/api/logout', methods=['GET'])
def logout():
    response = make_response(jsonify({'message': 'Logged out'}), 200)
    logged_user.set_id(None)  

    #TODO: failed logout (for example if the user already logged out...)
    return response

@habit_bp.route('/api/habit/mark_done/<int:habit_id>', methods=['POST'])
def mark_habit_done(habit_id):
    habit = Habit.query.get(habit_id)

    if habit:
        try:
            new_log = HabitLog(habit_id=habit.habit_id, log_date=datetime.now())
            db.session.add(new_log)

            habit.status = not habit.status
            db.session.commit()

            return jsonify({'message': 'Habit marked as done and log entry created successfully'}), 200
        except Exception as e:
            return jsonify({'message': 'An error occurred while marking habit as done.'}), 500
    else:
        return jsonify({'message': 'Habit not found'}), 404
    
@habit_bp.route('/api/habit/mark_undone/<int:habit_id>', methods=['PUT'])
def unmark_habit_done(habit_id):
    habit = Habit.query.get(habit_id)
    today_date = datetime.now().date()

    if habit:
        try:
            habit_log_to_delete = filter_logs_by_date(filter_logs_by_habit_id(habit_id),today_date)

            db.session.delete(habit_log_to_delete)

            habit.status = not habit.status
            db.session.commit()

            return jsonify({'message': 'Habit marked as undone and corresponding log entry deleted successfully'}), 200
    
        except Exception as e:
            return jsonify({'message': f'No log entry found for the habit_id {habit_id} today ({today_date}).'}), 500  
    else:
        return jsonify({'message': 'Habit not found'}), 404
    
@habit_bp.route('/api/habit/update_name/<int:habit_id>', methods=['PUT'])
def update_habit_name(habit_id):
    habit = Habit.query.get_or_404(habit_id) # TODO: Check if it's better to use get_or_404 instead of simply get for all methods
    
    try:
        data = request.get_json()
        new_name = data.get('name').strip()
        
        return validate_edit_habit_name(habit, new_name)
    
    except Exception as e:
        return jsonify({'message': 'An error occurred while updating the habit name.'}), 500
    
@habit_bp.route('/api/habit/<int:habit_id>', methods=['DELETE'])
def delete_habit(habit_id):
    habit = Habit.query.get_or_404(habit_id)
    
    try:
        if (len(filter_logs_by_habit_id(habit_id)) > 0):
            return jsonify({'message': 'Cannot delete habit. There are log entries for this habit'}), 400 # TODO: IDEA: Change to "Archive" instead of delete, so that the habits with logs can be then restored
        db.session.delete(habit)
        db.session.commit()
        return jsonify({'message': 'Habit deleted successfully'}), 200
    except Exception as e:
        return jsonify({'message': 'An error occurred while deleting the habit.'}), 500

# @user_bp.route('/api/users_list', methods=['GET']) 
# def users_list():
#     users_list_data = prepare_user_list()

#     if users_list_data is None:
#         return jsonify({'message': 'No permissions to see the users list'}), 401

#     # return render_template('users_list.html', users=users_list_data) # TODO: change this to fit REACT


@user_bp.route('/api/users/toggle_user_status/<int:user_id>', methods=['PUT'])
def block_user(user_id): # Get user ID from the cookie
    user = User.query.filter_by(id=user_id).first()
    # is_logged_user_admin = get_logged_in_user().userType == 'admin' TODO: Implement this and Test this with POSTMAN
    # is_user_to_toggle_admin = user.userType == 'admin' # TODO: Implement this and Test this with POSTMAN
    # if is_logged_user_admin:
    if user:
        try:
            user.account_activated = not user.account_activated
            db.session.commit()

            return jsonify({'message': 'User status succesfully toggled'}), 200
        except Exception as e:
            return jsonify({'message': 'An error occurred while toggling user status.'}), 500
    else:
        return jsonify({'message': 'User not found'}), 404
    # else:
    #     return jsonify({'message': 'You have no permissions'}), 401
# Author: Carlos Paredes

from flask import Blueprint, jsonify, request, make_response
from werkzeug.security import check_password_hash
from datetime import datetime
from app.models import User, Habit, HabitLog, NormalUser, db
from app.helpers import reset_user_habits_status, prepare_habit_list, filter_logs_by_date, filter_logs_by_habit_id, prepare_user_list, get_logged_in_user, validate_add_habit, validate_register_user, validate_edit_habit_name
from app import logged_user

user_bp = Blueprint('user', __name__)
habit_bp = Blueprint('habit', __name__)

@user_bp.route('/api/users', methods=['GET'])
def get_users():
    users_list_data = prepare_user_list()
    if users_list_data is None:
        return jsonify({'message': 'Keine Berechtigungen, die Benutzerliste einzusehen.'}), 401
        #TODO: REDIRECT TO LOGIN!!
    return jsonify(users_list_data)

@habit_bp.route('/api/habits', methods=['GET'])
def get_habits():
    user = get_logged_in_user() 
    if user is None:
        return jsonify({'message': 'Keine Berechtigung, die Habit-Liste anzusehen.'}), 401
    habits_list = prepare_habit_list()
    return jsonify(habits_list)

@habit_bp.route('/api/add_habit', methods=['POST'])
def add_habit():
    try:
        data = request.get_json()
        habit_name = data.get('name')
        return validate_add_habit(habit_name)     
    except Exception as e:
        return jsonify({'message': 'Beim Hinzufügen des Habits ist ein Fehler aufgetreten.'}), 500

@user_bp.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email').strip() 
    name = data.get('name').strip()
    lastname = data.get('lastname').strip()
    password = data.get('password')
    password2 = data.get('password2')
    return validate_register_user(email, name, lastname, password, password2)

@user_bp.route('/api/login', methods=['POST'])
def login():
    credentials = request.get_json()
    email= credentials.get('email')
    password = credentials.get('password')
    if not email or not password:
        return jsonify({'message': 'Die E-Mail-Adresse und das Passwort sind erforderlich.'}), 400   
    user = User.query.filter_by(email=email.strip()).first()
    if user and check_password_hash(user.password, password):
        if user.userType == 'normal_user':
            normal_user = NormalUser.query.filter_by(user_id=user.id).first()
            if not normal_user.account_activated:
                return jsonify({'message': 'Konto noch nicht aktiviert.'}), 401 
        
        if user.last_login_date != datetime.today().date():
            reset_user_habits_status(user.id)
        user.last_login_date = datetime.today()  # Update the last login date
        db.session.commit()
        response = make_response(jsonify({'message': 'Login erfolgreich', 'user_id': user.id, 'user_type': user.userType}), 200)
        logged_user.set_id(user.id)
        return response
    else:
        return jsonify({'message': 'Falscher Benutzername oder falsches Passwort!'}), 401 

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
            return jsonify({'message': 'Habit als erledigt markiert und Entry Log erfolgreich erstellt.'}), 200
        except Exception as e:
            return jsonify({'message': 'Ein Fehler ist aufgetreten, während Habit als erledigt markiert wurde.'}), 500
    else:
        return jsonify({'message': 'Habit nicht gefunden.'}), 404
    
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
            return jsonify({'message': 'Habit als rückgängig markiert und entsprechender Entry Log erfolgreich gelöscht'}), 200
        except Exception as e:
            return jsonify({'message': f'Kein Log Entry für die habit_id {habit_id} heute ({today_date}) gefunden.'}), 500  
    else:
        return jsonify({'message': 'Habit nicht gefunden'}), 404
    
@habit_bp.route('/api/habit/update_name/<int:habit_id>', methods=['PUT'])
def update_habit_name(habit_id):
    habit = Habit.query.get_or_404(habit_id) # TODO: Check if it's better to use get_or_404 instead of simply get for all methods    
    try:
        data = request.get_json()
        new_name = data.get('name').strip()       
        return validate_edit_habit_name(habit, new_name)   
    except Exception as e:
        return jsonify({'message': 'Ein Fehler ist aufgetreten, während der Habit-Name aktualisiert wurde.'}), 500
    
@habit_bp.route('/api/habit/<int:habit_id>', methods=['DELETE'])
def delete_habit(habit_id):
    habit = Habit.query.get_or_404(habit_id)  
    try:
        habit_logs_to_delete = filter_logs_by_habit_id(habit_id)
        if (len(habit_logs_to_delete) > 0):
            for log in habit_logs_to_delete:
                db.session.delete(log);
            db.session.commit()
        db.session.delete(habit)
        db.session.commit()
        return jsonify({'message': 'Habit erfolgreich gelöscht'}), 200
    except Exception as e:
        return jsonify({'message': f'Ein Fehler ist beim Löschen des Habit aufgetreten: {e}'}), 500

@user_bp.route('/api/users/toggle_user_status/<int:user_id>', methods=['PUT'])
def block_user(user_id): # Get user ID from the cookie
    user = User.query.filter_by(id=user_id).first()
    if user:
        try:
            user.account_activated = not user.account_activated
            db.session.commit()
            return jsonify({'message': 'Userstatus erfolgreich umgeschaltet.'}), 200
        except Exception as e:
            return jsonify({'message': 'Ein Fehler ist aufgetreten, während der Userstatus umgeschaltet wurde.'}), 500
    else:
        return jsonify({'message': 'User nicht gefunden'}), 404
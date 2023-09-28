# Author: Carlos Paredes

from flask import jsonify
from app.models import User, Habit, HabitLog, NormalUser, db
import re # Regular Expressions
from werkzeug.security import generate_password_hash, check_password_hash
from validate_email_address import validate_email
from app import logged_user

def reset_user_habits_status(user_id):   
    habits = Habit.query.filter_by(user_id=user_id).all()
    for habit in habits:
        habit.status = False
    db.session.commit()

def prepare_habit_list():
    habits = Habit.query.filter_by(user_id=logged_user.get_id()).all() 
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

    return habit_list

def prepare_user_list():
    user = get_logged_in_user()

    if user is None or not user.userType == 'admin':
        return None  # Return None to indicate no permission

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

        # Check if the user is a NormalUser and add the account_activated attribute
        if user.userType == 'normal_user':
            user_data["account_activated"] = user.account_activated

        users_list.append(user_data)

    return users_list

def validate_user_name_characters(name):
    # Regular Expression for latin alphabet characters and common European characters
    name_pattern = re.compile(r'^[A-Za-zÀ-ÿ\s\-\']+$')
    
    if not name_pattern.match(name):
        return False
    else: return True

def validate_user_name_length(name):
    name_lenght = len(name.strip())
    if (name_lenght > 20) or (name_lenght < 2):
        return False
    else: return True

def validate_password_format(password):
    # Regular Expression for at least: 
        # 8 characters,
        # one uppercase letter, 
        # one lowercase letter,
        # one digit, 
        # and one special character. 
        # Umlauts are allowed.
    special_chars = "@$!%*?&_-/"
    pattern = r'^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[' + re.escape(special_chars) + r'])[A-Za-z\d' + re.escape(special_chars) + r'äöüÄÖÜß]{8,}$'

    return re.match(pattern, password) is not None

def validate_habit_name_format(habit_name):
    # Regular Expression for: 
        # between 2 and 30 characters,
        # letters,
        # numbers,
        # basic special characters,
        # Umlauts are allowed
        # Emojis are allowed
    pattern = r'^(?![ ]{3,})(?!.*[ ]{2,}$)(?=[\w\säöüÄÖÜß.,!?()\'"\-&@/:;😀-🙏]+)(?=.{2,30}$).*$'

    return re.match(pattern, habit_name) is not None

def validate_habit_name_length(habit_name):
    name_lenght = len(habit_name.strip())
    if (name_lenght > 30) or (name_lenght < 2):
        return False
    else: return True

def filter_logs_by_date(logs, target_date):
    for log in logs:
        log_date = log.log_date.date()
        if log_date == target_date:
            return log
    return None

def filter_logs_by_habit_id(target_habit_id):
    log_entries = HabitLog.query.filter_by(habit_id=target_habit_id).all()
    return log_entries

def get_logged_in_user():
    user = User.query.filter_by(id=logged_user.get_id()).first()
    return user

def validate_add_habit(habit_name):
    if not habit_name or not habit_name.strip():
        return jsonify({'message': 'Habit-Name kann nicht leer sein!'}), 400
        
    if not validate_habit_name_length(habit_name):
        return jsonify({'message': 'Der Habit-Name muss zwischen 2 und 30 Zeichen lang sein.'}), 400

    if not validate_habit_name_format(habit_name):
        return jsonify({'message': 'Ungültiger Habit-Name'}), 400
    
    #Check if the user already has a habit with that name
    user_habits = prepare_habit_list()  # Call the function to get the list of habits
    for user_habit in user_habits:
        if habit_name.lower() == user_habit['name'].lower():
            return jsonify({'message': 'Ein Habit mit dem gleichen Namen ist schon vorhanden.'}), 400

    user_id = logged_user.get_id()
    new_habit = Habit(user_id=user_id, name=habit_name)  # Associate habit with the user

    db.session.add(new_habit)
    db.session.commit()

    return jsonify({'message': 'Habit erfolgreich hinzugefügt.'}), 201

def validate_register_user(email, name, lastname, password, password2):
    
    if not email or not name or not lastname or not password or not password2:
            return jsonify({'message': 'E-Mail-Adresse, Vorname, Nachname und das Passwort sind erforderlich.'}), 400
    
    if not validate_email(email):
        return jsonify({'message': 'Ungültiges E-Mail-Adressformat.'}), 400
    
    if not validate_user_name_length(name) or not validate_user_name_length(lastname):
        return jsonify({'message': 'Vor- und Nachname müssen zwischen 2 und 20 Zeichen lang sein.'}), 400 
    
    if not validate_user_name_characters(name):
        return jsonify({'message': 'Ungültiges Format des Vornamens. Du hast nicht erlaubte Zeichen verwendet.'}), 400
    
    if not validate_user_name_characters(lastname):
        return jsonify({'message': 'Ungültiges Format des Nachnamens. Du hast nicht erlaubte Zeichen verwendet.'}), 400
    
    if not validate_password_format(password):
        return jsonify({'message': 'Ungültiges Passwortformat (Mindestens: 8 Zeichen, ein Großbuchstabe, ein Kleinbuchstabe, eine Ziffer und ein Sonderzeichen).'}), 400

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'message': 'E-Mail bereits registriert.'}), 409

    if password != password2:
        return jsonify({'message': 'Passwort muss richtig wiederholt werden.'}), 400
    # Hash the password
    hashed_password = generate_password_hash(password, method='sha256')

    new_user = NormalUser(email=email, name=name, lastname=lastname, password=hashed_password, account_activated = False)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User erfolgreich registriert'}), 201

def validate_edit_habit_name(habit, new_name):
    user_habits = prepare_habit_list()  # Call the function to get the list of habits

    # Check if a habit already has that name
    for user_habit in user_habits:
        if new_name.lower() == user_habit['name'].lower():
            return jsonify({'message': 'Dieses Habit existiert bereits.'}), 400

    if not new_name or not new_name.strip():
        return jsonify({'message': 'Habit-Name kann nicht leer sein!'}), 400
    
    if not validate_habit_name_length(new_name):
        return jsonify({'message': 'Der Habit-Name muss zwischen 2 und 30 Zeichen lang sein.'}), 400
    
    if not validate_habit_name_format(new_name):
        return jsonify({'message': 'Ungültiger Habit-Name'}), 400
    
    habit.name = new_name
    db.session.commit()
    
    return jsonify({'message': 'Habit-Name erfolgreich geändert!'}), 200

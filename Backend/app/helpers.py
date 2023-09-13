from flask import jsonify, request
from app.models import User, Habit, HabitLog, db
import re # Regular Expressions

def reset_user_habits_status(user_id):   
    habits = Habit.query.filter_by(user_id=user_id).all()
    if habits:
        for habit in habits:
            habit.status = False
        db.session.commit()
    # else:
        #TODO

def prepare_habit_list():
    user = get_logged_in_user()
    habits = Habit.query.filter_by(user_id=user.user_id).all() 
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

def prepare_log_entries():
    user = get_logged_in_user()
    if user is None:
        return None  # Return None to indicate no permission

    # Fetch all habits related to the user
    habits = prepare_habit_list()
    log_entry_list = []

    # Loop through each habit and get its associated log entries
    for habit in habits:
        for log_entry in habit['habitLogs']:
            log_entry_data = {
                "log_id": log_entry['log_id'],
                "log_date": log_entry['log_date']
            }
            log_entry_list.append(log_entry_data)

    return log_entry_list

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
    pattern = r'^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&äöüÄÖÜß]{8,}$'

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

def filter_logs_by_date(logs, target_date): # TODO: maybe it would be better to use HabitLog.query.filter_by(...)
    for log in logs:
        log_date = log.log_date.date()
        if log_date == target_date:
            return log
    return None

def filter_logs_by_habit_id(target_habit_id):
    log_entries = HabitLog.query.filter_by(habit_id=target_habit_id).all()
    return log_entries

def get_logged_in_user():
    user_id = request.cookies.get('user_id')  # Get user ID from the cookie
    user = User.query.filter_by(id=user_id).first()    
    return user
from app.models import Habit, HabitLog, db
import re # Regular Expressions

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

    return habit_list



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
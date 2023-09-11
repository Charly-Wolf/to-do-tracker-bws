from app.models import Habit, db

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
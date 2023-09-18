# Author: Carlos Paredes

from app import app, db, NormalUser, Admin, Habit, HabitLog
from datetime import datetime, timedelta
from werkzeug.security import generate_password_hash

with app.app_context():
    # Create 5 Normal Users
    normal_users = [
        NormalUser(name='John', lastname='Doe', email='john@example.com', password=generate_password_hash('password1', method='sha256'), last_login_date=datetime.now() - timedelta(days=2), account_activated=True),
        NormalUser(name='Alice', lastname='Smith', email='alice@example.com', password=generate_password_hash('password2', method='sha256'), last_login_date=datetime.now() - timedelta(days=1), account_activated=True),
        NormalUser(name='Robert', lastname='Johnson', email='robert@example.com', password=generate_password_hash('password3', method='sha256'), last_login_date=datetime.now() - timedelta(hours=2), account_activated=False),
        NormalUser(name='Emily', lastname='Davis', email='emily@example.com', password=generate_password_hash('password4', method='sha256'), last_login_date=datetime.now() - timedelta(hours=1), account_activated=False),
        NormalUser(name='Michael', lastname='Wilson', email='michael@example.com', password=generate_password_hash('password5', method='sha256'), last_login_date=datetime.now(), account_activated=True),
    ]

    for user in normal_users:
        db.session.add(user)

    # Create 3 Admins
    admins = [
        Admin(name='Admin', lastname='Adminson', email='admin1@example.com', password=generate_password_hash('adminpassword1', method='sha256'), last_login_date=datetime.now()),
        Admin(name='Super', lastname='Admin', email='admin2@example.com', password=generate_password_hash('adminpassword2', method='sha256'), last_login_date=datetime.now()),
        Admin(name='Admin', lastname='Master', email='admin3@example.com', password=generate_password_hash('adminpassword3', method='sha256'), last_login_date=datetime.now()),
    ]

    for admin in admins:
        db.session.add(admin)

    # Create Habits
    habits = [
        # User 1 (John Doe)
        Habit(user_id = 1, name='Work on the LF12 project', status=True),
        Habit(user_id = 1, name='3km running', status=False),
        Habit(user_id = 1, name='Practice Japanese', status=True),

        # User 2 (Alice Smith)
        Habit(user_id = 2, name='15 min book reading', status=False),
        Habit(user_id = 2, name='10km running', status=True),
        Habit(user_id = 2, name='Practice Italian', status=True),

        # User 6 (Admin Adminson)
        Habit(user_id = 6, name='Learn React', status=True),
        Habit(user_id = 6, name='Medidate', status=False)
    ]

    for habit in habits:
        db.session.add(habit)

    # Create Habit Logs
    logs = [
        # Habit 1 (Work on the LF12 project) User 1 (John Doe)
        HabitLog(habit_id = 1, log_date = datetime(2023, 9, 1)),
        
        # Habit 7 (15 min book reading) User 2 (Alice Smith)
        HabitLog(habit_id = 7, log_date = datetime(2023, 9, 4)),
    ]

    for log in logs:
        db.session.add(log)

    db.session.commit()

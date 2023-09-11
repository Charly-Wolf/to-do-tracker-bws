from app import app, db, NormalUser, Admin, Habit
from datetime import datetime, timedelta

# Assuming you have defined your Flask app and database models in "your_application_module"

with app.app_context():
    # Create 5 Normal Users
    normal_users = [
        NormalUser(name='John', lastname='Doe', email='john@example.com', password='password1', last_login_date=datetime.now() - timedelta(days=2), account_activated=True),
        NormalUser(name='Alice', lastname='Smith', email='alice@example.com', password='password2', last_login_date=datetime.now() - timedelta(days=1), account_activated=True),
        NormalUser(name='Robert', lastname='Johnson', email='robert@example.com', password='password3', last_login_date=datetime.now() - timedelta(hours=2), account_activated=False),
        NormalUser(name='Emily', lastname='Davis', email='emily@example.com', password='password4', last_login_date=datetime.now() - timedelta(hours=1), account_activated=False),
        NormalUser(name='Michael', lastname='Wilson', email='michael@example.com', password='password5', last_login_date=datetime.now(), account_activated=True),
    ]

    for user in normal_users:
        db.session.add(user)

    # Create 3 Admins
    admins = [
        Admin(name='Admin', lastname='Adminson', email='admin1@example.com', password='adminpassword1'),
        Admin(name='Super', lastname='Admin', email='admin2@example.com', password='adminpassword2'),
        Admin(name='Admin', lastname='Master', email='admin3@example.com', password='adminpassword3'),
    ]

    for admin in admins:
        db.session.add(admin)

    # Create Habits
    habits = [
        # User 1 (John Doe)
        Habit(user_id = 1, name='Work on the LF12 project', status=True),
        Habit(user_id = 1, name='3km running', status=False),
        Habit(user_id = 1, name='Practice Japanese', status=True),

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

    db.session.commit()

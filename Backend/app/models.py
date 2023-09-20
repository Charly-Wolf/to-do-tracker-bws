# Author: Carlos Paredes

from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Date
from sqlalchemy.orm import relationship, backref
from werkzeug.security import generate_password_hash, check_password_hash
from app import db

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
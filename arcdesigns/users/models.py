# -*- coding: utf-8 -*-
"""User models."""
import datetime as dt

from arcdesigns.database import Column, Model, db, relationship
from werkzeug.security import generate_password_hash, check_password_hash


class User(Model):

    __tablename__ = 'users'

    id = Column(db.Integer, primary_key=True)
    username = Column(db.String(80), unique=True, nullable=False)
    email = Column(db.String(100), unique=True, nullable=False)
    password_hash = Column(db.String(128), nullable=True)
    created_at = Column(db.DateTime, nullable=False, default=dt.datetime.utcnow)
    updated_at = Column(db.DateTime, nullable=False, default=dt.datetime.utcnow)
    image = Column(db.String(120), nullable=True)
    token: str = ''
    

    def __init__(self, username, email, password=None, **kwargs):
        """Create instance."""
        db.Model.__init__(self, username=username, email=email, **kwargs)
        if password:
            self.set_password(password)
        else:
            self.password_hash = None

    def set_password(self, password):
        """Set password."""
        self.password_hash = generate_password_hash(password)

    def check_password(self, value):
        """Check password."""
        return check_password_hash(self.password_hash, value)

    def __repr__(self):
        """Represent instance as a unique string."""
        return '<User({username!r})>'.format(username=self.username)

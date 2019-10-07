import datetime as dt

from flask_jwt_extended import current_user
from slugify import slugify

from arcdesigns.database import (Model, db, Column,
                              reference_col, relationship)

from arcdesigns.users.models import User



class Comment(Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    body = Column(db.Text)
    createdAt = Column(db.DateTime, nullable=False, default=dt.datetime.utcnow)
    updatedAt = Column(db.DateTime, nullable=False, default=dt.datetime.utcnow)
    author_id = reference_col('users', nullable=False)
    author = relationship('User', backref=db.backref('comments'))
    post_id = reference_col('posts', nullable=False)
    

    def __init__(self, article, author, body, **kwargs):
        db.Model.__init__(self, author=author, body=body, article=article, **kwargs)


class Post(Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    slug = Column(db.Text, unique=True)
    title = Column(db.String(100), nullable=False)
    description = Column(db.Text, nullable=False)
    image =  Column(db.String(120), nullable=True)
    body = Column(db.Text)
    cost = Column(db.Integer, nullable=True)
    createdAt = Column(db.DateTime, nullable=False, default=dt.datetime.utcnow)
    updatedAt = Column(db.DateTime, nullable=False, default=dt.datetime.utcnow)
    author_id = reference_col('users', nullable=False)
    author = relationship('User', backref=db.backref('posts'))
    
    comments = relationship('Comment', backref=db.backref('post'), lazy='dynamic')

    def __init__(self, author, title, body, image, description, slug=None, **kwargs):
        db.Model.__init__(self, author=author, title=title, image=image, description=description, body=body,
                          slug=slug or slugify(title), **kwargs)
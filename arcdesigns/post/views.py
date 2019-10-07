""" post views"""
from flask import Blueprint
from flask_apispec import use_kwargs, marshal_with
from .searializers import post_schema, post_schemas
from flask_jwt_extended import jwt_required , get_jwt_identity
from sqlalchemy.exc import IntegrityError
from .models import Post
from arcdesigns.users.models import User
from arcdesigns.exceptions import InvalidUsage
import datetime as dt
from flask import jsonify

blueprint = Blueprint('posts', __name__)


@blueprint.route('/api/designs', methods=('POST',))
@jwt_required
@use_kwargs(post_schema)
@marshal_with(post_schema)
def make_post(title, description, image, body, cost, **kwargs):
    current_user= get_jwt_identity()
    userid = current_user['user_id']
    user = User.query.filter_by(id=userid).first()
    try:
        post = Post(title=title, description=description, body=body, 
                                            image=image, author=user).save()
    except IntegrityError:
        raise InvalidUsage.post_exists()

    return post

@blueprint.route('/api/designs', methods=('GET',))
@jwt_required
@use_kwargs(post_schemas)
@marshal_with(post_schemas)
def get_posts(author=None, limit=20, offset=0):
    response = Post.query
    
    return response.offset(offset).limit(limit).all()

@blueprint.route('/api/designs/<slug>', methods=('PUT',))
@jwt_required
@use_kwargs(post_schema)
@marshal_with(post_schema)
def update_post(slug, **kwargs):
    current_user= get_jwt_identity()
    userid = current_user['user_id']
    post = Post.query.filter_by(slug=slug, author_id=userid).first()

    if post:
        post.update(updatedAt=dt.datetime.utcnow(), **kwargs)
        post.save()
        return post
    else:
        raise InvalidUsage.not_found()


@blueprint.route('/api/designs/<slug>/delete', methods=('DELETE',))
@jwt_required
def delete_post(slug):
    current_user= get_jwt_identity()
    userid = current_user['user_id']
    post = Post.query.filter_by(slug=slug, author_id=userid).first()
    post.delete()
    return jsonify({'msg':'delete successful'}), 200


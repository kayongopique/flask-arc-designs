""" auth views """
from flask import Blueprint
from flask_jwt_extended import create_access_token, get_jwt_identity
from .models import User
from arcdesigns.exceptions import InvalidUsage
from flask_apispec import use_kwargs, marshal_with
from .serializers import user_schema
from sqlalchemy.exc import IntegrityError


auth = Blueprint('auth_blueprint', __name__)



@auth.route('/api/auth/signup', methods=['POST'])
@use_kwargs(user_schema)
@marshal_with(user_schema)
def register(username, email, password, **kwargs):
    try:
        user = User(username=username, email=email, password=password).save()
    except IntegrityError:
        raise InvalidUsage.user_already_registered()
    return user, 201


@auth.route('/api/auth/login', methods=['POST'])
@use_kwargs(user_schema)
@marshal_with(user_schema)
def login_user(email, password, **kwargs):
    user = User.query.filter_by(email=email).first()
    if user and user.check_password(password):
        current_user = user.id
        user = {'user_id': current_user}
        user['token'] = create_access_token(identity=user, fresh=True)
        return user
    else:
        raise InvalidUsage.user_not_found()
        






""" cart views """
from flask import Blueprint, jsonify
from flask_apispec import use_kwargs, marshal_with
from .serializers import cart_schema, cart_schemas
from flask_jwt_extended import jwt_required , get_jwt_identity
from sqlalchemy.exc import IntegrityError
from arcdesigns.users.models import User
from arcdesigns.post.models import Post
from .models import Cart
from arcdesigns.exceptions import InvalidUsage


blueprint = Blueprint('cart', __name__)



@blueprint.route('/api/designs/cart/<int:cartId>/delete', methods=('DELETE',))
@jwt_required
def delete_from_cart(cartId):
    current_user= get_jwt_identity()
    userid = current_user['user_id']
    post = Cart.query.filter_by(id=cartId, author_id=userid).first()
    post.delete()
    return jsonify({'msg':'delete successful'}), 200


@blueprint.route('/api/designs/cart/<int:postId>', methods=('POST',))
@jwt_required
@use_kwargs(cart_schema)
@marshal_with(cart_schema)
def addTocart(postId, **kwargs):
    current_user= get_jwt_identity()
    userid = current_user['user_id']
    user = User.query.filter_by(id=userid).first()
    post = Post.query.filter_by(id=postId).first()
    try:
        cart = Cart(post=post, author=user).save()
    except IntegrityError:
        raise InvalidUsage.post_exists()

    return cart, 201



@blueprint.route('/api/designs/cart', methods=('GET',))
@jwt_required
@use_kwargs(cart_schemas)
@marshal_with(cart_schemas)
def get_user_cart():
    current_user= get_jwt_identity()
    userid = current_user['user_id']
    response = Cart.query.filter_by(author_id=userid).all()
    
    return response





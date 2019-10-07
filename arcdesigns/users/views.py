""" user views """
from flask import Blueprint

from .models import User



blueprint = Blueprint('users', __name__)
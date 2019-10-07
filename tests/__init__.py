""" Testing application factory"""
from arcdesigns.app import create_app
from arcdesigns.config import TestingConfig
from arcdesigns.database import db as _db

app = create_app(TestingConfig)




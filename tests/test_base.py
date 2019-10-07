from flask_testing import TestCase
import json
from tests import app
from arcdesigns.app import create_app
from arcdesigns.config import TestingConfig
from arcdesigns.database import db as _db
import os



class BaseTestCase(TestCase):

    """ base test class for testing endpoints """


    def create_app(self):
        return create_app(TestingConfig)

    def setUp(self):
        self.app = app
        self.client = self.app.test_client()
        _db.create_all()
        self.test_user = {"username":"david","email":"david@gmail.com",\
        "password":"wrej@jafcd"}
        self.post = {"body": "this is a 3 bedroom house buy it",
        "cost": 500,
        "description": "3 bedroom house",
        "image": "img/design.jpeg",
        "title": "PL123"
        }
           
            
    def tearDown(self):
        _db.session.remove()
        _db.drop_all()

    
    def register_user(self):
        response = self.client.post('/api/auth/signup',\
        json = {'user': self.test_user }, content_type='application/json' )
        return response


    def login_user(self):
        return self.client.post('/api/auth/login',\
        json = {"user": self.test_user }, content_type='application/json')


    def generate_token(self):
        self.register_user()
        response = self.login_user()
        data = json.loads(response.data.decode())
        return 'Bearer ' + data['user']['token']


    def make_post(self):
        response = self.client.post( '/api/designs',content_type='application/json',\
        headers={'Authorization': self.generate_token()}, json = {"post": self.post})
        return response

    def get_all_posts(self):
        response = self.client.get('/api/designs', content_type='application/json',\
                    headers={'Authorization': self.generate_token()})
        return response

    def add_to_cart(self):
        self.make_post()
        response = self.client.post('/api/designs/cart/1', content_type='application/json',\
                headers={'Authorization': self.generate_token()})
        return response


   
   
    
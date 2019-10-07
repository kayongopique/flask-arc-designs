from flask_testing import TestCase
from arcdesigns.config import TestingConfig
import json
from tests import app
from arcdesigns.database import db as _db
from arcdesigns.app import create_app


class TestAuth(TestCase):

    """ test case imports from flask unittest to test auth routes """
    def create_app(self):
        return create_app(TestingConfig)

    def setUp(self):
        self.app = app
        self.client = self.app.test_client()
        _db.create_all()
        self.test_user = {"username":"david","email":"david@gmail.com",\
        "password":"wrej@jafcd"}


    def tearDown(self):
        _db.session.remove()
        _db.drop_all()

    def test_user_can_signup(self):
        response = self.client.post('/api/auth/signup', json = {"user": self.test_user})
        self.assertIn('david', str(response.data))
        self.assertEqual(response.status_code, 201)


    def test_login(self):
        self.client.post('/api/auth/signup', json = {"user": self.test_user})
        response = self.client.post('/api/auth/login', json = { "user":self.test_user })
        self.assertEqual(response.status_code, 200)

    
    def test_login_wrong_password(self):
        self.client.post('/api/auth/signup', json = {"user": self.test_user})
        response = self.client.post('/api/auth/login', json = { "user":{"email": "david@gmail.com", "password": '123456'} })
        self.assertEqual(response.status_code, 404)


    

        
        
    
    

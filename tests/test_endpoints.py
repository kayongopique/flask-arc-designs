from .test_base import BaseTestCase

class TestEndpoints(BaseTestCase):
    

    def test_can_fetch_posts(self):
        res = self.get_all_posts()
        self.assertEqual(res.status_code, 200)


    def test_cannot_fetch_posts_with_unauthorized_access(self):
        self.make_post()
        res = self.client.get( '/api/designs', content_type='application/json',\
        headers={'Authorization': ""})
        self.assertEqual(res.status_code, 401)


    def test_can_delete_post(self):
        self.make_post()
        res = self.client.delete('/api/designs/pl123/delete',\
                                headers={'Authorization': self.generate_token()})
        self.assertIn('delete successful', str(res.data))
        self.assertEqual(res.status_code, 200)


    def test_can_delete_cart(self):
        self.add_to_cart()
        response = self.client.delete('/api/designs/cart/1/delete',\
                             headers={'Authorization': self.generate_token()})
        self.assertEqual(response.status_code, 200)
        self.assertIn('delete successful', str(response.data))

    def test_can_add_post_to_cart(self):
        response = self.add_to_cart()
        self.assertEqual(response.status_code, 201)
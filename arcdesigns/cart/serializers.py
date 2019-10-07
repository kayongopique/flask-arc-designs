from marshmallow import Schema, fields, pre_load, post_dump
import json
from arcdesigns.users.serializers import UserSchema
from arcdesigns.post.searializers import PostSchema


class CartSchema(Schema):
    author = fields.Nested(UserSchema)
    post = fields.Nested(PostSchema)
    addedAt = fields.DateTime(dump_only=True)
   


    # for the envelope
    cart = fields.Nested('self', exclude=('cart',), default=True, load_only=True)

    
    @post_dump
    def dump_comment(self, data):
        return {'myCart': data}

    class Meta:
        strict = True

cart_schema = CartSchema()
cart_schemas = CartSchema(many=True)
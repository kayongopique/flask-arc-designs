from marshmallow import Schema, fields, pre_load, post_dump
import json
from arcdesigns.users.serializers import UserSchema



class PostSchema(Schema):

    slug = fields.Str()
    title = fields.Str()
    description = fields.Str()
    image = fields.Str()
    body = fields.Str()
    cost = fields.Int()
    updatedAt = fields.DateTime(dump_only=True)
    createdAt =fields.DateTime(dump_only=True)
    author = fields.Nested(UserSchema)

    post = fields.Nested('self', exclude=('post',), default=True, load_only=True)

    @pre_load
    def make_post(self, data):
        return data['post']

    @post_dump
    def dump_post(self, data):
        return {'post': data}

    class Meta:
        strict = True

class CommentSchema(Schema):
    createdAt = fields.DateTime()
    body = fields.Str()
    updatedAt = fields.DateTime(dump_only=True)
    author = fields.Nested(UserSchema)
    id = fields.Int()

    # for the envelope
    comment = fields.Nested('self', exclude=('comment',), default=True, load_only=True)

    @pre_load
    def make_comment(self, data):
        return data['comment']

    @post_dump
    def dump_comment(self, data):
        return {'comment': data}

    class Meta:
        strict = True
          

post_schema = PostSchema()
post_schemas = PostSchema(many=True)
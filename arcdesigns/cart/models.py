
from arcdesigns.post.models import Post
from arcdesigns.database import Column, Model, db, reference_col, relationship
import datetime as dt


class Cart(Model):

    __tablename__ = 'cart'

    id = Column(db.Integer, primary_key=True)
    author_id = reference_col('users', nullable=False)
    author = relationship('User', backref=db.backref('mycart'))
    post = relationship('Post', backref=db.backref('cart'))
    post_id = reference_col('posts',nullable=False)
    addedAt = Column(db.DateTime, nullable=False, default=dt.datetime.utcnow)

    def __init__(self, post, **kwargs):
        """Create instance."""
        db.Model.__init__(self,  post=post, **kwargs)
        

""" Application package"""
from flask import Flask
from arcdesigns.extensions import jwt, migrate, cors, db, bcrypt
from arcdesigns.exceptions import InvalidUsage 
from arcdesigns import users, post, cart, commands


def create_app(config_name):
    """ Appliacation factory """

    app = Flask(__name__)
    app.config.from_object(config_name)
    app.config.from_pyfile('config.py')
    app.config['JWT_SECRET_KEY'] = 'super-secret'
    register_extensions(app)
    register_errorhandlers(app)
    register_shellcontext(app)
    register_blueprints(app)
    register_commands(app)

    return app


def register_extensions(app):
    """Register Flask extensions."""
    cors.init_app(app)
    db.init_app(app)
    migrate.init_app(app, db)
    migrate.init_app(app)
    jwt.init_app(app)
    bcrypt.init_app(app)


def register_blueprints(app):
    """ Register flask blueprints """
    origins = app.config.get('CORS_ORIGIN_WHITELIST', '*')
    cors.init_app(users.views.blueprint, origins=origins)
    cors.init_app(post.views.blueprint, origins=origins)
    cors.init_app(users.auth.auth, origins=origins)
    cors.init_app(cart.views.blueprint, origins=origins)

    app.register_blueprint(users.views.blueprint)
    app.register_blueprint(post.views.blueprint)
    app.register_blueprint(users.auth.auth)
    app.register_blueprint(cart.views.blueprint)
    



def register_errorhandlers(app):

    def errorhandler(error):
        response = error.to_json()
        response.status_code = error.status_code
        return response

    app.errorhandler(InvalidUsage)(errorhandler)



def register_shellcontext(app):
    """Register shell context objects."""
    def shell_context():
        """Shell context objects."""
        return {
            'db': db,
            'User': users.models.User,
            'Post': post.models.Post,
            'Comment': post.models.Comment,
            'Cart': cart.models.Cart,
        }

    app.shell_context_processor(shell_context)

def register_commands(app):

    """Register Click commands."""
    app.cli.add_command(commands.test)



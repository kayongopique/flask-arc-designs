# -*- coding: utf-8 -*-
"""Create an application instance."""
from flask.helpers import get_debug_flag
from arcdesigns.app import create_app
from arcdesigns.extensions import db
from flask_migrate import Migrate
from arcdesigns.config import DevelopmentConfig, ProdConfig
CONFIG = DevelopmentConfig if get_debug_flag() else ProdConfig



app = create_app(DevelopmentConfig)



if __name__ == '__main__':
    app.run()
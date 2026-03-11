"""Flask app factory"""
import os
from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate

db = SQLAlchemy()
jwt = JWTManager()
migrate = Migrate()

def create_app(config_name='development'):
    """Create and configure Flask app"""
    app = Flask(__name__)

    # Configuration
    if config_name == 'production':
        app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
        app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
        app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
        app.config['DEBUG'] = False
    else:
        app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv(
            'DATABASE_URL',
            'postgresql://esg_user:esg_password@localhost:5432/esg_platform'
        )
        app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
        app.config['SQLALCHEMY_ECHO'] = True
        app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'dev-secret-key-change-in-production')
        app.config['DEBUG'] = True

    # Enable CORS
    CORS(app, resources={r"/api/*": {"origins": os.getenv('CORS_ORIGINS', '*')}})

    # Initialize extensions
    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)

    # Register blueprints
    from app.routes import api_bp
    app.register_blueprint(api_bp)

    # Health check endpoint
    @app.route('/health', methods=['GET'])
    def health():
        return {'status': 'ok', 'service': 'esg-platform-api'}, 200

    # Create tables on startup if they don't exist
    with app.app_context():
        db.create_all()

    return app

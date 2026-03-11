"""API routes blueprint"""
from flask import Blueprint

api_bp = Blueprint('api', __name__, url_prefix='/api')

# Import route handlers
from app.routes import auth, organizations, data, reporting

# Register routes
api_bp.register_blueprint(auth.auth_bp)
api_bp.register_blueprint(organizations.org_bp)
api_bp.register_blueprint(data.data_bp)
api_bp.register_blueprint(reporting.report_bp)

"""Authentication routes"""
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/auth/login', methods=['POST'])
def login():
    """User login - returns JWT token"""
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # TODO: Validate against database
    if not email or not password:
        return {'message': 'Email and password required'}, 400

    # For demo: simple validation
    if email and password:
        access_token = create_access_token(identity=email)
        return {
            'success': True,
            'access_token': access_token,
            'user': {'email': email, 'role': 'reporter'}
        }, 200

    return {'message': 'Invalid credentials'}, 401

@auth_bp.route('/auth/logout', methods=['POST'])
@jwt_required()
def logout():
    """User logout"""
    return {'success': True, 'message': 'Logged out'}, 200

@auth_bp.route('/auth/profile', methods=['GET'])
@jwt_required()
def profile():
    """Get current user profile"""
    identity = get_jwt_identity()
    return {
        'success': True,
        'user': {
            'email': identity,
            'role': 'reporter',
            'organization_id': None
        }
    }, 200

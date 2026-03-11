"""Organization management routes"""
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required

org_bp = Blueprint('organizations', __name__)

@org_bp.route('/organizations', methods=['GET'])
@jwt_required()
def list_organizations():
    """List all organizations for tenant"""
    return {
        'success': True,
        'data': {
            'organizations': [
                {
                    'id': '123',
                    'name': 'Sample Organization',
                    'size_tier': 'small',
                    'status': 'active'
                }
            ],
            'total': 1
        }
    }, 200

@org_bp.route('/organizations/<org_id>', methods=['GET'])
@jwt_required()
def get_organization(org_id):
    """Get organization details"""
    return {
        'success': True,
        'data': {
            'id': org_id,
            'name': 'Sample Organization',
            'size_tier': 'small',
            'status': 'active'
        }
    }, 200

@org_bp.route('/organizations', methods=['POST'])
@jwt_required()
def create_organization():
    """Create new organization"""
    data = request.get_json()
    return {
        'success': True,
        'message': 'Organization created',
        'data': {'id': 'new-org-id'}
    }, 201

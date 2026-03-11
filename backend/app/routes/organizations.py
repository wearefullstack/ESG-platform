"""Organization management routes"""
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
import os
import datetime

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
def create_organization():
    """Public organization registration endpoint (no auth required)"""
    try:
        # Handle FormData with file upload
        data = {}

        # Get form fields
        for key in ['organizationName', 'registrationNumber', 'industry', 'employeeCount',
                    'contactName', 'email', 'phone', 'annualRevenue', 'ghgScope1',
                    'energyMwh', 'waterM3', 'wasteMetricTonnes', 'fiscalYearStart',
                    'agreeTerms']:
            if key in request.form:
                data[key] = request.form.get(key)

        # Check for file upload
        if 'documentUpload' in request.files:
            file = request.files['documentUpload']
            if file and file.filename:
                # For now, just store the filename
                data['document'] = file.filename

        # Validate required fields
        required_fields = ['organizationName', 'registrationNumber', 'industry',
                          'employeeCount', 'contactName', 'email', 'phone',
                          'annualRevenue', 'ghgScope1', 'energyMwh', 'waterM3',
                          'wasteMetricTonnes', 'fiscalYearStart']

        missing = [f for f in required_fields if f not in data or not data[f]]
        if missing:
            return {
                'success': False,
                'message': f'Missing required fields: {", ".join(missing)}',
                'data': None
            }, 400

        # Validate email format
        if '@' not in data.get('email', ''):
            return {
                'success': False,
                'message': 'Invalid email address',
                'data': None
            }, 400

        # For demo: generate a simple ID and return success
        # In production, this would:
        # 1. Create organization in DB
        # 2. Create admin user with generated password
        # 3. Send welcome email with credentials

        org_id = f"org_{datetime.datetime.now().timestamp()}".replace('.', '')

        return {
            'success': True,
            'message': 'Organization registered successfully',
            'data': {
                'id': org_id,
                'name': data['organizationName'],
                'email': data['email'],
                'nextStep': 'Please log in with your credentials'
            }
        }, 201

    except Exception as e:
        return {
            'success': False,
            'message': f'Registration failed: {str(e)}',
            'data': None
        }, 500

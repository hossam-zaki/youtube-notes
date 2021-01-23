from flask import Blueprint
from flask_restful import Api

from backend.transcribe import TranscribeAPI

api_bp = Blueprint('api', __name__)
api = Api(api_bp)

# Route
api.add_resource(TranscribeAPI, '/register_note')

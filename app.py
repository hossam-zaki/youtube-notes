from flask import Blueprint
from flask_restful import Api

from backend.getLibrary import GetLibrary
from backend.registerReadwise import ReadwiseAPI
from backend.transcribe import TranscribeAPI

api_bp = Blueprint('api', __name__)
api = Api(api_bp)

# Route
api.add_resource(TranscribeAPI, '/register-note')
api.add_resource(GetLibrary, '/get-library')

api.add_resource(ReadwiseAPI, '/register-readwise')

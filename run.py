from flask import Flask, send_from_directory
from backend.transcribe import TranscribeAPI
from backend.registerReadwise import ReadwiseAPI

app = Flask(__name__)


def create_app(config_filename):
    #app.config.from_object(config_filename)

    from app import api_bp
    app.register_blueprint(api_bp, url_prefix='/api')

    return app




if __name__ == "__main__":
    app = create_app("config")
    app.run(debug=True)

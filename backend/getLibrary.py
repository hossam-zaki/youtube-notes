import getpass
import pickle
import time
from urllib.parse import parse_qs

import click
import httpx
import requests
from flask import request
from flask_pymongo import PyMongo
from flask_restful import Resource, reqparse
from pymongo import MongoClient
from youtube_transcript_api import YouTubeTranscriptApi


class GetLibrary(Resource):

    # handles post request
    def post(self):

        # pulls data from api request
        data = request.get_json()
        user_id = data['userID']
        client = MongoClient(
            "mongodb+srv://mlunghi:snip2021@cluster0.s5i28.mongodb.net/clipSnip?retryWrites=true&w=majority")
        db = client["clipSnip"]
        col = db["users"]

        query = {"user_id": user_id}

        result = col.find_one(query)

        data = result['notes']

        return data

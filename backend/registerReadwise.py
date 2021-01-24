import getpass
import pickle
import time
from urllib.parse import parse_qs

import audible
import click
import httpx
import requests
from flask import request
from flask_pymongo import PyMongo
from flask_restful import Resource, reqparse
from pymongo import MongoClient
from youtube_transcript_api import YouTubeTranscriptApi


class ReadwiseAPI(Resource):

    # handles post request
    def post(self):

        # pulls data from api request
        data = request.get_json()
        user_id = data['userID']
        readwise_id = data['readwiseID']
        print(data)
        # connect to atlas
        client = MongoClient(
            "mongodb+srv://mlunghi:snip2021@cluster0.s5i28.mongodb.net/clipSnip?retryWrites=true&w=majority")
        db = client["clipSnip"]
        col = db["users"]

        query = {"user_id": user_id}
        update = {'$set': {'readwise_id': readwise_id, "user_id": user_id}}
        col.find_one_and_update(query, update, upsert=True)

        #mydict = {"user_id": user_id, "readwise_id": readwise_id}

        # insert user record into mongo
        # col.insert_one(mydict)

        return {"response": "200:SUCCESS"}

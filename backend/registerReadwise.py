from urllib.parse import parse_qs
from urllib.parse import parse_qs
import audible
import click
import httpx
import getpass
import pickle
import time
import requests
from flask import request
from flask_restful import Resource, reqparse
from youtube_transcript_api import YouTubeTranscriptApi
from flask_pymongo import PyMongo
from pymongo import MongoClient


class ReadwiseAPI(Resource):

    #handles post request
    def post(self):

        #pulls data from api request
        data = request.get_json()
        user_id = data['userID']
        readwise_id = data['readwiseID']

        client = MongoClient("mongodb+srv://mlunghi:snip2021@cluster0.s5i28.mongodb.net/clipSnip?retryWrites=true&w=majority")
        #print(client.server_info())
        db = client["clipSnip"]
        col = db["readWise"]

        mydict = { "user_id": user_id, "readwise_id": readwise_id }
        col.insert_one(mydict)

        return {"response" : "200:SUCCESS"}

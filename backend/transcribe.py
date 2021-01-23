import getpass
import pickle
import time
from urllib.parse import parse_qs

import audible
import click
import httpx
import requests
from flask import request
from flask_restful import Resource, reqparse
from youtube_transcript_api import YouTubeTranscriptApi


class TranscribeAPI(Resource):

    # parses youtube url to find video id
    def parse_url(self, url):
        if "&" in url:
            id = url[url.find("v")+2: url.find("&")+1]
        else:
            id = url[url.find("v")+2:]
        return id

    # handles post request
    def post(self):

        # pulls data from api request
        data = request.get_json()
        user_id = data['userID']
        url = data['youtubeURL']
        note = data['note']

        # finds video id
        video_id = self.parse_url(url)
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
        print(transcript)

        return {"response": "200:SUCCESS"}

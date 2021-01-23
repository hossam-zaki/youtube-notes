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


class TranscribeAPI(Resource):

    #parses youtube url to find video id
    def parse_url(self, url):
        return url[url.find("v")+2 : url.find("&")]


    def post(self):

        #pulls data from api request
        data = request.get_json()
        user_id = data['userID']
        url = data['youtubeURL']
        note = data['user']

        video_id = self.parse_url(url)

        return { "response" : "200:SUCCESS"}

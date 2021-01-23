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



    def post(self):

        data = request.get_json()
        user_id = data['userID']
        url = data['youtubeURL']
        note = data['user']
        return { "response" : "200:SUCCESS"}

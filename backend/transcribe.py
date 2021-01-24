import datetime
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


class TranscribeAPI(Resource):

    # parses youtube url to find video id
    def parse_url(self, url):
        if "&" in url:
            id = url[url.find("v")+2: url.find("&")+1]
        else:
            id = url[url.find("v")+2:]
        return id

    # parses out the wanted note
    def parse_video_note(self, transcript, start_time, end_time):
        note = []
        i = 0

        # loops through all snippets
        for i in range(len(transcript)):
            element = transcript[i]
            curr_start = element["start"]
            curr_end = element["duration"] + curr_start

            # pulls text from relevant snipper and builds note
            if curr_start >= start_time:
                while not curr_end > end_time and i < len(transcript):
                    element = transcript[i]
                    curr_start = element["start"]
                    curr_end = element["duration"] + curr_start
                    note.append(element["text"].replace("\n", " "))
                    i += 1

            i += 1
        print(note)
        return " ".join(list(set(note)))

    # handles post request
    def post(self):

        # connect to Atlas
        client = MongoClient(
            "mongodb+srv://mlunghi:snip2021@cluster0.s5i28.mongodb.net/clipSnip?retryWrites=true&w=majority")
        db = client["clipSnip"]
        col = db["users"]
        # notes = db["notes"]

        # pulls data from api request
        data = request.get_json()
        print(data)
        user_id = data['userID']
        url = data['youtubeURL']
        user_note = data['note']
        start_time = float(data['startTime'])
        end_time = float(data['endTime'])

        # pulls video title and channel name
        resp = requests.get(
            "https://noembed.com/embed?url=" + url.replace("https", "http"))
        resp = resp.json()
        channel_name = resp["author_name"]
        video_title = resp["title"]
        thumbnail_url = resp["thumbnail_url"]

        # finds video id
        video_id = self.parse_url(url)
        transcript = YouTubeTranscriptApi.get_transcript(video_id)

        # parses wanted note
        video_note = self.parse_video_note(transcript, start_time, end_time)

        query = {"user_id": user_id}

        update = {'$set': {"user_id": user_id}}
        userDoc = col.find_one_and_update(query, update, upsert=True)
        if userDoc and "readwise_id" in userDoc:
            user_readwise_token = userDoc["readwise_id"]
        # # pulls user readwise token
        # for user in readwise.find():
        #     if user["user_id"] == user_id:
        #         user_readwise_token = user["readwise_id"]
        # IF USER NOT FOUND MAKE NEW COLLECTIOn
        # makes readwise request

        try:
            res = requests.post(
                url="https://readwise.io/api/v2/highlights/",
                headers={"Authorization": "Token " +
                         str(user_readwise_token)},  # CHECK THIS
                json={
                    "highlights": [{
                        "text": video_note,
                        "image_url": thumbnail_url,
                        "source_url": url,
                        "location": int(start_time),
                        "title": video_title,
                        "author": channel_name,
                        "highlighted_at": datetime.datetime.now().isoformat(),
                        "source_type": "podcast",
                        "location_type": "order"
                    }]
                }
            )
            print(res.content)
        except:
            print("ERROR: failed to connect to readwise")

        noteData = {
            "text": video_note,
            "image_url": thumbnail_url,
            "source_url": url,
            "location": int(start_time),
            "author": channel_name,
            "highlighted_at": datetime.datetime.now().isoformat(),
            "source_type": "podcast",
            "location_type": "order"
        }
        # mydict = {"user_id": user_id, "note": video_note}
        # notes.insert_one(mydict)

        res = col.update({"user_id": user_id},
                         {"$push": {f"notes.{video_title}": noteData}}, upsert=True)

        print(res)
        return {"response": "200:SUCCESS"}


# {
#     username:
#     readwisetoken:
#     notes: {
#         title: [notes],
#         title: [notes]
#     }
# }

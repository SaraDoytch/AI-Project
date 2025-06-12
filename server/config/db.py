
 # config/db.py

import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

def connect_db():
    try:
        uri = os.getenv("MONGO_URI")
        client = MongoClient(uri)
        db = client.get_default_database()
        print("Connected to MongoDB")
        return db
    except Exception as err:
        print("***** error connection to DB *****\n", err)
        return None


#  # config/db.py

# import os
# from pymongo import MongoClient
# from dotenv import load_dotenv

# load_dotenv()

# def connect_db():
#     try:
#         uri = os.getenv("MONGO_URI")
#         client = MongoClient(uri)
#         db = client.get_default_database()
#         print("Connected to MongoDB")
#         return db
#     except Exception as err:
#         print("***** error connection to DB *****\n", err)
#         return None

from pymongo import MongoClient
from config.config import Config
import certifi

def connect_db():
    try:
        client = MongoClient(Config.MONGO_URI, tlsCAFile=certifi.where())
        db = client[Config.MONGO_DB_NAME]
        print(f"✅ Connected to MongoDB [{Config.MONGO_DB_NAME}]")
        return db
    except Exception as err:
        print("❌ MongoDB connection error:\n", err)
        return None

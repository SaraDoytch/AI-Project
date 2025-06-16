 # models/prompt.py

from mongoengine import Document, StringField, ReferenceField, DateTimeField
from datetime import datetime
from models.User import User
from models.Category import Category
from models.SubCategory import SubCategory  # נניח שגם זה קיים

class Prompt(Document):
    user_id = ReferenceField(User, required=True)
    category_id = ReferenceField(Category, required=True)
    sub_category_id = ReferenceField(SubCategory, required=True)
    prompt = StringField(required=True)
    response = StringField(required=True)
    created_at = DateTimeField(default=datetime.utcnow)

    meta = {
        'collection': 'prompts'
    }

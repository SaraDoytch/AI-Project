 # models/prompt.py

from mongoengine import Document, StringField, ReferenceField, DateTimeField
from datetime import datetime
from models.user import User
from models.category import Category
from models.subcategory import SubCategory  # נניח שגם זה קיים

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

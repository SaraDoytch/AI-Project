 # models/subcategory.py

from mongoengine import Document, StringField, ReferenceField
from models.Category import Category  # ודא שהמודול קיים ונטען נכון

class SubCategory(Document):
    name = StringField(required=True)
    category_id = ReferenceField(Category, required=True)

    meta = {
        'collection': 'subcategories'
    }

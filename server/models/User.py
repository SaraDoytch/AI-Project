 # models/user.py

from mongoengine import Document, StringField, DateTimeField
from datetime import datetime

class User(Document):
    name = StringField(required=True)
    phone = StringField(required=True, unique=True)
    password = StringField(required=True)  # hashed password

    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(default=datetime.utcnow)

    meta = {
        'collection': 'users',
        'indexes': ['phone'],
        'ordering': ['-created_at'],
        'auto_create_index': True
    }

    def save(self, *args, **kwargs):
        self.updated_at = datetime.utcnow()
        return super(User, self).save(*args, **kwargs)

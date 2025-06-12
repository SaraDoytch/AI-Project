


 # config/cors_options.py

allowed_origins = [
    'http://localhost:5173',
    'http://localhost:7000',
    'http://localhost:5000',
    'http://localhost:3000'
]

 # Flask-CORS מקבל מילון עם הגדרות עבור origins
cors_options = {
    r"/*": {
        "origins": allowed_origins,
        "supports_credentials": True,
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": "*",
        "max_age": 86400
    }
}

# from models import User, Prompt
from models.User import User
from models.Prompt import Prompt
import traceback



def get_users_with_prompts_controller():
    try:
        users = User.objects()
        data = []
        for user in users:
            prompts = Prompt.objects(user_id=user).order_by('-created_at')  
            data.append({
                'id': str(user.id),
                'firstName': user.firstName,
                'lastName': user.lastName,
                'email': user.email,
                'prompts': [
                    {
                        'id': str(prompt.id),
                        'title': prompt.prompt[:30],  
                        'created_at': prompt.created_at.isoformat()
                    } for prompt in prompts
                ]
            })
        return data, None
    except Exception as e:
        traceback.print_exc()
        return None, str(e)

from app.db.базаданных import *


def ВЗРЫВГРЕЙПФРУТААААААААА(username):
	if username:
		# Проверяем существует ли пользователь
		if username not in пользователи:
			return None
		
		# Возвращаем посты конкретного пользователя или пустой список если их нет
		return посты.get(username, {}).get('посты', [])
	else:
		# Возвращаем все посты всех пользователей в одном списке
		all_posts = []
		for user_posts in пользователи.values():
			all_posts.extend(user_posts.get('посты', []))
		return all_posts



from fastapi import FastAPI, HTTPException, Body, APIRouter, File, UploadFile

from app.api.юзеры_и_что_то_ещё.утилиты import ВЗРЫВГРЕЙПФРУТААААААААА
from app.db.базаданных import пользователи, посты

router = APIRouter(tags=["Юзы"])

@router.get("/юзеры", tags=["юзеры"])  # Плохой URL и тег
async def get_all_users():
	return пользователи


@router.get("/юзеры_в_постах", tags=["абьюзеры"])  # Отличный URL и тег
async def get_user(username: str):
	return ВЗРЫВГРЕЙПФРУТААААААААА(username)


@router.post("/юзеры_создать_посты", tags=["юзеры"])
async def create_post(user: str, title: str, описание: str):
	def создать_пост(имя_пользователя, название, описание):
		# Проверяем существует ли пользователь
		if имя_пользователя not in пользователи:
			return "Ошибка: Пользователь не найден"
		# Создаем новый пост
		новый_пост = {
			'название': название,
			'описание': описание,
			'фотки': ""
		}
		
		# Добавляем пост в список постов пользователя
		if имя_пользователя not in посты:
			посты[имя_пользователя] = {'посты': []}
		
		посты[имя_пользователя]['посты'].append(новый_пост)
		
		return новый_пост
	
	return создать_пост(user, title, описание)




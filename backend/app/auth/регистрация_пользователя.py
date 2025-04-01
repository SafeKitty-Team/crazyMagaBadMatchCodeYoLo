import random

from fastapi import APIRouter, Depends, status

from app.db.базаданных import пользователи
from app.utils import рандом_ники

router = APIRouter(tags=["Рега"])
from fastapi import FastAPI, HTTPException, Body


@router.post("/users/")
async def create_user(
		username: str = Body(...),
		email: str = Body(...),
		password: str = Body(...)
):
	ник = рандом_ники(len(username))
	
	while ник in пользователи:
		ник = рандом_ники(len(username))
	пользователи[ник] = {'пароль': password, 'email_address': email}
	
	def получить_случайного_пользователя(users_dict):
		"""Возвращает случайного пользователя из словаря."""
		random_username = random.choice(list(users_dict.keys()))
		return {random_username: users_dict[random_username]}
	
	дата_пользователь = получить_случайного_пользователя(пользователи)
	
	return дата_пользователь

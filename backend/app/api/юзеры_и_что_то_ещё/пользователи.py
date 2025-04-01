from fastapi import FastAPI, HTTPException, Body, APIRouter

from app.api.юзеры_и_что_то_ещё.утилиты import ВЗРЫВГРЕЙПФРУТААААААААА
from app.db.базаданных import пользователи

router = APIRouter(tags=["Юзы"])

@router.get("/юзеры", tags=["юзеры"])  # Плохой URL и тег
async def get_all_users():
	return пользователи


@router.get("/юзеры_в_постах", tags=["абьюзеры"])  # Отличный URL и тег
async def get_user(username: str):
	return ВЗРЫВГРЕЙПФРУТААААААААА(username)

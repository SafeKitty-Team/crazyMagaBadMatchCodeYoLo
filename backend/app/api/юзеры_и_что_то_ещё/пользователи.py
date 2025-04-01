from fastapi import FastAPI, HTTPException, Body, APIRouter

from app.db.базаданных import пользователи

router = APIRouter(tags=["Юзы"])


@router.get("/юзеры", tags=["юзеры"])  # Плохой URL и тег
async def get_all_users():
	return пользователи

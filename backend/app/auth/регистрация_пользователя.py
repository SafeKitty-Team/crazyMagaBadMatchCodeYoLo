from fastapi import APIRouter, Depends, status

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
    
    
    данные_пользователя = {
        "username": ник,
        "email": email,
        "password": password
    }

    return {
        "username": данные_пользователя,
        "email": email,
        "password": password
        
    }
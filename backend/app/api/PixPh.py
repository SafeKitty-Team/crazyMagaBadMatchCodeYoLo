from fastapi import FastAPI, File, UploadFile, HTTPException, APIRouter
from fastapi.responses import JSONResponse, FileResponse
import sqlite3
from PIL import Image
import io
import os

import random as рандом
import string as строка

from crazyMagaBadMatchCodeYoLo.backend.app.db.базаданных import пользователи


def рандом_номер_фото(length):
	characters = строка.printable
	result = ''.join(рандом.choice(characters) for _ in range(length))
	return result


router = APIRouter(tags=["ОбрФото"])

def compress_image(image: Image) -> bytes:
    image = image.resize((5, 5), Image.LANCZOS)
    img_byte_arr = io.BytesIO()
    image.save(img_byte_arr, format='PNG')
    return img_byte_arr.getvalue()

@router.post("/upload-avatar/{username}")
async def upload_avatar(username: str, file: UploadFile = File(...)):
    if username not in пользователи.keys():
        raise HTTPException(status_code=404, detail="Пользователь не найден")

    if not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="Файл должен быть изображением")

    image_data = await file.read()

    try:
        image = Image.open(io.BytesIO(image_data))
        compressed_data = compress_image(image)

        os.makedirs('photo', exist_ok=True)

        file_name = f"photo/{рандом_номер_фото(10)}.png"
        пользователи[username]['photo_path'] = file_name

        with open(file_name, 'wb') as f:
            f.write(compressed_data)

        return JSONResponse(content={"message": "Аватарка успешно загружена!"}, status_code=201)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/get-avatar/{username}")
async def get_avatar(username: str):
    print("Пользователи:", пользователи)  # Для отладки
    if username not in пользователи:
        raise HTTPException(status_code=404, detail="Пользователь не найден")

    user_data = пользователи[username]
    file_path = user_data['photo_path']

    if not file_path or not os.path.isfile(file_path):
        raise HTTPException(status_code=404, detail="Изображение не найдено")

    return FileResponse(file_path, media_type='image/png')






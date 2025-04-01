from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
import sqlite3
from PIL import Image
import io

import os

app = FastAPI()

def get_db_connection():
    conn = sqlite3.connect('db.sqlite')
    conn.row_factory = sqlite3.Row
    return conn

def compress_image(image: Image) -> bytes:
    image = image.resize((5, 5), Image.LANCZOS)
    img_byte_arr = io.BytesIO()
    image.save(img_byte_arr, format='PNG')
    return img_byte_arr.getvalue()


@app.post("/upload-avatar/")
async def upload_avatar(file: UploadFile = File(...)):
    if not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="Файл должен быть изображением")


    image_data = await file.read()

    try:
        image = Image.open(io.BytesIO(image_data))

        compressed_data = compress_image(image)

        # Сохраняем в базу данных
        conn = get_db_connection()
        conn.execute('INSERT INTO пользователи (avatar) VALUES (?)', (compressed_data,))
        conn.commit()
        conn.close()

        return JSONResponse(content={"message": "Аватарка успешно загружена!"}, status_code=201)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))




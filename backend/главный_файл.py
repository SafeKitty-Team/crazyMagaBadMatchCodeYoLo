import uvicorn
from fastapi import FastAPI as ИнтерфейсПрограмногоПриложения
from app.auth import rourer_регистрация
from app.api import роутер_use

ИПП = ИнтерфейсПрограмногоПриложения

приложение = ИПП()


@приложение.get("/")
async def root():
	return {"message": "Hello World"}


приложение.include_router(
	rourer_регистрация,
)

приложение.include_router(
	роутер_use,
)

if __name__ == "__main__":
	uvicorn.run(
		"главный_файл:приложение",
		reload=True,
	)

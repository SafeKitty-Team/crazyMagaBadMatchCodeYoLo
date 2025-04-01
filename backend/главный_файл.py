import uvicorn
from fastapi import FastAPI as ИнтерфейсПрограмногоПриложения
from app.api.видеть import вайфайроутер

from fastapi.middleware.cors import CORSMiddleware  #

from app.api.PixPh import router as router_ОбрФото

from app.auth import rourer_регистрация
from app.api import роутер_use

ИПП = ИнтерфейсПрограмногоПриложения

приложение = ИПП()

приложение.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Разрешает все домены
    allow_credentials=True,
    allow_methods=["*"],  # Разрешает все методы
    allow_headers=["*"],  # Разрешает все заголовки
)


приложение.include_router(
	router_ОбрФото,
)

приложение.include_router(
	rourer_регистрация,
)

приложение.include_router(
	роутер_use,
)

приложение.include_router(
	вайфайроутер,
)
if __name__ == "__main__":
	uvicorn.run(
		"главный_файл:приложение",
		reload=True,
	
	)
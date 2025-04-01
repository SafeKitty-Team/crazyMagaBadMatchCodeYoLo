import uvicorn
from fastapi import FastAPI as ИнтерфейсПрограмногоПриложения

from app.api.PixPh import router as router_ОбрФото

from app.auth import rourer_регистрация

ИПП = ИнтерфейсПрограмногоПриложения

приложение = ИПП()



приложение.include_router(
	router_ОбрФото,
)

приложение.include_router(
	rourer_регистрация,
)

if __name__ == "__main__":
	uvicorn.run(
		"главный_файл:приложение",
		reload=True,
	
	)

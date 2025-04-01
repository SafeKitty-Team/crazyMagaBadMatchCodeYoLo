import uvicorn
from fastapi import FastAPI as ИнтерфейсПрограмногоПриложения
from app.api.PixPh import router as router_ОбрФото

ИПП = ИнтерфейсПрограмногоПриложения

приложение = ИПП()

@приложение.get("/")
async def root():
    return {"message": "Hello World"}

приложение.include_router(
	router_ОбрФото,
)
if __name__ == "__main__":
	uvicorn.run(
		"главный_файл:приложение",
		reload=True,
	)
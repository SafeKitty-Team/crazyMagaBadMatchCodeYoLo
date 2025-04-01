import uvicorn
from fastapi import FastAPI as ИнтерфейсПрограмногоПриложения
from app.api.видеть import вайфайроутер as router

ИПП = ИнтерфейсПрограмногоПриложения

приложение = ИПП()

приложение.include_router(router)


@приложение.get("/")
async def root():
    return {"message": "Hello World"}


if __name__ == '__main__':
    uvicorn.run('главный_файл:приложение', reload=True)

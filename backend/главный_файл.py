from fastapi import FastAPI as ИнтерфейсПрограмногоПриложения

ИПП = ИнтерфейсПрограмногоПриложения

приложение = ИПП()

@приложение.get("/")
async def root():
    return {"message": "Hello World"}
import uvicorn
from fastapi import FastAPI as ИнтерфейсПрограмногоПриложения
from app.api.видеть import вайфайроутер as router

from app.api.PixPh import router as router_ОбрФото

from app.auth import rourer_регистрация
from app.api import роутер_use

ИПП = ИнтерфейсПрограмногоПриложения

приложение = ИПП()


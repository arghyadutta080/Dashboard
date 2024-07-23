from fastapi import FastAPI
from .database import engine
from .models import Base
from .routes import users

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(users.router)

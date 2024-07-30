from fastapi import FastAPI, Request, Response, status, HTTPException
from math import ceil
from .database import engine
from .models import Base
from .routes import users, products, orders, sells
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from fastapi_limiter import FastAPILimiter
import redis.asyncio as redis

Base.metadata.create_all(bind=engine)

REDIS_URL = "redis://127.0.0.1:6379"


async def service_name_identifier(request: Request):
    service = request.headers.get("Service-Name")
    return service


async def custom_callback(request: Request, response: Response, pexpire: int):
    """
    default callback when too many requests
    :param request:
    :param pexpire: The remaining milliseconds
    :param response:
    :return:
    """
    expire = ceil(pexpire / 1000)

    raise HTTPException(
        status.HTTP_429_TOO_MANY_REQUESTS,
        f"Too Many Requests. Retry after {expire} seconds.",
        headers={"Retry-After": str(expire)},
    )


@asynccontextmanager
async def lifespan(_: FastAPI):
    redis_connection = redis.from_url(REDIS_URL, encoding="utf8")
    await FastAPILimiter.init(
        redis=redis_connection,
        identifier=service_name_identifier,
        http_callback=custom_callback,
    )
    yield
    await FastAPILimiter.close()


app = FastAPI(lifespan=lifespan)

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)
app.include_router(products.router)
app.include_router(orders.router)
app.include_router(sells.router)

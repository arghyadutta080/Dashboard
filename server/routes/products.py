from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import Annotated
from ..utils import getDB
from ..schemas import user, product
from ..controllers import products
from . import users
from fastapi_limiter.depends import RateLimiter


router = APIRouter(prefix="/api/v1/product",
                   tags=["Product"], dependencies=[Depends(RateLimiter(times=100, minutes=1))])


@router.post('/add', response_model=product.Product)
def add_product(request: product.ProductCreate, current_user: Annotated[user.User, Depends(users.get_user_profile)], db: Session = Depends(getDB.get_db)):
    return products.add_products(request=request, user=current_user, db=db)


@router.get('/all')
def view_all_products(current_user: Annotated[user.User, Depends(users.get_user_profile)], db: Session = Depends(getDB.get_db)):
    return products.get_products(user=current_user, db=db)

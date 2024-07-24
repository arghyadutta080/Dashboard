from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import Annotated
from ..utils import getDB
from ..schemas import user, product
from ..controllers import products
from . import users


router = APIRouter(prefix="/product", tags=["Product"])


@router.post('/add', response_model=product.Product)
def add_product(request: product.ProductCreate, current_user: Annotated[user.User, Depends(users.get_user_profile)], db: Session = Depends(getDB.get_db)):
    return products.add_products(request=request, user=current_user, db=db)


@router.get('/all')
def view_all_products(current_user: Annotated[user.User, Depends(users.get_user_profile)], db: Session = Depends(getDB.get_db)):
    return products.get_products(user=current_user, db=db)

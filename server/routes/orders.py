from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import Annotated
from ..utils import getDB
from ..schemas import user, order
from ..controllers import orders
from . import users
from fastapi_limiter.depends import RateLimiter


router = APIRouter(prefix="/api/v1/order", tags=["Order Product"], dependencies=[
                   Depends(RateLimiter(times=100, minutes=1))])


@router.post('/place', response_model=order.Order)
def place_new_order(request: order.OrderCreate, current_user: Annotated[user.User, Depends(users.get_user_profile)], db: Session = Depends(getDB.get_db)):
    return orders.place_order(request=request, user=current_user, db=db)


@router.get('/all', response_model=list[order.Order])
def view_all_orders(current_user: Annotated[user.User, Depends(users.get_user_profile)], db: Session = Depends(getDB.get_db)):
    return orders.get_orders(user=current_user, db=db)

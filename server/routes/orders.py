from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import Annotated
from ..utils import getDB
from ..schemas import user, order
from ..controllers import orders
from . import users


router = APIRouter(prefix="/order", tags=["Order Product"])


@router.post('/place', response_model=order.Order)
def place_new_order(request: order.OrderCreate,  db: Session = Depends(getDB.get_db)):
    return orders.place_order(request=request,  db=db)


@router.get('/all', response_model=list[order.Order])
def view_all_orders(current_user: Annotated[user.User, Depends(users.get_user_profile)], db: Session = Depends(getDB.get_db)):
    return orders.get_orders(user=current_user, db=db)

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import Annotated
from datetime import date
from ..utils import getDB
from ..schemas import user, sell
from ..controllers import sells
from . import users


router = APIRouter(prefix="/sell", tags=["Sell Product"])


@router.post('/delivered', response_model=sell.Sell)
def mark_as_delivered(request: sell.SellCreate, current_user: Annotated[user.User, Depends(users.get_user_profile)], db: Session = Depends(getDB.get_db)):
    return sells.mark_as_delivered(request=request, user=current_user, db=db)


@router.get('/all', response_model=list[sell.Sell])
def view_sells_info(current_user: Annotated[user.User, Depends(users.get_user_profile)], db: Session = Depends(getDB.get_db)):
    return sells.get_sells(user=current_user, db=db)


@router.get('/date/count')
def view_datewise_total_sell(current_user: Annotated[user.User, Depends(users.get_user_profile)], db: Session = Depends(getDB.get_db)):
    return sells.get_datewise_sell_count(user=current_user, db=db)


@router.get('/info', response_model=list[sell.Sell])
def view_datewise_sells_info(current_user: Annotated[user.User, Depends(users.get_user_profile)], db: Session = Depends(getDB.get_db), date: str | date = date.today()):
    return sells.get_datewise_sells(user=current_user, db=db, date=date)

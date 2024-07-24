from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from ..models import Order, Sell
from ..schemas import user, sell


def mark_as_delivered(request: sell.SellCreate, user: user.User, db: Session):
    if user.role == "ADMIN":
        if (request.id and request.delivery_date):
            order = db.query(Order).filter(Order.id == request.id)
            if order is None:
                raise HTTPException(
                status_code=status.HTTP_204_NO_CONTENT, detail="No such order in database")
            else:
                order.update({"delivered": True})
                delivered_order = Sell(id=request.id, delivery_date=request.delivery_date)
                db.add(delivered_order)
                db.commit()
                db.refresh(delivered_order)
                return delivered_order
        else:
            raise HTTPException(
                status_code=status.HTTP_206_PARTIAL_CONTENT, detail="Fill up all fields")
    else:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="You are not authorized for this action")


def get_sells(user: user.User, db: Session):
    if user.role == "ADMIN":
        all_sells = db.query(Sell).all()
        if all_sells is None:
            raise HTTPException(
                status_code=status.HTTP_204_NO_CONTENT, detail="No Selling data in database")
        else:
            return all_sells
    else:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="You are not authorized for this action")

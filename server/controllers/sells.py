from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import select, func
from datetime import date
from ..models import Order, Sell, Product
from ..schemas import user, sell


def mark_as_delivered(request: sell.SellCreate, user: user.User, db: Session):
    if user.role == "ADMIN":
        if (request.id and request.delivery_date):
            order = db.query(Order).filter(Order.id == request.id)
            order_data = order.all()

            if len(order_data) == 0:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND, detail="No such order in database")

            elif order_data[0].delivered is True:
                raise HTTPException(
                    status_code=status.HTTP_306_RESERVED, detail="Ordered is already delivered")
            else:
                order.update({"delivered": True})
                delivered_order = Sell(
                    id=request.id, delivery_date=request.delivery_date)
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


def get_total_sale(user: user.User, db: Session):
    if user.role == "ADMIN":
        total_sale = select(
            func.sum(Order.quantity)
        ).select_from(Order
        ).where(Order.delivered == True)

        total_sale = db.execute(total_sale).scalar()

        return total_sale
    else:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="You are not authorized for this action")


def get_datewise_sell_count(user: user.User, db: Session):
    if user.role == "ADMIN":
        sells_data = select(
            Sell.delivery_date, func.sum(Order.quantity)
        ).select_from(Sell
        ).join(Order, Order.id == Sell.id
        ).group_by(Sell.delivery_date
        ).order_by(Sell.delivery_date.desc()).limit(7)

        sells_data = db.execute(sells_data).all()

        sells_info = [{'date': date, 'total_sell': total_sell}
                      for date, total_sell in sells_data]

        if sells_info is None:
            raise HTTPException(
                status_code=status.HTTP_204_NO_CONTENT, detail="No Selling data in database")
        else:
            return sells_info
    else:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="You are not authorized for this action")


def get_datewise_sells(user: user.User, db: Session, date: str | date):
    if user.role == "ADMIN":
        all_sells = db.query(Sell).filter(Sell.delivery_date == date).all()

        if all_sells is None:
            raise HTTPException(
                status_code=status.HTTP_204_NO_CONTENT, detail="No Selling data in database")
        else:
            return all_sells
    else:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="You are not authorized for this action")


def get_top_5_sold_products(user: user.User, db: Session):
    if user.role == "ADMIN":
        product_data = select(
            Product.name, func.sum(Order.quantity)
        ).select_from(Order
        ).join(Product, Order.product_id == Product.id
        ).where(Order.delivered == True
        ).group_by(Order.product_id
        ).order_by(func.sum(Order.quantity).desc()).limit(5)

        product_data = db.execute(product_data).all()

        product_info = [{'product_name': name, 'total_sell': total_sell}
                        for name, total_sell in product_data]
        return product_info
    else:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="You are not authorized for this action")

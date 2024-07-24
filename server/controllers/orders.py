from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from ..models import Product, Order
from ..schemas import user, order


def place_order(request: order.OrderCreate, db: Session):
    if (request.order_date and request.customer_id and request.product_id and request.quantity):
        product = db.query(Product).filter(
            Product.id == request.product_id).first()
        if not product:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
        new_order = Order(
            order_date=request.order_date, customer_id=request.customer_id, product_id=request.product_id, quantity=request.quantity
        )
        db.add(new_order)
        db.commit()
        db.refresh(new_order)
        return new_order
    else:
        raise HTTPException(
            status_code=status.HTTP_206_PARTIAL_CONTENT, detail="Fill up all fields")


def get_orders(user: user.User, db: Session):
    if user.role == "ADMIN":
        all_orders = db.query(Order).all()
        if all_orders is None:
            raise HTTPException(
                status_code=status.HTTP_204_NO_CONTENT, detail="No product in database")
        else:
            return all_orders
    else:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="You are not authorized for this action")

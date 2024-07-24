from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from ..models import Product
from ..schemas import user, product


def add_products(request: product.ProductCreate, user: user.User, db: Session):
    if user.role == "ADMIN":
        if (request.name and request.description and request.price and request.quantity):
            product_item = Product(
                name=request.name, description=request.description, price=request.price, quantity=request.quantity)
            db.add(product_item)
            db.commit()
            db.refresh(product_item)
            return product_item
        else:
            raise HTTPException(
                status_code=status.HTTP_206_PARTIAL_CONTENT, detail="Fill up all fields")
    else:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="You are not authorized for this action")


def get_products(user: user.User, db: Session):
    if user.role == "ADMIN":
        products = db.query(Product).all()
        if products is None:
            raise HTTPException(
                status_code=status.HTTP_204_NO_CONTENT, detail="No product in database")
        else:
            total_quantity = 0
            for i in range(len(products)):
                total_quantity += products[i].quantity
            
            response = {
                "total_quantity": total_quantity, "products": products
            }

            return response
    else:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="You are not authorized for this action")

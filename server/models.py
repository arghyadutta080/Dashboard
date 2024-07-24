from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Date, DECIMAL
from sqlalchemy.orm import relationship
from datetime import datetime

from .database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    email = Column(String, unique=True, index=True)
    role = Column(String, default="customer")
    hashed_password = Column(String)
    address = Column(String)
    phone_number = Column(String(10))

    orders = relationship("Order")


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True)
    name = Column(String, index=True)
    description = Column(String, index=True)
    price = Column(DECIMAL)
    quantity = Column(Integer, default=1)

    orders = relationship("Order")
    

class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True)
    order_date = Column(String, default=datetime.today().strftime('%Y-%m-%d'))
    customer_id = Column(Integer, ForeignKey("users.id"))
    product_id = Column(Integer, ForeignKey("products.id"))
    quantity = Column(Integer)
    delivered = Column(Boolean, default=False)

    customer = relationship("User", back_populates="orders")
    product = relationship("Product", back_populates="orders")
    sell = relationship("Sell")


class Sell(Base):
    __tablename__ = "sells"

    id = Column(Integer, ForeignKey("orders.id"), primary_key=True)
    delivery_date = Column(String, default=datetime.today().strftime('%Y-%m-%d'))

    order = relationship("Order", back_populates="sell")
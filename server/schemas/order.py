from pydantic import BaseModel
from datetime import date
from . import user, product


class OrderBase(BaseModel):
    order_date: str | date = date.today()
    quantity: int


class OrderCreate(OrderBase):
    product_id: int


class Order(OrderBase):
    id: int
    delivered: bool
    customer: user.User
    product: product.ProductDelivery

    class Config:
        orm_mode = True

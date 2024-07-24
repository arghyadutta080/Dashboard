from pydantic import BaseModel
from datetime import date
from . import order


class SellBase(BaseModel):
    id: int
    delivery_date: str | date = date.today()


class SellCreate(SellBase):
    pass

    class Config:
        orm_mode = True


class Sell(SellBase):
    order: order.Order

    class Config:
        orm_mode = True

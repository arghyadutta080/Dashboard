from pydantic import BaseModel


class ProductBase(BaseModel):
    name: str
    description: str
    price: float
    


class ProductCreate(ProductBase):
    quantity: int


class Product(ProductBase):
    id: int
    quantity: int

    class Config:
        orm_mode = True


class ProductDelivery(ProductBase):
    id: int

    class Config:
        orm_mode = True

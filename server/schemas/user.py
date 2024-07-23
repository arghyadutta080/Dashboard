from pydantic import BaseModel


class UserBase(BaseModel):
    email: str
    

class UserDetail(BaseModel):
    name: str
    role: str
    address: str
    phone_number: str


class UserCreate(UserDetail):
    email: str
    password: str


class UserLogin(UserBase):
    password: str


class User(UserDetail):
    id: int
    email: str

    class Config:
        orm_mode = True

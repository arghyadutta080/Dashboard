from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from ..utils import getDB
from ..schemas import user
from ..controllers import users
from typing import Annotated


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="user/login")
router = APIRouter(prefix="/user", tags=["Users"])


@router.post('/signup', response_model=user.User)
def signup(request: user.UserCreate, db: Session = Depends(getDB.get_db)):
    return users.signUp_user(request=request, db=db)


@router.post('/login')
def login(request: Annotated[OAuth2PasswordRequestForm, Depends()], db: Session = Depends(getDB.get_db)):
    return users.signIn_user(request=request, db=db)


@router.get('/profile', response_model=user.User)
def get_user_profile(token: Annotated[str, Depends(oauth2_scheme)], db: Session = Depends(getDB.get_db)):
    return users.get_current_user(token=token, db=db)

from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from ..utils import getDB
from ..schemas import user
from ..controllers import users

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

router = APIRouter(prefix="/user", tags=["Users"])

@router.post('/signup', response_model=user.User)
def signup(request: user.UserCreate, db: Session = Depends(getDB.get_db)):
    return users.signUp_user(request=request, db=db)


@router.post('/login', response_model=user.User)
def login(request: user.UserLogin, db: Session = Depends(getDB.get_db)):
    return users.signIn_user(request=request, db=db)

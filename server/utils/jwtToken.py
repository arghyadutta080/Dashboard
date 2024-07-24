import os
import jwt
from jwt.exceptions import InvalidTokenError
from pydantic import BaseModel
from datetime import datetime, timedelta, timezone
from sqlalchemy.orm import Session
from ..models import User
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = 30


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: str | None = None


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def verify_token(db: Session, token, credentials_exception):
    if ALGORITHM:
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            username: str = payload.get("sub")
            if username is None:
                raise credentials_exception
            token_data = TokenData(email=username)
        except InvalidTokenError:
            raise credentials_exception
        
        user = db.query(User).filter(User.email == token_data.email).first()
        
        if user is None:
            raise credentials_exception
        return user

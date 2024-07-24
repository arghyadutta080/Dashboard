from fastapi import HTTPException, status, Depends
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from ..models import User
from ..schemas import user
from ..utils import Hash, jwtToken
from typing import Annotated


def signUp_user(request: user.UserCreate, db: Session):
    if (request.name and request.address and request.role and request.email and request.password and request.phone_number):
        user = db.query(User).filter(User.email == request.email).first()
        if user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="User already registered")

        hashed_password = Hash.bcrypt_password(request.password)
        db_user = User(name=request.name, email=request.email, role=request.role,
                       hashed_password=hashed_password, address=request.address, phone_number=request.phone_number) 
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
    else:
        raise HTTPException(
            status_code=status.HTTP_206_PARTIAL_CONTENT, detail="Fill up all fields")


def signIn_user(request: Annotated[OAuth2PasswordRequestForm, Depends()], db: Session):
    if (request.username and request.password):
        user = db.query(User).filter(User.email == request.username).first()
        if not user:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Wrong Credentials")
        else:
            password_match = Hash.password_verify(request.password, user.hashed_password)
            if password_match:
                # create jwt token
                access_token = jwtToken.create_access_token(data={"sub": request.username})
                token = jwtToken.Token(
                    access_token=access_token, token_type="bearer")
                return token
            else: 
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED, detail="Wrong Credentials")
    else:
        raise HTTPException(
            status_code=status.HTTP_206_PARTIAL_CONTENT, detail="Fill up all fields")


def get_current_user(token, db: Session):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    return jwtToken.verify_token(db, token, credentials_exception)

from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from ..models import User
from ..schemas import user
from ..utils import Hash


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


def signIn_user(request: user.UserLogin, db: Session):
    if (request.email and request.password):
        user = db.query(User).filter(User.email == request.email).first()
        if not user:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Wrong Credentials")
        else:
            password_match = Hash.password_verify(request.password, user.hashed_password)
            if password_match:
                return user
            else: 
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED, detail="Wrong Credentials")
    else:
        raise HTTPException(
            status_code=status.HTTP_206_PARTIAL_CONTENT, detail="Fill up all fields")

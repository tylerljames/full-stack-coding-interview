from sqlalchemy import Boolean, Integer, String, DateTime, ForeignKey, Text, Column
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # relationship to likes
    likes = relationship("Like", back_populates="user")

class Photo(Base):
    __tablename__ = "photos"
    
    id = Column(Integer, primary_key=True, index=True)
    pexels_id = Column(Integer, unique=True, index=True)
    width = Column(Integer)
    height = Column(Integer)
    url = Column(String)
    photographer = Column(String)
    photographer_url = Column(String)
    photographer_id = Column(Integer)
    avg_color = Column(String)
    src_original = Column(Text)
    src_large = Column(Text)
    src_medium = Column(Text)
    src_small = Column(Text)
    alt = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # relationship to likes
    likes = relationship("Like", back_populates="photo")

class Like(Base):
    __tablename__ = "likes"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(ForeignKey("users.id"))
    photo_id = Column(ForeignKey("photos.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # relationships
    user = relationship("User", back_populates="likes")
    photo = relationship("Photo", back_populates="likes")
    


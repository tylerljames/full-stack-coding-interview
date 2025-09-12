from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class Token(BaseModel):
    access_token: str
    token_type: str
    
class TokenData(BaseModel):
    email: Optional[str] = None
    
class UserBase(BaseModel):
    email: EmailStr
    
class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True # read from object attributes, not dict keys - for Pydantic reading of sqlalchemy models attribs

class PhotoResponse(BaseModel):
    id: int
    pexels_id: int
    width: int
    height: int
    url: str
    photographer: str
    photographer_url: str
    photographer_id: int
    avg_color: str
    src_original: str
    src_large2x: str
    src_large: str
    src_medium: str
    src_small: str
    src_portrait: str
    src_landscape: str
    src_tiny: str
    like_count: int = 0
    is_liked: bool = False
    alt: str
    
    class Config:
        from_attributes = True

class LikeResponse(BaseModel):
    message: str
    liked: bool
    like_count: int
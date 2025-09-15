from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func, case
from ..database import get_db
from ..models import User, Photo, Like 
from ..schemas import PhotoResponse, LikeResponse
from ..auth import get_current_user

router = APIRouter(prefix="/photos", tags=["photos"])

@router.get("/", response_model=List[PhotoResponse], status_code=status.HTTP_200_OK)
def get_photos(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get all photos - requires auth"""

    photos =  db.query(
        Photo,
        func.count(Like.id).label('like_count'),
        func.max(case((Like.user_id == current_user.id, 1), else_=0)).label("is_liked")
    ).outerjoin(Like, Photo.id == Like.photo_id).group_by(Photo.id).limit(10).all()
    
    photos_response = []
    for photo_obj, like_count, is_liked in photos:
        photo: Photo = photo_obj
        photo_data = PhotoResponse(
            id=photo.id,
            pexels_id=photo.pexels_id,
            url=photo.url,
            width=photo.width,
            height=photo.height,
            photographer=photo.photographer,
            photographer_url=photo.photographer_url,
            photographer_id=photo.photographer_id,
            avg_color=photo.avg_color,
            src_original=photo.src_original,
            src_large2x=photo.src_large2x,
            src_large=photo.src_large,
            src_medium=photo.src_medium,
            src_landscape=photo.src_landscape,
            src_portrait=photo.src_portrait,
            src_small=photo.src_small,
            src_tiny=photo.src_tiny,
            alt=photo.alt,
            like_count=like_count,
            is_liked=bool(is_liked)
        )
        photos_response.append(photo_data)
    return photos_response

@router.post("/{photo_id}/like", status_code=status.HTTP_200_OK)
def toggle_like(
    photo_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Like or unlike photo"""

    photo = db.query(Photo).filter(Photo.id == photo_id).first()
    if not photo:
        raise HTTPException(status_code=404, detail="Photo not found")

    existing_like = db.query(Like).filter(
        Like.photo_id == photo_id,
        Like.user_id == current_user.id
    ).first()
    
    if existing_like:
        db.delete(existing_like)
        db.commit()
        new_count = db.query(Like).filter(Like.photo_id == photo_id).count()
        return LikeResponse(
            message="Photo unliked",
            liked=False,
            like_count=new_count
        )
    else:
        new_like = Like(photo_id=photo_id, user_id=current_user.id)
        db.add(new_like)
        db.commit()
        new_count = db.query(Like).filter(Like.photo_id == photo_id).count()
        return LikeResponse(
            message="Photo liked",
            liked=True,
            like_count=new_count
        )
        
        
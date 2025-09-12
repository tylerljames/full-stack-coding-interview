from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine
from . import models 
from .load_csv_data import load_photos_from_csv
from .routers import auth, photos

models.Base.metadata.create_all(bind=engine)
load_photos_from_csv()

app = FastAPI(
    title="Photo Gallery API",
    description="Photo gallery API for Clever coding challenge",
    version="1.0.0"
)

app.include_router(auth.router)
app.include_router(photos.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/health")
def health_check():
    return {"status": "healthy"}
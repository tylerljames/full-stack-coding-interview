import pandas as pd
from sqlalchemy.orm import sessionmaker
from app.database import engine
from app.models import Photo

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def load_photos_from_csv():
    """Load photo data from CSV into the db"""

    db = SessionLocal()
    
    try: 
        existing_count = db.query(Photo).count()
        if existing_count > 0:
            print(f"Db already has {existing_count} photos. Skipping CSV load.")
            return
        
        df = pd.read_csv('../../photos.csv')
        print(f"Found {len(df)} photos in CSV")
        print("cols: ", df.columns.to_list())
        print("\nFirst row: ")
        print(df.iloc[0])

        photos = []
        for _, row in df.iterrows():
            photo = Photo(
                pexels_id=int(row['id']),
                width=int(row['width']),
                height=int(row['height']),
                url=row['url'],
                photographer=row['photographer'],
                photographer_url=row['photographer_url'],
                photographer_id=int(row['photographer_id']),
                avg_color=row['avg_color'],
                src_original=row['src.original'],
                src_large2x=row['src.large2x'],
                src_large=row['src.large'],
                src_medium=row['src.medium'],
                src_small=row['src.small'],
                src_portrait=row['src.portrait'],
                src_landscape=row['src.landscape'],
                src_tiny=row['src.tiny'],
                alt=row['alt']
            )
            photos.append(photo)

        db.add_all(photos)
        db.commit()
        print(f"Successfully loaded {len(df)} photos in the db")

    except Exception as e:
        db.rollback()
        print(f"Error loading CSV data: {e}")
        raise
    
    finally:
        db.close()

if __name__ == "__main__":
    load_photos_from_csv()
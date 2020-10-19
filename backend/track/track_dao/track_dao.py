from models import model
from config.dataBase.data_base_client import engine, DbLife
model.Base.metadata.create_all(bind=engine)

def add_track(track_name:list):
    with DbLife() as db:
        temp = []
        for v in track_name:
            same_track = db.query(model.Track).filter(model.Track.track_name == v).first()
            if same_track is None:
                track = model.Track(track_name=v)
                db.add(track)
                db.flush()
                temp.append(track.id)
                db.commit()
            else:
                temp.append(same_track.id)
    return temp

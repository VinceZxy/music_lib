from models import model
from config.dataBase.data_base_client import engine, DbLife
model.Base.metadata.create_all(bind=engine)

def add_certificate(register_major_id,belong_committee,level,filename,get_time):
    with DbLife() as db:
        certificate = model.Certificate(belong_committee=belong_committee,
                                  level=level,certificate_image=filename,
                                  get_time=get_time,register_info_id = register_major_id)
        db.add(certificate)
        db.commit()
def update_certificate(register_major_id,id, belong_committee, level, filename, get_time):
    with DbLife() as db:
        certificate = db.query(model.Certificate).filter(model.Certificate.id ==id).first()
        setattr(certificate,"belong_committee",belong_committee)
        setattr(certificate, "level", level)
        setattr(certificate, "certificate_image", filename)
        setattr(certificate, "get_time", get_time)
        db.commit()
        db.refresh(certificate)
        return certificate
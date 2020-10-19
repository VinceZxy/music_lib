from models import model
from config.dataBase.data_base_client import engine, DbLife
model.Base.metadata.create_all(bind=engine)

def query_qrcode(mechanism_id,level_test_id):
    with DbLife() as db:
        query_list = [
            model.LevelMechanism.mechanism_id == mechanism_id ,
            model.LevelMechanism.level_test_id == level_test_id
        ]
        qrcode = db.query(model.LevelMechanism).filter(*query_list).all()
        return qrcode

def creat_qrcode(mechanism_id,leve_test_id,path):
    with DbLife() as db:
        qrcode = model.LevelMechanism(level_test_id=leve_test_id, mechanism_id=mechanism_id, qr_code_path=path)
        db.add(qrcode)
        db.commit()
        db.refresh(qrcode)
        return qrcode

def get_qrcode(mechanism_id,level_test_id):
    with DbLife() as db:
        qrcode = db.query(model.LevelMechanism).filter(model.LevelMechanism.mechanism_id == mechanism_id,model.LevelMechanism.level_test_id==level_test_id).first()
        return qrcode
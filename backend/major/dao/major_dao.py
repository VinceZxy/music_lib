from models import model
from config.dataBase.data_base_client import engine, DbLife
model.Base.metadata.create_all(bind=engine)
def get_majors(level_test_id):
    with DbLife() as db:
        info = db.query(model.Enter_Major).filter(model.Enter_Major.level_test_id == level_test_id,
                                                  model.Enter_Major.is_delete!=1).all()
    return info
def get_major_byid(major_id):
    with DbLife() as db:
        info = db.query(model.Enter_Major).filter(model.Enter_Major.id == major_id,
                                                  model.Enter_Major.is_delete != 1).first()
    return info
def add_major(major):
    with DbLife() as db:
        data_major = model.Enter_Major(major_name=major.major_name,level=major.level,level_test_id=major.level_test_id,is_delete=0)
        db.add(data_major)
        db.commit()
        db.refresh(data_major)
    return data_major

def update_major(major):
    with DbLife() as db:
        info = db.query(model.Enter_Major).filter(model.Enter_Major.id == major.id,model.Enter_Major.is_delete!=1).first()
        setattr(info,"major_name",major.major_name)
        setattr(info, "level",major.level)
        setattr(info, "level_test_id",major.level_test_id)
        db.commit()
        db.refresh(info)
    return info

def delete_major(id):
    with DbLife() as db:
        info = db.query(model.Enter_Major).filter(model.Enter_Major.id == id,model.Enter_Major.is_delete!=1).first()
        setattr(info,"is_delete",1)
        db.commit()
        db.refresh(info)

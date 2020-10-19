from models import model
from college.api.college_schema import *
from config.dataBase.data_base_client import engine, DbLife
model.Base.metadata.create_all(bind=engine)
from models.model import paginate

def get_college(college_id:int):
    with DbLife() as db:
        college = db.query(model.College).filter(model.College.id == college_id,model.College.is_delete != 1).first()
    return college
def get_all_college():
    with DbLife() as db:
        colleges = db.query(model.College).filter(model.College.is_delete != 1).all()
    return colleges
def add_college(college_name,college_eng_name,address,telephone,filename):
    with DbLife() as db:
        college = model.College(college_name=college_name,college_eng_name=college_eng_name,
                                    address=address,telephone=telephone,icon=filename,is_delete=0)
        db.add(college)
        db.commit()
        db.refresh(college)
        return college
def update_college(id,college_name,college_eng_name,address,telephone,filename):
    with DbLife() as db:
        college = db.query(model.College).filter(model.College.id == id).first()
        setattr(college,"college_name",college_name)
        setattr(college, "college_eng_name", college_eng_name)
        setattr(college, "address", address)
        setattr(college, "telephone", telephone)
        setattr(college, "icon", filename)
        db.commit()
        db.refresh(college)
        return college

def delete_college(id):
    with DbLife() as db:
        college = db.query(model.College).filter(model.College.id == id).first()
        setattr(college,"is_delete",1)
        db.commit()
        db.refresh(college)


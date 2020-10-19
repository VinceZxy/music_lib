from models import model
from config.dataBase.data_base_client import engine, DbLife
model.Base.metadata.create_all(bind=engine)

def get_mechanism(mechanism_id):
    with DbLife() as db:
        mechanism = db.query(model.Mechanism).filter(model.Mechanism.id == mechanism_id,model.Mechanism.is_delete!=1).first()
        return mechanism

def add_mechanism(mechanism):
    with DbLife() as db:
        mechanism = model.Mechanism(mechanism_name =mechanism.mechanism_name ,address =mechanism.address ,
                                    telephone=mechanism.telephone ,college_id = mechanism.college_id,is_delete=0)
        db.add(mechanism)
        db.commit()
        db.refresh(mechanism)
        return mechanism
def update_mechanism(param_mechanism):
    with DbLife() as db:
        mechanism = db.query(model.Mechanism).filter(model.Mechanism.id == param_mechanism.id).first()
        setattr(mechanism,"mechanism_name",param_mechanism.mechanism_name)
        setattr(mechanism, "address", param_mechanism.address)
        setattr(mechanism, "telephone", param_mechanism.telephone)
        setattr(mechanism, "college_id", param_mechanism.college_id)
        db.commit()
        db.refresh(mechanism)
        return mechanism
def delete_mechanism(id):
    with DbLife() as db:
        mechanism = db.query(model.Mechanism).filter(model.Mechanism.id == id).first()
        setattr(mechanism,"is_delete",1)
        db.commit()
        db.refresh(mechanism)

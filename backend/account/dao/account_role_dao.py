from models import model
from config.dataBase.data_base_client import engine, DbLife
model.Base.metadata.create_all(bind=engine)

def add_role(role_name):
    with DbLife() as db:
        role = model.Role(role_name=role_name,status=0)
        db.add(role)
        db.commit()
def find_role():
    with DbLife() as db:
        role = db.query(model.Role).filter(model.Role.status !=1 ).all()
    return role

def find_account():
    with DbLife() as db:
        account = db.query(model.Account).filter(model.Account.status !=1 ).all()
    return account

def relation_account_role(account_id,role_id):
    with DbLife() as db:
        role = db.query(model.Role).filter(model.Role.id==role_id).first()
        account = db.query(model.Account).filter(model.Account.id == account_id).first()
        account.roles.append(role)
        db.commit()
from models import model
from config.dataBase.data_base_client import engine, DbLife
from set_path_config import *
model.Base.metadata.create_all(bind=engine)

def register(telephone,password,email):
    with DbLife() as db:
        #密码加密
        password_hash = model.Account.generate_password_hash(password)
        account = model.Account(telephone=telephone, password=password_hash,status = 0,email=email)
        db.add(account)
        db.commit()
        db.refresh(account)
        return account

def get_account(telephone):
    with DbLife() as db:
        account = db.query(model.Account).filter(model.Account.telephone == telephone).first()
        return account

def get_account_byid(id):
    with DbLife() as db:
        account = db.query(model.Account).filter(model.Account.id == id).first()
        return account

def reset_passd(telephone):
    re_password = os.environ.get("RESET_PASSWORD_VALUE")
    with DbLife() as db:
        queryAccount = db.query(model.Account).filter(model.Account.telephone == telephone).first()
        setattr(queryAccount, "password", re_password)  #修改password的值为re_password
        db.commit()

def updata_passd(id,new_password):
    with DbLife() as db:
        queryAccount = db.query(model.Account).filter(model.Account.id == id).first()
        setattr(queryAccount, "password", new_password)
        db.commit()
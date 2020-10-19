from models import model
from config.dataBase.data_base_client import engine, DbLife
model.Base.metadata.create_all(bind=engine)


def get_account(telephone):
    with DbLife() as db:
        account = db.query(model.Account).filter(model.Account.telephone == telephone).first()
        return account
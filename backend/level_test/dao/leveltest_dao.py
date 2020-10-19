from models import model
from config.dataBase.data_base_client import engine, DbLife
model.Base.metadata.create_all(bind=engine)

def get_level_test(leveltest_id):
    with DbLife() as db:
        leveltest_info = db.query(model.LevelTest).filter(model.LevelTest.id == leveltest_id,model.LevelTest.is_delete != 1).first()
        return leveltest_info
def get_all_level_test():
    with DbLife() as db:
        leveltest_info = db.query(model.LevelTest).filter(model.LevelTest.is_delete != 1).all()
        return leveltest_info
def add_level_test(leveltest):
    with DbLife() as db:
        leveltest = model.LevelTest(test_name=leveltest.test_name,start_time=leveltest.start_time,end_time=leveltest.end_time,is_delete=0)
        db.add(leveltest)
        db.commit()
        db.refresh(leveltest)
    return leveltest

def update_level_test(param_leveltest):
    with DbLife() as db:
        leveltest = db.query(model.LevelTest).filter(model.LevelTest.id == param_leveltest.id).first()
        setattr(leveltest,"test_name",param_leveltest.test_name)
        setattr(leveltest, "start_time", param_leveltest.start_time)
        setattr(leveltest, "end_time", param_leveltest.end_time)
        db.commit()
        db.refresh(leveltest)
    return leveltest

def delete_level_test(id):
    with DbLife() as db:
        level_test = db.query(model.LevelTest).filter(model.LevelTest.id ==id).first()
        setattr(level_test,"is_delete",1)
        db.commit()
        db.refresh(level_test)

def get_leveltest_by_mid(mechanism_id):
    with DbLife() as db:
        leveltests = []
        levelmechanisms = db.query(model.LevelMechanism).filter(model.LevelMechanism.mechanism_id ==mechanism_id,model.LevelMechanism.is_delete != 1).all()
        for levelmechanism in levelmechanisms:
            leveltest = db.query(model.LevelTest).filter(model.LevelTest.id == levelmechanism.level_test_id,model.LevelTest.is_delete!=1).first()
            leveltests.append(leveltest)
        return  leveltests

from models import model
from config.dataBase.data_base_client import engine, DbLife
from student.api.student_schema import StudentBase
model.Base.metadata.create_all(bind=engine)


def get_students(account_id:int):
    with DbLife() as db:
        students = db.query(model.Student).filter(model.Student.account_id == account_id).all()
    return students

def add_student(student_param:StudentBase):
    with DbLife() as db:
        data_student = model.Student()
        student_dict = student_param.dict(exclude_unset=True)  # 变成字典,修改所有
        for k, v in student_dict.items():
            if(k!="id"):
                setattr(data_student, k, v)
        db.add(data_student)
        db.commit()
        db.refresh(data_student)
    return data_student
def examine(student_id,levetest_id,mechanism_id):
    with DbLife() as db:
        studnet = model.LevelMechanismStudent(mechanism_id=mechanism_id,level_test_id=levetest_id,student_id=student_id)
        db.add(studnet)
        db.commit()
def updata_student(student_param:StudentBase):
    with DbLife() as db:
        data_student = db.query(model.Student).filter(model.Student.id == student_param.id).first()
        student_dict = student_param.dict(exclude_unset=True)  # 变成字典,修改所有
        for k, v in student_dict.items():
            setattr(data_student, k, v)
        db.commit()
        db.refresh(data_student)
    return data_student
from student.dao import student_dao


def get_students(account_id):
    students = student_dao.get_students(account_id)
    return students

def add_student(student_param):
    data_student = student_dao.add_student(student_param)
    student_dao.examine(student_param.id,student_param.levetest_id,student_param.mechanism_id)
    return data_student

def updata_student(student_param):
    updata_student = student_dao.updata_student(student_param)
    return updata_student
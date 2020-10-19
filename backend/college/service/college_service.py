from college.dao import college_dao

def get_college(college_id:int):
    college = college_dao.get_college(college_id)
    return college

def get_all_college():
    colleges = college_dao.get_all_college()
    return colleges
def add_college(college_name,college_eng_name,address,telephone,filename):
    college = college_dao.add_college(college_name,college_eng_name,address,telephone,filename)
    return college

def update_college(id,college_name,college_eng_name,address,telephone,filename):
    college = college_dao.update_college(id,college_name,college_eng_name,address,telephone,filename)
    return college
def delete_college(id):
    college_dao.delete_college(id,)

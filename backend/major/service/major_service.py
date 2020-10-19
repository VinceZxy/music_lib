from major.dao import major_dao

def get_majors(level_test_id):
    queryMajor = major_dao.get_majors(level_test_id)
    return queryMajor
def get_major_byid(major_id):
    queryMajor = major_dao.get_major_byid(major_id)
    return queryMajor
def add_major(major):
    queryMajor = major_dao.add_major(major)
    return queryMajor
def update_major(major):
    queryMajor = major_dao.update_major(major)
    return queryMajor
def delete_major(id):
    major_dao.delete_major(id)
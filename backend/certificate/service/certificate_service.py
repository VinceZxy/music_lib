from certificate.dao import certificate_dao
def add_certificate(register_major_id,belong_committee,level,filename,get_time):
    certificate_dao.add_certificate(register_major_id,belong_committee,level,filename,get_time)
def update_certificate(register_major_id,id,belong_committee,level,filename,get_time):
    certificate = certificate_dao.update_certificate(register_major_id,id, belong_committee, level, filename, get_time)
    return certificate
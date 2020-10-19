from models import model
from config.dataBase.data_base_client import engine, DbLife
from register_major.api.register_major_schema import Register_Major_Base,Add_Register_Major
from track.track_dao import track_dao
from certificate.dao import certificate_dao
from datetime import datetime
model.Base.metadata.create_all(bind=engine)


def get_register_majors(student_id:int):
    with DbLife() as db:
        info = db.query(model.Register_Major).filter(model.Register_Major.student_id == student_id).all()
    return info


def get_register_major(register_major_id):
    with DbLife() as db:
        info = db.query(model.Register_Major).filter(model.Register_Major.id == register_major_id).first()
    return info

def get_noexamine_register_major():
    with DbLife() as db:
        info = db.query(model.Register_Major).filter(model.Register_Major.status == 1).all()
    return info
def examine_success(register_major_id):
    with DbLife() as db:
        register = db.query(model.Register_Major).filter(model.Register_Major.id == register_major_id).first()
        setattr(register, "status", 2)
        db.add(register)
        db.commit()

def examine_fail(register_major_id):
    with DbLife() as db:
        register = db.query(model.Register_Major).filter(model.Register_Major.id == register_major_id).first()
        setattr(register, "status", 3)
        db.add(register)
        db.commit()
def add_register_major(re_major:Add_Register_Major):
    temp = []
    if re_major.track_1 != '' and re_major.track_1 is not None:
        temp.append(re_major.track_1)
    if re_major.track_2 != '' and re_major.track_2 is not None:
        temp.append(re_major.track_2)
    if re_major.track_3 != '' and re_major.track_3 is not None:
        temp.append(re_major.track_3)
    if re_major.track_4 != '' and re_major.track_4 is not None:
        temp.append(re_major.track_4)
    track_id_list = track_dao.add_track(temp)
    data_register_major = model.Register_Major()
    for index in range(len(track_id_list)):
        if index == 0:
            setattr(data_register_major,"track_1", track_id_list[index])
        if index == 1:
            setattr(data_register_major, "track_2", track_id_list[index])
        if index == 2:
            setattr(data_register_major, "track_3", track_id_list[index])
        if index == 3:
            setattr(data_register_major, "track_4", track_id_list[index])
    inset_register_id = 0
    with DbLife() as db:
        setattr(data_register_major, "instructor",re_major.instructor)
        setattr(data_register_major, "instructor_phtone", re_major.instructor_phtone)
        setattr(data_register_major, "register_level", re_major.register_level)
        setattr(data_register_major, "mode", re_major.mode)
        setattr(data_register_major, "status",0)
        setattr(data_register_major, "video_status", 0)
        setattr(data_register_major, "is_delete", 0)
        setattr(data_register_major, "creat_time",datetime.now())
        setattr(data_register_major, "student_id", re_major.student_id)
        setattr(data_register_major, "enter_major_id", re_major.enter_major_id)
        db.add(data_register_major)
        inset_register_id = data_register_major.id
        db.commit()
        db.refresh(data_register_major)
    return data_register_major

def update_register_major(re_major):
    with DbLife() as db:
        register = db.query(model.Register_Major).filter(model.Register_Major.id == re_major.id).first()
        temp = []
        if re_major.track_1 != '' and re_major.track_1 is not None:
            temp.append(re_major.track_1)
        if re_major.track_2 != '' and re_major.track_2 is not None:
            temp.append(re_major.track_2)
        if re_major.track_3 != '' and re_major.track_3 is not None:
            temp.append(re_major.track_3)
        if re_major.track_4 != '' and re_major.track_4 is not None:
            temp.append(re_major.track_4)
        track_id_list = track_dao.add_track(temp)

        for index in range(len(track_id_list)):
            if index == 0:
                setattr(register, "track_1", track_id_list[index])
                if len(track_id_list)==2:
                    setattr(register, "track_3", None)
                    setattr(register, "track_4", None)
            if index == 1:
                setattr(register, "track_2", track_id_list[index])
            if index == 2:
                setattr(register, "track_3", track_id_list[index])
            if index == 3:
                setattr(register, "track_4", track_id_list[index])
        setattr(register, "instructor", re_major.instructor)
        setattr(register, "instructor_phtone", re_major.instructor_phtone)
        setattr(register, "register_level", re_major.register_level)
        setattr(register, "mode", re_major.mode)
        setattr(register, "updata_time", datetime.now())
        setattr(register, "student_id", re_major.student_id)
        setattr(register, "enter_major_id", re_major.enter_major_id)
        db.commit()
        db.refresh(register)

def application_review(register_major_id):
    with DbLife() as db:
        register = db.query(model.Register_Major).filter(model.Register_Major.id == register_major_id).first()
        setattr(register, "status",1)
        db.commit()

def upload_video(file_name_list,track_ids,register_ids,register_id):
    with DbLife() as db:
        register = db.query(model.Register_Major).filter(model.Register_Major.id == register_id).first()
        setattr(register, "video_status", 1)
        db.add(register)
        for i,file_name in enumerate(file_name_list):
            video = model.Video(video_name=file_name, path=file_name, register_info_id=register_ids[i], track_id=track_ids[i])
            db.add(video)
        db.commit()




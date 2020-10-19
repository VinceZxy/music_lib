from sqlalchemy import Column, String, Integer, DateTime,Date,ForeignKey,Table
from sqlalchemy.orm import relationship
from config.dataBase.data_base_client import Base
from sqlalchemy_pagination import paginate
import hashlib

association_table = Table('t_account_role', Base.metadata,
    Column('account_id', Integer, ForeignKey('t_account.id')),
    Column('role_id', Integer, ForeignKey('t_role.id')),
    Column('status', Integer)
)

class College(Base):
    __tablename__ = 't_college'
    id = Column(Integer, primary_key=True)
    college_name = Column(String(255))
    college_eng_name =  Column(String(255))
    address = Column(String(255))
    telephone = Column(String(11))
    icon = Column(String(255))
    is_delete = Column(Integer)
    mechanisms = relationship("Mechanism", back_populates="owner", lazy="joined")  # 一对多


class Mechanism(Base):
    __tablename__ = "t_mechanism"
    id = Column(Integer, primary_key=True, index=True)
    mechanism_name = Column(String(255))
    address = Column(String(255))
    telephone = Column(String(11))
    is_delete = Column(Integer)
    college_id = Column(Integer, ForeignKey("t_college.id"))  ##外键对应的主键id
    owner = relationship("College", back_populates="mechanisms")  # 多对一

class LevelTest(Base):
    __tablename__ = "t_level_test"
    id = Column(Integer, primary_key=True, index=True)
    test_name = Column(String(255))
    start_time = Column(DateTime)
    end_time = Column(DateTime)
    is_delete = Column(Integer)

class LevelMechanism(Base):

    __tablename__ = "t_level_mechanism"
    id = Column(Integer, primary_key=True, index=True)
    level_test_id = Column(Integer, ForeignKey("t_level_test.id"))
    mechanism_id = Column(Integer, ForeignKey("t_mechanism.id"))
    qr_code_path = Column(String(255))
    is_delete = Column(Integer)

class LevelMechanismStudent(Base):

    __tablename__ = "t_level_mechanism_student"
    id = Column(Integer, primary_key=True, index=True)
    mechanism_id = Column(Integer, ForeignKey('t_mechanism.id'))
    level_test_id = Column(Integer, ForeignKey('t_level_test.id'))
    student_id = Column(Integer, ForeignKey('t_student.id'))
    is_delete = Column(Integer)
    mechanism = relationship("Mechanism", lazy="joined")
    leveltest = relationship("LevelTest", lazy="joined")
    student = relationship("Student", lazy="joined")



class Role(Base):
    __tablename__ = "t_role"
    id = Column(Integer, primary_key=True, index=True)
    role_name = Column(String(255))
    status = Column(Integer)

class Account(Base):
    __tablename__ = "t_account"
    id = Column(Integer, primary_key=True, index=True)
    telephone = Column(String(11))
    password = Column(String(255))  # 加密的密码
    email = Column(String(255))
    status = Column(Integer)
    is_delete = Column(Integer)
    remake1 = Column(String(255))
    remake2 = Column(String(255))
    remake3 = Column(String(255))
    remake4 = Column(String(255))
    remake5 = Column(String(255))
    student = relationship("Student", back_populates="owner", lazy="joined")  # 一对多
    roles = relationship('Role', secondary=association_table, lazy="joined", backref=('t_account')) #多对多
    def generate_password_hash(origin_password):
        """对密码进行加密"""
        hash_password  = hashlib.md5()
        hash_password.update(origin_password.encode('utf-8'))
        return hash_password.hexdigest()

    def check_password(self,data_passwd,param_passwd):
        """
        检验密码的正确性
        :param data_passwd:数据库查询的密码
                param_passwd:  传入md加密的密码
        :return: 如果正确，返回True， 否则返回False
        """
        if data_passwd == param_passwd:
            return True
        return False

    def convert2json(account):
        return {
            'id': account.id,
            'telephone': account.telephone
        }

class Student(Base):
    __tablename__ = "t_student"
    id = Column(Integer, primary_key=True, index=True)
    student_name = Column(String(255))
    name_pinyin = Column(String(255))
    document_type = Column(Integer,ForeignKey("t_dict.id"))
    id_number = Column(String(255))
    sex = Column(Integer)
    nationality = Column(String(255))
    nation = Column(String(255))
    birth_time = Column(Date)
    photo = Column(String(255))
    is_delete = Column(Integer)
    account_id = Column(Integer, ForeignKey("t_account.id"))  ##外键对应的主键id
    owner = relationship("Account", back_populates="student")
    dict_owner = relationship("T_Dict", lazy="joined", uselist = False)


class T_Dict(Base):
    __tablename__ = "t_dict"
    id = Column(Integer, primary_key=True, index=True)
    describe = Column(String(255))


#报名专业信息表
class Register_Major(Base):
    __tablename__ = "t_register_info"
    id = Column(Integer, primary_key=True, index=True)
    instructor = Column(String(255))
    instructor_phtone = Column(String(255))
    mode = Column(String(255))
    register_level = Column(Integer)
    status = Column(Integer)
    video_status = Column(Integer)
    creat_time = Column(Date)
    delete_time = Column(Date)
    updata_time = Column(Date)
    track_1 = Column(Integer,ForeignKey("t_track.id"),nullable=False)
    track_2 = Column(Integer,ForeignKey("t_track.id"),nullable=False)
    track_3 = Column(Integer,ForeignKey("t_track.id"),nullable=False)
    track_4 = Column(Integer,ForeignKey("t_track.id"),nullable=False)
    student_id = Column(Integer,ForeignKey("t_student.id"))
    enter_major_id = Column(Integer,ForeignKey("t_enter_major.id"))
    is_delete = Column(Integer)
    student = relationship("Student", lazy="joined",uselist=False)
    enter_major = relationship("Enter_Major", lazy="joined",uselist=False)
    certificate = relationship("Certificate",back_populates="owner", lazy="joined")
    track1 = relationship("Track", foreign_keys=[track_1], lazy="joined")
    track2 = relationship("Track", foreign_keys=[track_2], lazy="joined")
    track3 = relationship("Track", foreign_keys=[track_3], lazy="joined")
    track4 = relationship("Track", foreign_keys=[track_4], lazy="joined")
#专业信息表
class Enter_Major(Base):
    __tablename__ = "t_enter_major"
    id = Column(Integer, primary_key=True, index=True)
    major_name = Column(String(255))
    level = Column(String(11))
    level_test_id = Column(Integer,ForeignKey("t_level_test.id"))
    is_delete = Column(Integer)
class Certificate(Base):
    __tablename__ = "t_certificate"
    id = Column(Integer, primary_key=True, index=True)
    belong_committee = Column(String(255))
    level= Column(Integer)
    certificate_image= Column(String(255))
    get_time= Column(DateTime)
    register_info_id= Column(Integer, ForeignKey("t_register_info.id"))
    owner = relationship("Register_Major", back_populates="certificate")

class Track(Base):
    __tablename__ = "t_track"
    id = Column(Integer, primary_key=True, index=True)
    track_name = Column(String(255))

class Video(Base):
    __tablename__ = "t_video"
    id = Column(Integer, primary_key=True, index=True)
    video_name = Column(String(255))
    path = Column(String(11))
    register_info_id = Column(Integer, ForeignKey("t_register_info.id"))
    track_id = Column(Integer, ForeignKey("t_track.id"))


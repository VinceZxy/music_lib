from sqlalchemy import Column, String, Integer, DateTime,Date,ForeignKey,Table
from data_base_client import Base

class College(Base):
    __tablename__ = 't_college'
    id = Column(Integer, primary_key=True)
    college_name = Column(String(255))
    college_eng_name =  Column(String(255))
    address = Column(String(255))
    telephone = Column(String(11))
    icon = Column(String(255))
    is_delete = Column(Integer)

class Mechanism(Base):
    __tablename__ = "t_mechanism"
    id = Column(Integer, primary_key=True, index=True)
    mechanism_name = Column(String(255))
    address = Column(String(255))
    telephone = Column(String(11))
    college_id = Column(Integer, ForeignKey("t_college.id"))
    is_delete = Column(Integer)

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
    remake1 = Column(String(255))
    remake2 = Column(String(255))
    remake3 = Column(String(255))
    remake4 = Column(String(255))
    remake5 = Column(String(255))
class Account_Role(Base):
    __tablename__ = "t_account_role"
    id = Column(Integer, primary_key=True, index=True)
    account_id = Column(Integer)
    role_id = Column(Integer)  # 加密的密码
    status = Column(Integer)
class T_Dict(Base):
    __tablename__ = "t_dict"
    id = Column(Integer, primary_key=True, index=True)
    describe = Column(String(255))

#专业信息表
class Enter_Major(Base):
    __tablename__ = "t_enter_major"
    id = Column(Integer, primary_key=True, index=True)
    major_name = Column(String(255))
    level = Column(String(11))
    level_test_id = Column(Integer,ForeignKey("t_level_test.id"))
    is_delete = Column(Integer)
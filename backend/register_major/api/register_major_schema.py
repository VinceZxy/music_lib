from pydantic import BaseModel
from pydantic.fields import Field
from fastapi import File, UploadFile
from major.api.major_schema import *
from certificate.api.certificate_schema import Certificate,Add_Certificate
from track.track_api.track_schema import Track
from student.api.student_schema import StudentBase
from typing import List
from datetime import date

class Register_Major_Base(BaseModel):
    id: int = Field(None,title='报名专业id', description='报名专业表的id')
    instructor : str = Field(title='指导老师姓名', description='指导老师姓名')
    instructor_phtone: str = Field(title='指导老师电话', description='指导老师电话',max_length=11,min_length=11)
    mode: str = Field(title='考试的方式', description='考试的方式')
    register_level: int = Field(title='报考专业的级别', description='报考专业的级别')
    status: int = Field(None,title='状态', description='状态')
    video_status:int = Field(None,title='上传视频状态', description='上传视频状态')
    track1: Track = Field(None,title='曲目1名称', description='曲目1名称',)
    track2: Track = Field(None,title='曲目2名称', description='曲目2名称')
    track3: Track = Field(None,title='曲目3名称', description='曲目3名称')
    track4: Track = Field(None,title='曲目4名称', description='曲目4名称')
    student_id : int = Field(title='学生id', description='学生表的id')
    enter_major_id : int = Field(title='专业的id', description='专业表的id')
    is_delete: int = Field(None, title='是否删除', description='是否删除')
    certificate:List[Certificate] =  Field([],title='所获证书的集合', description='所获证书的集合')
    class Config:
        orm_mode = True
class Add_Register_Major(BaseModel):
    instructor: str = Field(None,title='指导老师姓名', description='指导老师姓名')
    instructor_phtone: str = Field(title='指导老师电话', description='指导老师电话', max_length=11, min_length=11)
    mode: str = Field(title='考试的方式', description='考试的方式')
    register_level: int = Field(title='报考专业的级别', description='报考专业的级别')
    status: int = Field(None, title='状态', description='状态')
    video_status: int = Field(None, title='视频状态', description='视频状态')
    creat_time:date  = Field(None, title='创建时间', description='视频状态')
    delete_time: date = Field(None, title='删除时间', description='视频状态')
    updata_time: date = Field(None, title='修改时间', description='视频状态')
    track_1: str = Field(title='曲目1名称', description='曲目1名称', )
    track_2: str = Field(title='曲目2名称', description='曲目2名称')
    track_3: str = Field(None, title='曲目3名称', description='曲目3名称')
    track_4: str = Field(None, title='曲目4名称', description='曲目4名称')
    student_id: int = Field(title='学生id', description='学生表的id')
    enter_major_id: int = Field(title='专业的id', description='专业表的id')
    class Config:
        orm_mode = True
class Updata_Register_Major(Add_Register_Major):
    id: int = Field(None, title='报名专业id', description='报名专业表的id')
    class Config:
        orm_mode = True
class Register_Major(Register_Major_Base):
    enter_major:Major_Base = Field(None,title='专业信息', description='专业信息')
    student: StudentBase = Field(title='学生', description='学生')
    class Config:
        orm_mode = True





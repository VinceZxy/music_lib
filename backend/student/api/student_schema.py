from pydantic import BaseModel
from pydantic.fields import Field
from fastapi import  File, UploadFile
from datetime import date,datetime

class T_Dict(BaseModel):
    describe:str = Field(title='字典表描述', description='字典表描述')
    class Config:
        orm_mode = True
class StudentBase(BaseModel):
    id : int = Field(None,title='学员id', description='学员表的主键')
    student_name: str = Field(title='学员名称', description='学员名称')
    name_pinyin: str = Field(title='学员名称拼音', description='学员名称拼音')
    document_type: int = Field(title='证件类型', description='证件类型')
    id_number: str = Field(title='身份证号', description='身份证号',max_length=18,min_length=18)
    sex: int = Field(title='性别', description='性别')
    nationality : str = Field(title='学员国籍', description='学员国籍')
    nation: str = Field(title='学员民族', description='学员民族')
    birth_time:date = Field(title='学员出生日期', description='学员出生日期')
    photo:str = Field(title='学员照片', description='学员照片')
    account_id:int = Field(None,title='账号id', description='账号表的主键')
    levetest_id:int = Field(None,title='水平考试id', description='水平考试id')
    mechanism_id:int = Field(None,title='机构id', description='机构id')
    is_delete:int = Field(None,title='是否删除', description='是否删除')
    class Config:
        orm_mode = True
class Student(StudentBase):
    dict_owner:T_Dict = Field(None,title='学员对应字典表信息', description='主要是证件类型信息')
    class Config:
        orm_mode = True


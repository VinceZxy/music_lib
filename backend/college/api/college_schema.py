from typing import List
from pydantic import BaseModel
from pydantic.fields import Field
from mechanism.api.mechanism_schema import Mechanism

class CollegeBase(BaseModel):

    id : int = Field(None,title='学院id', description='学院表的主键')
    college_name: str = Field(title='学院名称', description='学院名称')
    college_eng_name: str = Field(title='学院英文名称', description='学院英文名称')
    address: str = Field(title='学院地址', description='学院地址')
    telephone: str = Field(title='学院电话', description='学院电话',max_length=11,min_length=11)
    icon: str = Field(title='学院图标', description='学院图标')
    is_delete:int = Field(None,title='是否删除', description='是否删除')

class College(CollegeBase):

    mechanisms: List[Mechanism] = Field([], title='学院机构', description='学院下多个机构')

    class Config:
        orm_mode = True
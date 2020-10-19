from pydantic import BaseModel
from pydantic.fields import Field

class Mechanism(BaseModel):

    id : int = Field(None,title='机构id', description='机构表的主键')
    mechanism_name: str = Field(title='机构名称', description='学院名称')
    address: str = Field(title='机构地址', description='机构地址')
    telephone: str = Field(title='机构电话', description='机构电话',max_length=11,min_length=11)
    college_id: int = Field(title='学院id', description='学院id')
    is_delete:int = Field(None,title='是否删除', description='是否删除')
    class Config:
        orm_mode = True
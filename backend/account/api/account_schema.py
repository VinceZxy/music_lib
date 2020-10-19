from pydantic import BaseModel,EmailStr
from pydantic.fields import Field

class Account(BaseModel):

    id : int = Field(None,title='账号id', description='账号表的主键')
    telephone: str = Field(title='手机号', description='手机号',max_length=11,min_length=11)
    password: str = Field(title='密码', description='密码')
    email: EmailStr = Field(title='邮箱', description='邮箱')
    class Config:
        orm_mode = True

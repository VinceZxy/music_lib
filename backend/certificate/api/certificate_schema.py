from pydantic import BaseModel
from pydantic.fields import Field
from datetime import datetime

class Certificate(BaseModel):
    id: int = Field(None,title='证书id', description='证书id')
    belong_committee: str = Field(title='证书所属委员会', description='证书所属委员会')
    level: int = Field(title='证书等级', description='证书等级')
    certificate_image : str = Field(title='证书图片路径', description='证书图片路径')
    get_time: datetime = Field(title='证书获得时间', description='证书获得时间')
    register_info_id: int = Field(title='报考人信息id', description='报考人信息id')
    class Config:
        orm_mode = True
class Add_Certificate(BaseModel):
    belong_committee: str = Field(title='证书所属委员会', description='证书所属委员会')
    level: int = Field(title='证书等级', description='证书等级')
    certificate_image: str = Field(None,title='证书图片路径', description='证书图片路径')
    get_time: datetime = Field(title='证书获得时间', description='证书获得时间')
    class Config:
        orm_mode = True
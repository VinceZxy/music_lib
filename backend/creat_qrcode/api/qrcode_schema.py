from datetime import datetime
from pydantic import BaseModel
from pydantic.fields import Field

class QrCode(BaseModel):
    level_test_id: int = Field(title='水平考试id', description='水平考试id')
    mechanism_id: int = Field(title='机构id', description='机构id')
    qr_code_path: str = Field(title='二维码路径', description='二维码路径')
    class Config:
        orm_mode = True
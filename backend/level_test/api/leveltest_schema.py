from datetime import datetime
from pydantic import BaseModel
from pydantic.fields import Field

class LevelTest(BaseModel):
    id: int = Field(None, title='水平考试id', description='水平考试表的主键')
    test_name: str = Field(title='水平考试名称', description='水平考试名称')
    start_time: datetime = Field(title='水平考试开始时间', description='水平考试开始时间')
    end_time: datetime = Field(title='水平考试结束时间', description='水平考试结束时间')
    is_delete:int = Field(None,title='是否删除', description='是否删除')

    class Config:
        orm_mode = True
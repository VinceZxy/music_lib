from pydantic import BaseModel
from pydantic.fields import Field

class Major_Base(BaseModel):
    id: int = Field(title='专业id', description='专业表的id')
    major_name: str = Field(title='专业名称', description='专业名称')
    level: str = Field(title='专业等级', description='专业等级')
    level_test_id:int = Field(title='水平考试id', description='水平考试id')
    is_delete:int = Field(None,title='是否删除', description='是否删除')
    class Config:
        orm_mode = True
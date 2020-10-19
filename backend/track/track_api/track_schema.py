from pydantic import BaseModel
from pydantic.fields import Field
from fastapi import File, UploadFile
from major.api.major_schema import *
from certificate.api.certificate_schema import Certificate
from typing import List

class Track(BaseModel):
    id: int = Field(title='曲目id', description='曲目id')
    track_name:str = Field(title='曲目名称', description='曲目名称')
    class Config:
        orm_mode = True
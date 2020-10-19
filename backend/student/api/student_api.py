from fastapi import APIRouter, status,Request, File, UploadFile,Form
from logger import logger
from student.service import student_service
from common.common import *
from student.api.student_schema import *
from typing import List
from set_path_config import *
import os
import json
router = APIRouter()

#查询学员列表信息
#账号的id
@router.get("/{account_id}", tags=["student"],response_model=List[Student])
async def get_students(account_id:int,request:Request):
    try:
        # account = request.state.account
        # account_idc = json.loads(account)
        students = student_service.get_students(account_id)
    except Exception as e:
        logger.error(e)
        return JSONResponse(content=str(e), status_code=status.HTTP_417_EXPECTATION_FAILED)
    return students

#添加学员信息
#param：学员得信息
@router.post("/", tags=["student"],response_model=StudentBase)
async def add_student(student_param:StudentBase):
    try:
       data_student = student_service.add_student(student_param)
    except Exception as e:
        logger.error(e)
        return JSONResponse(content=str(e), status_code=status.HTTP_417_EXPECTATION_FAILED)
    return data_student

#修改学员信息
#param：学员得信息
@router.put("/", tags=["student"],response_model=StudentBase)
async def updata_student(student_param:StudentBase):
    try:
       data_student = student_service.updata_student(student_param)
    except Exception as e:
        logger.error(e)
        return JSONResponse(content=str(e), status_code=status.HTTP_417_EXPECTATION_FAILED)
    return data_student

# #上传照片
@router.post("/upload_photos", tags=["student"])
async def upload_photos(file: UploadFile = File(...)):
    try:
        photos_path = os.environ.get("PHOTO_PATH") + file.filename
        res = await file.read()
        with open(photos_path, "wb") as f:
            f.write(res)
    except Exception as e:
        logger.error(e)
        return JSONResponse(content=str(e), status_code=status.HTTP_417_EXPECTATION_FAILED)
    return file.filename


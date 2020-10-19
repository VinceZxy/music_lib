from fastapi import APIRouter,status,UploadFile,File,Form
from logger import logger
from fastapi.responses import JSONResponse
from college.api.college_schema import *
from college.service import college_service
from college.api.college_schema import *
import os
router = APIRouter()

#查询学院信息
#学院的id
@router.get("/{college_id}", tags=["college"],response_model=College)
async def get_college(college_id:int):
    try:
        colleges = college_service.get_college(college_id)
        if colleges is None:
            return JSONResponse(content=str("没有学院信息"), status_code=status.HTTP_417_EXPECTATION_FAILED)
    except Exception as e:
        logger.error(e)
    return colleges

#查询学院信息
@router.get("/", tags=["college"],response_model=List[College])
async def get_college():
    try:
        college = college_service.get_all_college()
    except Exception as e:
        logger.error(e)
        return JSONResponse(content=str("没有该学院信息"), status_code=status.HTTP_417_EXPECTATION_FAILED)
    return college

#增加学院
@router.post("/", tags=["college"],response_model=College)
async def add_college(college_name:str = Form(...) ,
                       college_eng_name:str =  Form(...),
                        address:str  =  Form(...),
                      telephone:str  =  Form(...),
                      file: UploadFile = File(...)):
    try:
        photos_path = os.environ.get("PHOTO_PATH") + file.filename
        res = await file.read()
        with open(photos_path, "wb") as f:
            f.write(res)
        college = college_service.add_college(college_name,college_eng_name,address,telephone,file.filename)
    except Exception as e:
        logger.error(e)
        return JSONResponse(content=str(e), status_code=status.HTTP_417_EXPECTATION_FAILED)
    return college

#修改学院
@router.put("/", tags=["college"],response_model=College)
async def update_college(id:int = Form(...) ,
                        college_name:str = Form(...) ,
                       college_eng_name:str =  Form(...),
                        address:str  =  Form(...),
                      telephone:str  =  Form(...),
                      file: UploadFile = File(...)):
    try:
        photos_path = os.environ.get("PHOTO_PATH") + file.filename
        res = await file.read()
        with open(photos_path, "wb") as f:
            f.write(res)
        college = college_service.update_college(id,college_name,college_eng_name,address,telephone,file.filename)
    except Exception as e:
        logger.error(e)
        return JSONResponse(content=str(e), status_code=status.HTTP_417_EXPECTATION_FAILED)
    return college

#删除学院
@router.delete("/{id}", tags=["college"])
async def update_college(id:int):
    try:
        college_service.delete_college(id)
    except Exception as e:
        logger.error(e)
        return JSONResponse(content=str(e), status_code=status.HTTP_417_EXPECTATION_FAILED)
    return JSONResponse(content="删除成功", status_code=status.HTTP_200_OK)



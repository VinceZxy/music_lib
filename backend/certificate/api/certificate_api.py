from fastapi import APIRouter, File, UploadFile,Form
from logger import logger
from common.common import *
from certificate.service import certificate_service
from register_major.api.register_major_schema import *
from typing import List
from set_path_config import *
from datetime import datetime
import os
router = APIRouter()


#为该报名信息添加集合证书
@router.post("/{register_major_id}", tags=["cetificate"])
async def add_certificate(register_major_id:int,
                          belong_committee:str=Form(...),
                          level:int=Form(...),
                          get_time:date=Form(...),
                          file: UploadFile = File(...)):
    try:
        filename = str(register_major_id)+file.filename
        photos_path = os.environ.get("PHOTO_PATH") + filename
        res = await file.read()
        with open(photos_path, "wb") as f:
            f.write(res)
        certificate_service.add_certificate(register_major_id,belong_committee,level,filename,get_time)
    except Exception as e:
        logger.error(e)
        return JSONResponse(content=str(e), status_code=status.HTTP_417_EXPECTATION_FAILED)
    return JSONResponse(content="上传成功", status_code=status.HTTP_200_OK)

#为该报名信息修改集合证书
@router.put("/{register_major_id}", tags=["cetificate"])
async def update_certificate(
                          register_major_id:int,
                          id:int=Form(...),
                          belong_committee:str=Form(...),
                          level:int=Form(...),
                          get_time:date=Form(...),
                          file: UploadFile = File(...)):
    try:
        filename = str(register_major_id)+file.filename
        photos_path = os.environ.get("PHOTO_PATH") + filename
        res = await file.read()
        with open(photos_path, "wb") as f:
            f.write(res)
        certificate = certificate_service.update_certificate(register_major_id,id,belong_committee,level,filename,get_time)
    except Exception as e:
        logger.error(e)
        return JSONResponse(content=str(e), status_code=status.HTTP_417_EXPECTATION_FAILED)
    return certificate
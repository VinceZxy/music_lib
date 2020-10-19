from fastapi import APIRouter,status
from logger import logger
from major.service import major_service
from fastapi.responses import JSONResponse
from register_major.api.register_major_schema import *
from typing import List
router = APIRouter()

#查询所有专业信息
@router.get("/{level_test_id}", tags=["major"],response_model=List[Major_Base])
async def get_majors(level_test_id:int):
    try:
        re_major =  major_service.get_majors(level_test_id)
    except Exception as e:
        logger.error(e)
        return JSONResponse(content=str(e), status_code=status.HTTP_417_EXPECTATION_FAILED)
    return re_major

#查询所有专业信息
@router.get("/get_major_byid/{major_id}", tags=["major"],response_model=Major_Base)
async def get_major_byid(major_id:int):
    try:
        re_major =  major_service.get_major_byid(major_id)
        if re_major is None:
            return JSONResponse(content=str("没有专业信息"), status_code=status.HTTP_417_EXPECTATION_FAILED)
    except Exception as e:
        logger.error(e)
        return JSONResponse(content=str(e), status_code=status.HTTP_417_EXPECTATION_FAILED)
    return re_major

#添加专业信息
@router.post("/", tags=["major"])
async def add_major(major:Major_Base):
    try:
        re_major =  major_service.add_major(major)
    except Exception as e:
        logger.error(e)
        return JSONResponse(content=str(e), status_code=status.HTTP_417_EXPECTATION_FAILED)
    return re_major

#修改专业信息
@router.put("/", tags=["major"])
async def update_major(major:Major_Base):
    try:
        re_major =  major_service.update_major(major)
    except Exception as e:
        logger.error(e)
        return JSONResponse(content=str(e), status_code=status.HTTP_417_EXPECTATION_FAILED)
    return re_major

#删除专业信息
@router.delete("/{id}", tags=["major"])
async def delete_major(id):
    try:
        major_service.delete_major(id)
    except Exception as e:
        logger.error(e)
        return JSONResponse(content=str(e), status_code=status.HTTP_417_EXPECTATION_FAILED)
    return JSONResponse(content="删除成功", status_code=status.HTTP_200_OK)


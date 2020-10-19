from fastapi import APIRouter, status,Request
from logger import logger
from mechanism.api import mechanism_schema
from mechanism.service import mechanism_service
from common.common import *
router = APIRouter()

#查询机构信息
#机构的id
@router.get("/{mechanism_id}", tags=["mechanism"],response_model=mechanism_schema.Mechanism)
async def get_mechanism(mechanism_id:int):
    try:
        mechanism = mechanism_service.get_mechanism(mechanism_id)
        if mechanism is None:
            return JSONResponse(content=str("没有机构的信息"), status_code=status.HTTP_417_EXPECTATION_FAILED)
    except Exception as e:
        logger.error(e)
        return JSONResponse(content=str(e), status_code=status.HTTP_417_EXPECTATION_FAILED)
    return mechanism
#增加机构
@router.post("/", tags=["mechanism"],response_model=mechanism_schema.Mechanism)
async def add_mechanism(mechanism:mechanism_schema.Mechanism):
    try:
        mechanism = mechanism_service.add_mechanism(mechanism)
    except Exception as e:
        logger.error(e)
        return JSONResponse(content=str(e), status_code=status.HTTP_417_EXPECTATION_FAILED)
    return mechanism

#修改机构
@router.put("/", tags=["mechanism"],response_model=mechanism_schema.Mechanism)
async def update_mechanism(mechanism:mechanism_schema.Mechanism):
    try:
        mechanism = mechanism_service.update_mechanism(mechanism)
    except Exception as e:
        logger.error(e)
        return JSONResponse(content=str(e), status_code=status.HTTP_417_EXPECTATION_FAILED)
    return mechanism

#删除机构
@router.delete("/{id}", tags=["mechanism"])
async def delete_mechanism(id:int):
    try:
        mechanism = mechanism_service.delete_mechanism(id)
    except Exception as e:
        logger.error(e)
        return JSONResponse(content=str(e), status_code=status.HTTP_417_EXPECTATION_FAILED)
    return JSONResponse(content="删除成功", status_code=status.HTTP_200_OK)

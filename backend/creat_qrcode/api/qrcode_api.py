from fastapi import APIRouter, status
from logger import logger
from fastapi.responses import JSONResponse
from creat_qrcode.service import qrcode_service
from creat_qrcode.api.qrcode_schema import *
router = APIRouter()

#生成二维码
@router.post("/",tags=["qrcode"],response_model=QrCode)
async def creat_qrcode(content:str,path:str,mechanism_id:int,level_test_id:int):
    try:
       dataqrcode = qrcode_service.creat_qrcode(content,path,mechanism_id,level_test_id)
       if dataqrcode is None:
           return JSONResponse(content="同一机构不能添加相同水平考试", status_code=status.HTTP_417_EXPECTATION_FAILED)
    except Exception as e:
        logger.error(e)
        return JSONResponse(content=str(e), status_code=status.HTTP_417_EXPECTATION_FAILED)
    return dataqrcode

#获取二维码路径
@router.get("/",tags=["qrcode"],response_model=QrCode)
async def get_qrcode(mechanism_id:int,level_test_id:int):
    try:
        qrcode = qrcode_service.get_qrcode(mechanism_id,level_test_id)
        if qrcode is None:
            return JSONResponse(content="未查找到二维码", status_code=status.HTTP_417_EXPECTATION_FAILED)
    except Exception as e:
        logger.error(e)
        return JSONResponse(content=str(e), status_code=status.HTTP_417_EXPECTATION_FAILED)
    return qrcode


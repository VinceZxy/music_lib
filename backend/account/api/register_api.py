from fastapi import APIRouter, status,Form
from logger import logger
from fastapi.responses import JSONResponse
from sqlalchemy.exc import IntegrityError
from config.redis.redis_base_client import redis_cli
from account.service import register_service
from account.api.account_schema import *
from common.common import *

router = APIRouter()

#注册
@router.post("/register",tags=["account"])
async def register(telephone:str,password:str,email:str,email_code:str):
    # 判断传入手机格式是否正确,不正确返回True
    if telephone_verification(telephone):
        return JSONResponse(content="手机号格式错误", status_code=status.HTTP_400_BAD_REQUEST)
    if email_verification(email):
        return JSONResponse(content="邮箱格式错误", status_code=status.HTTP_400_BAD_REQUEST)
    try:
        # 对验证码判断
        flg = redis_verification(telephone,email_code)
        if flg is None:
            return JSONResponse(content="验证码失效", status_code=status.HTTP_417_EXPECTATION_FAILED)
        if flg:
            return JSONResponse(content="验证码错误", status_code=status.HTTP_417_EXPECTATION_FAILED)
        #查询手机号是否被注册过了
        query_account = register_service.get_account(telephone)
        if query_account is not None:
            return JSONResponse(content="手机号已存在", status_code=status.HTTP_417_EXPECTATION_FAILED)
        # 进行注册
        account = register_service.register(telephone,password,email)
    except Exception as e:
        logger.error(e)
    return "注册成功"

# 重置密码
@router.put("/resetpassd",tags=["account"])
async def reset_passd(telephone:str,resetpassd_email_code:str):
    # 对验证码判断
    flg = redis_verification(telephone, resetpassd_email_code)
    if flg is None:
        return JSONResponse(content="验证码失效", status_code=status.HTTP_417_EXPECTATION_FAILED)
    if flg:
        return JSONResponse(content="验证码错误", status_code=status.HTTP_417_EXPECTATION_FAILED)
    #对该用户密码重置
    register_service.reset_passd(telephone)
    return JSONResponse(content="密码重置成功", status_code=status.HTTP_201_CREATED)

# 修改密码
@router.put("/updatapassd",tags=["account"])
async def updata_passd(id:int,old_password:str,new_password:str):
    #对该用户密码修改
    mes = register_service.updata_passd(id,old_password,new_password)
    return JSONResponse(content=mes, status_code=status.HTTP_201_CREATED)

from fastapi import APIRouter, status
from logger import logger
from fastapi.responses import JSONResponse
from account.service import account_role_service
router = APIRouter()

# 添加角色
@router.post("/", tags=["account_role"])
async def add_role(role_name:str):
    try:
        account_role_service.add_role(role_name)
    except Exception as e:
        logger.error(e)
        return JSONResponse(content=str(e), status_code=status.HTTP_417_EXPECTATION_FAILED)
    return JSONResponse(content="添加角色成功", status_code=status.HTTP_200_OK)
# 查询角色
@router.get("/", tags=["account_role"])
async def find_role():
    try:
        role = account_role_service.find_role()
    except Exception as e:
        logger.error(e)
        return JSONResponse(content=str(e), status_code=status.HTTP_417_EXPECTATION_FAILED)
    return role

@router.get("/", tags=["account_role"])
async def find_account():
    try:
        account = account_role_service.find_account()
    except Exception as e:
        logger.error(e)
        return JSONResponse(content=str(e), status_code=status.HTTP_417_EXPECTATION_FAILED)
    return account

# 关联用户角色
@router.post("/{account_id}/{role_id}", tags=["account_role"])
async def relation_account_role(account_id:int,role_id:int):
    try:
        account_role_service.relation_account_role(account_id,role_id)
    except Exception as e:
        logger.error(e)
        return JSONResponse(content=str(e), status_code=status.HTTP_417_EXPECTATION_FAILED)
    return JSONResponse(content=str("关联成功"), status_code=status.HTTP_200_OK)
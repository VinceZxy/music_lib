from fastapi import APIRouter, status
from logger import logger
from fastapi.responses import JSONResponse
from level_test.service import leveltest_service
from level_test.api.leveltest_schema import *
from typing import List
router = APIRouter()


#查询水平考试信息
@router.get("/{leveltest_id}",tags=["level_test"],response_model=LevelTest)
async def get_level_test(leveltest_id:int):
    try:
        leveltest_info = leveltest_service.get_level_test(leveltest_id)
        if leveltest_info is None:
            return JSONResponse(content=str("没有水平考试的信息"), status_code=status.HTTP_417_EXPECTATION_FAILED)
    except Exception as e:
        logger.error(e)
        return JSONResponse(content=str(e), status_code=status.HTTP_417_EXPECTATION_FAILED)
    return leveltest_info

#查询所有水平考试信息
@router.get("/",tags=["level_test"],response_model=List[LevelTest])
async def get_level_test():
    try:
        leveltest_info = leveltest_service.get_all_level_test()
    except Exception as e:
        logger.error(e)
        return JSONResponse(content=str(e), status_code=status.HTTP_417_EXPECTATION_FAILED)
    return leveltest_info

#增加水平考试信息
@router.post("/",tags=["level_test"],response_model=LevelTest)
async def add_level_test(leveltest:LevelTest):
    try:
        leveltest_info = leveltest_service.add_level_test(leveltest)
    except Exception as e:
        logger.error(e)
        return JSONResponse(content=str(e), status_code=status.HTTP_417_EXPECTATION_FAILED)
    return leveltest_info


#修改水平考试信息
@router.put("/",tags=["level_test"],response_model=LevelTest)
async def update_level_test(param_leveltest:LevelTest):
    try:
        leveltest_info = leveltest_service.update_level_test(param_leveltest)
    except Exception as e:
        logger.error(e)
        return JSONResponse(content=str(e), status_code=status.HTTP_417_EXPECTATION_FAILED)
    return leveltest_info


#删除水平考试信息
@router.delete("/{id}",tags=["level_test"])
async def delete_level_test(id:int):
    try:
        leveltest_service.delete_level_test(id)
    except Exception as e:
        logger.error(e)
        return JSONResponse(content=str(e), status_code=status.HTTP_417_EXPECTATION_FAILED)
    return JSONResponse(content="删除成功", status_code=status.HTTP_200_OK)


#根据机构id查询水平考试信息
@router.get("/mechanism/{mechanism_id}",tags=["level_test"])
async def get_leveltest_by_mid(mechanism_id:int):
    try:
       leveltests = leveltest_service.get_leveltest_by_mid(mechanism_id)
    except Exception as e:
        logger.error(e)
        return JSONResponse(content=str(e), status_code=status.HTTP_417_EXPECTATION_FAILED)
    return leveltests
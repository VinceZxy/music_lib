from fastapi import APIRouter, File, UploadFile, Form
from logger import logger
from common.common import *
from register_major.service import register_major_service
from register_major.api.register_major_schema import *
from typing import List
from set_path_config import *
import os

router = APIRouter()


# 查询某个学员的所有报名专业信息
# 学员的id
@router.get("/{student_id}", tags=["register_major"], response_model=List[Register_Major])
async def get_register_majors(student_id: int):
    try:
        re_major = register_major_service.get_register_majors(student_id)
    except Exception as e:
        logger.error(e)
        return JSONResponse(content=str(e), status_code=status.HTTP_417_EXPECTATION_FAILED)
    return re_major


# 查询某个学员的具体一个报名专业信息
# 报名专业的id
@router.get("/major/{register_major_id}", tags=["register_major"], response_model=Register_Major)
async def get_register_major(register_major_id: int):
    try:
        re_major = register_major_service.get_register_major(register_major_id)
        if re_major is None:
            return JSONResponse(content=str("没有该专业信息"), status_code=status.HTTP_417_EXPECTATION_FAILED)
    except Exception as e:
        logger.error(e)
        return JSONResponse(content=str(e), status_code=status.HTTP_417_EXPECTATION_FAILED)
    return re_major

# 查询所有正在审核的报考信息列表
@router.get("/", tags=["register_major"], response_model=List[Register_Major])
async def get_noexamine_register_major():
    try:
        re_major = register_major_service.get_noexamine_register_major()
    except Exception as e:
        logger.error(e)
        return JSONResponse(content=str(e), status_code=status.HTTP_417_EXPECTATION_FAILED)
    return re_major

# 审核通过
@router.put("/examine_success/{register_major_id}", tags=["register_major"])
async def examine_success(register_major_id:int):
    try:
        re_major = register_major_service.examine_success(register_major_id)
    except Exception as e:
        logger.error(e)
        return JSONResponse(content=str(e), status_code=status.HTTP_417_EXPECTATION_FAILED)
    return re_major

# 审核失败
@router.put("/examine_fail/{register_major_id}", tags=["register_major"])
async def examine_fail(register_major_id:int):
    try:
        re_major = register_major_service.examine_fail(register_major_id)
    except Exception as e:
        logger.error(e)
        return JSONResponse(content=str(e), status_code=status.HTTP_417_EXPECTATION_FAILED)
    return re_major


# 添加报名专业数据  ,response_model=Register_Major_Base
@router.post("/", tags=["register_major"])
async def add_register_major(register_major: Add_Register_Major):
    try:
        re_major = register_major_service.add_register_major(register_major)
    except Exception as e:
        logger.error(e)
        return JSONResponse(content=str(e), status_code=status.HTTP_417_EXPECTATION_FAILED)
    return re_major

@router.put("/update_register_major", tags=["register_major"])
async def update_register_major(register_major:Updata_Register_Major):
    try:
        register_major_service.update_register_major(register_major)
    except Exception as e:
        logger.error(e)
        return JSONResponse(content=str(e), status_code=status.HTTP_417_EXPECTATION_FAILED)
    return JSONResponse(content="修改成功", status_code=status.HTTP_200_OK)

# 申请审核
# 学员的id
@router.put("/", tags=["register_major"])
async def application_review(register_major_id: int):
    try:
        register_major_service.application_review(register_major_id)
    except Exception as e:
        logger.error(e)
        return JSONResponse(content=str(e), status_code=status.HTTP_417_EXPECTATION_FAILED)
    return JSONResponse(content="申请审核成功", status_code=status.HTTP_200_OK)



# 导出excel报表
# 学员的id
@router.post("/report_generation", tags=["register_major"])
async def report_generation(register_major_id:int):
    try:
        filename_path = register_major_service.report_generation(register_major_id)
    except Exception as e:
        logger.error(e)
        return JSONResponse(content=str(e), status_code=status.HTTP_417_EXPECTATION_FAILED)
    return JSONResponse(content=filename_path, status_code=status.HTTP_200_OK)


# 上传视频
# 考级所需要的视频，曲目id，报考信息id
@router.post("/upload_video", tags=["register_major"])
async def upload_video(track_ids: List[int] = Form(...), register_ids: List[int] = Form(...),file: List[UploadFile] = File(...)):
    try:
        file_name_list = []
        register_id = register_ids[0]
        for file_v in file:
            file_name_list.append(file_v.filename)
            photos_path = os.environ.get("VIDEO_PATH") +file_v.filename
            res = await file_v.read()
            with open(photos_path, "wb") as f:
                f.write(res)
        register_major_service.upload_video(file_name_list, track_ids, register_ids,register_id)
    except Exception as e:
        logger.error(e)
        return JSONResponse(content=str(e), status_code=status.HTTP_417_EXPECTATION_FAILED)
    return JSONResponse(content="上传成功", status_code=status.HTTP_200_OK)

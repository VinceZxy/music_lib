from fastapi import APIRouter, status
from logger import logger
from fastapi.responses import JSONResponse
from config.redis.redis_base_client import redis_cli
from util.email_util import *
from set_path_config import *
from common.common import *
from account.service import register_service
import random

router = APIRouter()

#注册
@router.post("/",tags=["send_email"])
async def send_email(telephone:str,email_mess:str):
    # 判断传入手机格式是否正确,不正确返回True
    if telephone_verification(telephone):
        return JSONResponse(content="手机号格式错误", status_code=status.HTTP_400_BAD_REQUEST)
    if email_verification(email_mess):
        return JSONResponse(content="邮箱格式错误", status_code=status.HTTP_400_BAD_REQUEST)
    #查询账号
    account = register_service.get_account(telephone)
    if account is not None:
        # 用户是重置密码发送邮件，需判断账号和邮箱是否一致
        if account.email != email_mess:
            return JSONResponse(content="您的邮箱与注册手机号绑定邮箱不一致，无法重置密码", status_code=status.HTTP_417_EXPECTATION_FAILED)
    #用户是注册发送邮件
    try:
        email = MailManager(from_addr= os.environ.get("EMAIL_ADDR"),
                            password=os.environ.get("EMAIL_PASSWORD"),
                            to_addr=email_mess,
                            name="orange",
                            type="html")
        context = ""
        for i in range(4):
            ch = chr(random.randrange(ord('0'), ord('9') + 1))
            context += ch
        email.SendMail("<p>您的验证码是:"+context+"</p>")
        redis_cli.setex(telephone, 6000, context)
    except Exception as e:
        logger.error(e)
        return JSONResponse(content=str(e), status_code=status.HTTP_417_EXPECTATION_FAILED)
    return JSONResponse(content="验证码发送成功", status_code=status.HTTP_200_OK)
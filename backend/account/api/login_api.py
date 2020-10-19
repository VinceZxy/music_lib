from fastapi import APIRouter, status,Request,Form
from logger import logger
from fastapi.responses import JSONResponse
from account.service import login_service
from config.redis.redis_base_client import redis_cli
from common.common import telephone_verification
from models.model import Account
from util.jwt_util import create_token
import json
router = APIRouter()


# 登录
@router.post("/login", tags=["account"])
async def login(req:Request,telephone: str, password: str, verification_code: str):

    #判断传入手机格式是否正确,不正确返回True
    if telephone_verification(telephone):
        return JSONResponse(content="手机号格式错误", status_code=status.HTTP_400_BAD_REQUEST)
    # 判断错误次数是否超过限制，如果超过限制，则返回
    # redis记录： "access_nums_请求的ip": "次数"
    # 用户的ip地址
    ip = req.get("client")[0]
    # ip = "192"  测试帐户在其它地方登录功能
    try:
        # 从redis中获取image_code
        image_code = redis_cli.get(ip+"verify_code")
        if image_code is None:
            # 表示图片验证码没有或者过期
            return JSONResponse(content="验证码失效", status_code=status.HTTP_417_EXPECTATION_FAILED)

        if image_code.lower() != verification_code.lower():
            # 表示用户填写错误
            return JSONResponse(content="验证码错误", status_code=status.HTTP_417_EXPECTATION_FAILED)

        # 使用完删除
        redis_cli.delete(ip+"verify_code")

        access_nums = redis_cli.get("access_num_%s" % ip)

        if access_nums is not None and int(access_nums) >= 5:
            return JSONResponse(content="登录次数过多，请稍后再试", status_code=status.HTTP_417_EXPECTATION_FAILED)
        # 登录
        account = login_service.get_account(telephone, password, ip)
        if account is None:
            return JSONResponse(content="用户没有找到或者密码不正确", status_code=status.HTTP_417_EXPECTATION_FAILED)
        account_temp = Account.convert2json(account)
        person_json = json.dumps(account_temp)
        #生成token
        token = create_token(person_json,1800) #token过期时间为30分钟
        redis_cli.setex(ip, 1800, token.get("access_token"))#当前用如果有在其它地方登录时，它将会把token对应的存储值更换。
    except Exception as e:
        logger.error(e)
        return JSONResponse(content=str("用户没有找到或者密码不正确"), status_code=status.HTTP_417_EXPECTATION_FAILED)
    return {"token":token,"user":account}

# 注销
@router.post("/logout", tags=["account"])
async def logout(req:Request):
    ip = req.get("client")[0]
    redis_cli.delete(str(ip))
    return JSONResponse(content="注销成功", status_code=status.HTTP_200_OK)



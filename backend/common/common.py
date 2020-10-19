from config.redis.redis_base_client import redis_cli
from fastapi.responses import JSONResponse
from fastapi import status
import re


#验证手机号格式是否正确
def telephone_verification(telephone):
    if not re.match(r"1[34578]\d{9}", telephone):
        return True
#验证邮箱格式是否正确
def email_verification(email):
    if not re.match(r"^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$", email):
        return True

#对redis的内容验证
def redis_verification(redis_key,param_code):
    # 验证码验证
    # 从redis中取出验证码
    redis_val = redis_cli.get(redis_key)
    # 判断验证码是否过期
    if redis_val is None:
        return None

    # 判断用户填写验证码的正确性
    if redis_val != param_code:
        return True

    # 删除redis中的验证码，防止重复使用校验
    redis_cli.delete(redis_key)
    return False

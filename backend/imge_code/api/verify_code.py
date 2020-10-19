from fastapi import APIRouter, status,Request
from logger import logger
from fastapi.responses import JSONResponse,Response
from config.redis.redis_base_client import redis_cli
from captcha.image import ImageCaptcha
from io import BytesIO
import random
import string


router = APIRouter()

@router.get("/",tags=["imagecode"])
def get_image_code(req:Request):
    """
    获取图片验证码
    : params image_code_id:  图片验证码编号
    :return:  正常:验证码图片  异常：返回json
    """
    # 业务逻辑处理
    # 生成验证码图片
    # 名字，真实文本， 图片数据
    characters = string.digits + string.ascii_lowercase
    width, height, n_len, n_class = 170, 80, 4, len(characters)
    generator = ImageCaptcha(width=width, height=height)
    random_str = ''.join([random.choice(characters) for j in range(4)])
    img = generator.create_captcha_image(random_str, (0, 0, 153), (255, 255, 255))
    # 将验证码真实值与编号保存到redis中, 设置有效期
    # redis：  字符串   列表  哈希   set
    # "key": xxx
    # 使用哈希维护有效期的时候只能整体设置
    # "image_codes": {"id1":"abc", "":"", "":""} 哈希  hset("image_codes", "id1", "abc")  hget("image_codes", "id1")
    # 单条维护记录，选用字符串
    # "image_code_编号1": "真实值"
    # "image_code_编号2": "真实值"

    # redis_store.set("image_code_%s" % image_code_id, text)
    # redis_store.expire("image_code_%s" % image_code_id, constants.IMAGE_CODE_REDIS_EXPIRES)
    #                   记录名字                          有效期                              记录值
    try:
        ip = req.get("client")[0]
        redis_cli.setex(ip+"verify_code",600, random_str)
    except Exception as e:
        # 记录日志
        logger.error(e)
        # return jsonify(errno=RET.DBERR,  errmsg="save image code id failed")
        return JSONResponse(content="保存验证码失败", status_code=status.HTTP_406_NOT_ACCEPTABLE)
    # 返回图片
    out = BytesIO()
    img.save(out, format="JPEG")
    resp = Response(out.getvalue())
    resp.headers["Content-Type"] = "image/jpg"
    return resp


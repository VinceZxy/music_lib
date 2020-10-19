# coding=UTF-8
from fastapi import status,FastAPI,Response
from starlette.middleware.cors import CORSMiddleware
from starlette.requests import Request
from starlette.responses import JSONResponse
from starlette.staticfiles import StaticFiles
from starlette.templating import Jinja2Templates
from college.api import college_api
from creat_qrcode.api import qrcode_api
from level_test.api import leveltest_api
from account.api import login_api
from account.api import register_api
from imge_code.api import verify_code
from send_email import send_email
from student.api import student_api
from register_major.api import register_major_api
from major.api import major_api
from mechanism.api import mechanism_api
from certificate.api import certificate_api
from account.api import account_role
from util.jwt_util import authorized_token
from config.redis.redis_base_client import redis_cli
from pydantic.error_wrappers import ValidationError
import jwt
import os
import time

app = FastAPI()

# async def get_token_header(x_token: str = Header(...)):
#     if x_token != "fake-super-secret-token":
#         raise HTTPException(status_code=400, detail="X-Token header invalid")

app.mount("/static", StaticFiles(directory="static"), name="static")  # 挂载静态文件，指定目录


# 注册 APIRouter  路由
app.include_router(college_api.router,prefix="/v1/college")
app.include_router(qrcode_api.router,prefix="/v1/qrcode")
app.include_router(leveltest_api.router,prefix="/v1/level_test")
app.include_router(login_api.router,prefix="/v1/account")
app.include_router(register_api.router,prefix="/v1/account")
app.include_router(account_role.router,prefix="/v1/account_role")
app.include_router(verify_code.router,prefix="/v1/imagecode")
app.include_router(send_email.router,prefix="/v1/send_email")
app.include_router(student_api.router,prefix="/v1/student")
app.include_router(register_major_api.router,prefix="/v1/register_major")
app.include_router(major_api.router,prefix="/v1/major")
app.include_router(mechanism_api.router,prefix="/v1/mechanism")
app.include_router(certificate_api.router,prefix="/v1/certificate")

@app.middleware("http")
async def process_authorization(request: Request,call_next):
    """
               在这个函数里统一对访问做权限token校验。
               1、如果是用户注册、登陆，那么不做token校验，由路径操作函数具体验证
               2、如果是其他操作，则需要从header或者cookie中取出token信息，解析出内容
                  然后对用户身份进行验证，如果用户不存在则直接返回
                  如果用户存在则将用户信息附加到request中，这样在后续的路径操作函数中可以直接使用。
           """
    path_list = [
        "/v1/account/login",
        "/v1/account/register",
        "/v1/imagecode/",
        "/v1/imagecode",
        "/v1/send_email/",
        "/docs",
        "/openapi.json",
        "/post.html",
        "/favicon.ico"
    ]
    if str(request.url.path) in path_list:
        print(request.url.path)
    else:
        #这里对未登录就可以访问的接口实行放行
        if "/v1/college/" in str(request.url.path)\
                or "/v1/level_test/" in str(request.url.path)\
                or "/v1/qrcode/"in str(request.url.path)\
                or "/v1/mechanism/" in str(request.url.path)\
                or "/v1/static/" in str(request.url.path)\
                or "/v1/account_role/" in str(request.url.path):
            print(request.url.path)
        else:
            ip = request.get("client")[0]
            token = request.headers.get("Authorization")
            redis_token = redis_cli.get(ip)
            if redis_token is None:
                return JSONResponse(content="未登录或token过期，请重新登录", status_code=status.HTTP_401_UNAUTHORIZED)
            if token is not None:
                try:
                  account = authorized_token(token)
                  request.state.account = account
                except jwt.PyJWTError as e:
                    return JSONResponse(content="token无效", status_code=status.HTTP_401_UNAUTHORIZED)
                if redis_token is not None and redis_token!=token: #对用户的token与redis中的token进行对比，如果不一致。我们就有对应的提示，您的帐户在其它地方登录了。
                    return JSONResponse(content="您的帐户在其它地方登录了", status_code=status.HTTP_401_UNAUTHORIZED)
            else:
                return JSONResponse(content="请登录", status_code=status.HTTP_401_UNAUTHORIZED)
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response

origins = [
    # "http://192.168.0.115:3000",
    # "http://192.168.0.106:3000",
    # "http://localhost:3000",
    # "http://localhost.wisdomx.net",
    # "http://localhost",
    # "http://localhost:8080",
]


@app.exception_handler(ValidationError)
async def validation_exception_handler(request, exc):
    print(request)
    return JSONResponse(content=str("参数有误"), status_code=status.HTTP_417_EXPECTATION_FAILED)

# 解决跨域问题
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host=os.environ.get("IP"), port=8000,debug=True)



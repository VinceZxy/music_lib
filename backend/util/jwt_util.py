from datetime import timedelta, datetime
import time
import jwt


SECRET_KEY = "sdifhgsiasfjaofhslio" # JWY签名所使用的密钥，是私密的，只在服务端保存
ALGORITHM = "HS256" # 加密算法，我这里使用的是HS256

def create_token(telephone,expire_time):

        access_token_expires = timedelta(seconds=expire_time)
        expire = datetime.utcnow() + access_token_expires
        payload = {
                    "iat": datetime.utcnow(),
                    "sub": telephone,
                    "exp": expire
                     }
        # 生成Token,返回给前端
        access_token = jwt.encode(payload, SECRET_KEY ,ALGORITHM)
        return {"access_token": access_token, "token_type": "Bearer"}

def authorized_token(token):
        payload = jwt.decode(token, SECRET_KEY, ALGORITHM)
        expire: datetime = payload.get("exp")
        if time.time()>expire:
            return None
        telephone: str = payload.get("sub")
        return telephone




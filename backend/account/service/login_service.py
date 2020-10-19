from account.dao import register_dao
from config.redis.redis_base_client import redis_cli

def get_account(telephone,password,ip):
    account = register_dao.get_account(telephone)
    if account is None or not account.check_password(account.password,password):
        # 如果验证失败，记录错误次数，返回信息
        # redis的incr可以对字符串类型的数字数据进行加一操作，如果数据一开始不存在，则会初始化为1
        redis_cli.incr("access_num_%s" % ip)
        redis_cli.expire("access_num_%s" % ip, 600) #时间设置为10分钟，如果登录失败超过5次需要等待10分钟
        return None
    else:
        return account
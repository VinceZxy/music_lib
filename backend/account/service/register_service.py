from account.dao import register_dao

def register(telephone,password,email):
    account = register_dao.register(telephone,password,email)
    return account
def get_account(telephone):
    account = register_dao.get_account(telephone)
    return account

def reset_passd(telephone):
    register_dao.reset_passd(telephone)

def updata_passd(id,old_password,new_password):
    account = register_dao.get_account_byid(id)
    if account is not None:
        if account.password == old_password:
            register_dao.updata_passd(id,new_password)
            return "密码修改成功"
        else:
            return "旧密码不正确"

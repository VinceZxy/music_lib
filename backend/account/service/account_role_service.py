from account.dao import account_role_dao
def add_role(role_name):
    account_role_dao.add_role(role_name)
def find_role():
    role = account_role_dao.find_role()
    return role
def find_account():
    account = account_role_dao.find_account()
    return account

def relation_account_role(account_id,role_id):
    account_role_dao.relation_account_role(account_id,role_id)

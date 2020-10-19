from level_test.dao import leveltest_dao

def get_level_test(leveltest_id):
    leveltest_info = leveltest_dao.get_level_test(leveltest_id)
    return leveltest_info
def get_all_level_test():
    leveltest_info = leveltest_dao.get_all_level_test()
    return leveltest_info
def add_level_test(leveltest):
    leveltest_info = leveltest_dao.add_level_test(leveltest)
    return leveltest_info
def update_level_test(param_leveltest):
    leveltest_info = leveltest_dao.update_level_test(param_leveltest)
    return leveltest_info
def delete_level_test(id):
    leveltest_dao.delete_level_test(id)
def get_leveltest_by_mid(mechanism_id):
    leveltests = leveltest_dao.get_leveltest_by_mid(mechanism_id)
    return leveltests


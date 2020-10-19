from util.qrcode_utils import creat_qrcode_util
from creat_qrcode.dao import qrcode_dao
from set_path_config import *
import os
def creat_qrcode(content,path,mechanism_id,level_test_id):
    str_path = os.environ.get("QRCODE_PATH") + path
    is_same = qrcode_dao.query_qrcode(mechanism_id,level_test_id)
    if len(is_same)==0:
        # 创建二维码
        content+="/"+str(mechanism_id)+"/"+str(level_test_id)
        creat_qrcode_util(content, str_path)
        #将数据填入机构水平联合表中
        dataqrcode = qrcode_dao.creat_qrcode(mechanism_id,level_test_id,path)
        return dataqrcode
    return None

def get_qrcode(mechanism_id,level_test_id):
    qrcode = qrcode_dao.get_qrcode(mechanism_id,level_test_id)
    return qrcode
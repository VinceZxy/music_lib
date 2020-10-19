# coding=UTF-8
from model import *
from data_base_client import engine, DbLife
Base.metadata.create_all(bind=engine)
import qrcode
from dateutil.parser import parse

if __name__ == '__main__':
    with DbLife() as db:
        college = College(college_name = "中国音乐学院",
                college_eng_name = "China Music College",
                address="翠庭大厦",
                telephone="13056126608",
                icon="tubiao.png",
                is_delete=0
                )
        mechanism = Mechanism(
                  id=1,
                  mechanism_name="国音堂001",
                  address = "大白杨中段一号",
                  telephone="13056126008",
                  college_id=1,
                  is_delete=0
                  )
        leveltest = LevelTest(test_name="水平考试",
                  start_time=parse("2020-07-01 12:05:17"),
                  end_time=parse("2020-12-01 12:05:17"),
                  is_delete=0
                  )
        levelmechanism = LevelMechanism(level_test_id=1,
                       mechanism_id=1,
                       qr_code_path="guoyintang001.png"
                       )
        role = Role(role_name="普通用户",
             status=0
             )
        role2 = Role(role_name="管理员",
                    status=0
                    )
        account = Account(telephone="13056126608",
                password="e10adc3949ba59abbe56e057f20f883e",
                email="wx383@qq.com",
                status=0
                )
        account_role = Account_Role(
            id = 1,
            account_id = 1,
            role_id = 2,
            status = 0
        )
        tdict1 = T_Dict(id=1,describe="身份证")
        tdict2 = T_Dict(id=2,describe="省港澳台护照")
        tdict3 = T_Dict(id=3,describe="户口本")

        entermajor = Enter_Major(
                    id=1,
                    major_name="钢琴",
                    level="7",
                    level_test_id=1,
                    is_delete=0
                )

        db.add(college)
        db.commit()
        db.refresh(college)
        db.add(mechanism)
        db.commit()
        db.refresh(mechanism)
        db.add(leveltest)
        db.commit()
        db.refresh(leveltest)
        db.add(levelmechanism)
        db.commit()
        db.refresh(levelmechanism)
        db.add(role)
        db.commit()
        db.refresh(role)
        db.add(role2)
        db.commit()
        db.refresh(role2)
        db.add(account)
        db.commit()
        db.refresh(account)
        db.add(account_role)
        db.commit()
        db.refresh(account_role)
        db.add(tdict1)
        db.commit()
        db.refresh(tdict1)
        db.add(tdict2)
        db.commit()
        db.refresh(tdict2)
        db.add(tdict3)
        db.commit()
        db.refresh(tdict3)
        db.add(entermajor)
        db.commit()
        db.refresh(entermajor)

    # 生成二维码实例，设置大小和边框
    qr = qrcode.QRCode(box_size=10, border=2)
    # 添加二维码的显示信息
    qr.add_data("http://localhost:3000/#/startSignPage/1/1")
    qr.make(fit=True)
    img = qr.make_image()
    # 保存二维码
    img.save("guoyintang001.png")

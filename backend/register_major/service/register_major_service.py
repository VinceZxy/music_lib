from register_major.dao import register_major_dao
from register_major.api.register_major_schema import *

import xlsxwriter
def get_register_majors(student_id):
   info = register_major_dao.get_register_majors(student_id)
   return info

def get_register_major(register_major_id):
   info = register_major_dao.get_register_major(register_major_id)
   return info
def add_register_major(register_major):
   re_major = register_major_dao.add_register_major(register_major)
   return re_major
def get_noexamine_register_major():
   re_major = register_major_dao.get_noexamine_register_major()
   return re_major

def examine_success(register_major_id):
   re_major = register_major_dao.examine_success(register_major_id)
   return re_major
def examine_fail(register_major_id):
   re_major = register_major_dao.examine_fail(register_major_id)
   return re_major

def update_register_major(register_major):
   register_major_dao.update_register_major(register_major)

def application_review(register_major_id):
   register_major_dao.application_review(register_major_id)

def report_generation(register_major_id:int):
   register_major = register_major_dao.get_register_major(register_major_id)
   workbook = xlsxwriter.Workbook("static/"+str(register_major_id)+"报考信息.xls")
   sheet1 = workbook.add_worksheet('报考信息表')
   title = ['专业名称', '报考级别', '考试的方式', '指导老师姓名', '指导老师电话', '状态', '曲目1', '曲目2', '曲目3', '曲目4']
   row = 0
   # if len(register_major.certificate)!=0:
   #    for k,v in enumerate(register_major.certificate):
   #       title.append("已获证书"+k)
   for col,v in enumerate(title):
       sheet1.write(row,col,v)
   row += 1
   sheet1.write(row,0,register_major.enter_major.major_name)
   sheet1.write(row,1,register_major.enter_major.level)
   sheet1.write(row,2,register_major.mode)
   sheet1.write(row,3, register_major.instructor)
   sheet1.write(row,4, register_major.instructor_phtone)
   # 0：未申请审核1:审核中，2:审核通过：3：未通过审核    register_major.status
   if register_major.status == 0:
      sheet1.write(row,5,"未申请审核")
   elif register_major.status == 1:
      sheet1.write(row,5,"审核中")
   elif register_major.status == 2:
      sheet1.write(row,5,"审核通过")
   elif register_major.status == 3:
      sheet1.write(row, 5, "未通过审核")
   sheet1.write(row,6, register_major.track1.track_name)
   sheet1.write(row,7, register_major.track2.track_name)
   if register_major.track3 is not None:
      sheet1.write(row,8, register_major.track3.track_name)
   if register_major.track4 is not None:
      sheet1.write(row,9, register_major.track4.track_name)
   workbook.close()
   return workbook.filename
def upload_video(file_name_list,track_ids,register_ids,register_id):
      register_major_dao.upload_video(file_name_list,track_ids,register_ids,register_id)

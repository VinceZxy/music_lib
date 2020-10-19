from email.mime.text import MIMEText
from email.header import Header
from email.utils import parseaddr, formataddr
from smtplib import SMTP_SSL


class MailManager(object):
    smtp_server = 'smtp.qq.com'

    def __init__(self, from_addr, password, to_addr, type,name='报名'):
        '''
        :param from_addr: 发送者
        :param password: 授权码
        :param to_addr: 接受者
        :param type: 发送类型，html，plain
        :param name: 邮件标题
        '''
        self.password = password
        self.from_addr = from_addr
        self.to_addr = to_addr
        self.name = name
        self.type=type

    @staticmethod
    def _format_addr(s):
        # 格式化email的头部信息
        name, addr = parseaddr(s)
        return formataddr((Header(name, 'utf-8').encode(), addr))

    def newMail(self, content):
        # 创建一个MIMEText对象，content邮件正文内容
        msg = MIMEText(content, self.type, 'utf-8')
        msg['From'] = self._format_addr(self.name + '后台系统 <%s>' % self.from_addr)
        msg['To'] = self._format_addr(self.name + '客服 <%s>' % self.to_addr)
        # 邮件标题
        msg['Subject'] = Header(self.name + '系统通知', 'utf-8').encode()
        return msg

    def send(self, msg):
        # 通过ssl方式发送，服务器地址，端口
        server = SMTP_SSL(self.smtp_server, 465)
        # 登录到邮箱
        server.login(self.from_addr, self.password)
        # 发送邮件：发送方，收件方，要发送的消息
        server.sendmail(self.from_addr, [self.to_addr], msg.as_string())
        server.quit()

    def SendMail(self, content):
        try:
            msg = self.newMail(content)
            self.send(msg)
        except Exception as e:
            print(e)


# if __name__ == '__main__':
#     send_email=MailManager(from_addr="wx383@qq.com",
#                       password="jhwppgybnatvbcba",
#                       to_addr="2524952693@qq.com",
#                       name="orange",
#                       type="html")
#     send_email.SendMail('''
#     <p><a href="http://www.baidu.com">这是一个链接</a></p>
#     ''')
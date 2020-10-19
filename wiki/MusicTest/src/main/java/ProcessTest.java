import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import util.Config;
import util.Login;

import java.util.HashMap;
import java.util.Map;

public class ProcessTest {
    private WebDriver driver;
    private Map<String, Object> vars;
    JavascriptExecutor js;
    @Before
    public void setUp() {
        System.setProperty("webdriver.chrome.driver", Config.chromeDriverUrl);
        driver = new ChromeDriver();
        js = (JavascriptExecutor) driver;
        vars = new HashMap<String, Object>();
    }
//    @After
//    public void tearDown() {
//        driver.quit();
//    }
    @Test
    public void process() {
        //登陆
        //打开开始报名页面
        WebDriverWait wait = new WebDriverWait(driver,10);
        driver.get(Config.ip+"startSignPage/1/1");
        //点击开始报名按钮
        driver.findElement(By.id("startSignBtn")).click();
        //注册按钮
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("registerBtn"))).click();
        //账号
        driver.findElement(By.id("phone")).click();
        driver.findElement(By.id("phone")).sendKeys(Config.account);
        //密码
        driver.findElement(By.id("password")).click();
        driver.findElement(By.id("password")).sendKeys(Config.pwd);
        //邮箱
        driver.findElement(By.id("email")).click();
        driver.findElement(By.id("email")).sendKeys("975243378@qq.com");
        //验证码
        driver.findElement(By.id("email_code")).click();
        driver.findElement(By.id("email_code")).sendKeys("4581");
        //注册按钮
        driver.findElement(By.id("okRegisterBtn")).click();
        //账号
        try {
            Thread.sleep(1000);
        }catch (InterruptedException e){
            throw new  RuntimeException(e);
        }
        driver.findElement(By.id("phone")).click();
        driver.findElement(By.id("phone")).sendKeys(Config.account);
        //密码
        driver.findElement(By.id("password")).click();
        driver.findElement(By.id("password")).sendKeys(Config.pwd);
        //验证码
        driver.findElement(By.id("code")).click();
        driver.findElement(By.id("code")).sendKeys("i63m");
        //登录按钮
        driver.findElement(By.id("loginBtn")).click();
        //等待页面加载，新增学员按钮出现，等待时间为10s
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("addStudentBtn"))).click();
        //姓名
        driver.findElement(By.id("studentNameInput")).click();
        driver.findElement(By.id("studentNameInput")).sendKeys("测试学员1");
        //姓名拼音
        driver.findElement(By.id("studentNameLetterInput")).click();
        driver.findElement(By.id("studentNameLetterInput")).sendKeys("ceshixueyuan1");
        //证件类型
        driver.findElement(By.id("typeOfCertificateSelect")).click();
        driver.findElement(By.cssSelector(".MuiListItem-root:nth-child(1)")).click();
        //证件号码
        driver.findElement(By.id("idNumberInput")).click();
        driver.findElement(By.id("idNumberInput")).sendKeys("610327199805184329");
        //性别
        driver.findElement(By.id("sexSelect")).click();
        driver.findElement(By.cssSelector(".MuiListItem-root:nth-child(1)")).click();
        //民族
        driver.findElement(By.id("nationSelect")).click();
        driver.findElement(By.cssSelector(".MuiListItem-root:nth-child(1)")).click();
        //国籍
        driver.findElement(By.id("nationalitySelect")).click();
        driver.findElement(By.cssSelector(".MuiListItem-root:nth-child(1)")).click();
        //生日
        driver.findElement(By.id("birthdayInput")).click();
        driver.findElement(By.id("birthdayInput")).sendKeys("002020-09-01");
        driver.findElement(By.id("studentPhotoFile")).sendKeys(Config.studentPhotoUrl);
        //提交
        driver.findElement(By.id("commitBtn")).click();
        //返回
        driver.findElement(By.id("backListBtn")).click();
        System.out.println("新增学员成功");
        //点击修改按钮
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("updateStuInfoBtn1"))).click();
        //修改姓名
        driver.findElement(By.id("studentNameInput")).click();
        driver.findElement(By.id("studentNameInput")).sendKeys("测试学员");
        //修改姓名拼音
        driver.findElement(By.id("studentNameLetterInput")).click();
        driver.findElement(By.id("studentNameLetterInput")).sendKeys("ceshixueyuan");
        //提交修改
        driver.findElement(By.id("commitBtn")).click();
        System.out.println("修改学员成功");

        //等待页面加载，申请报考按钮出现，等待时间为10s
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("majorBtn1"))).click();
        //新增报考信息按钮
        driver.findElement(By.id("addMajorBtn")).click();

        //专业名称
        driver.findElement(By.id("majorId")).click();
        driver.findElement(By.cssSelector(".MuiListItem-root:nth-child(1)")).click();

        //报考级别
        driver.findElement(By.id("examinationLevel")).click();
        driver.findElement(By.cssSelector(".MuiListItem-root:nth-child(1)")).click();

        //考试方式
        driver.findElement(By.id("examinationType")).click();
        driver.findElement(By.cssSelector(".MuiListItem-root:nth-child(2)")).click();

        //指导老师姓名
        driver.findElement(By.id("teacherName")).click();
        driver.findElement(By.id("teacherName")).sendKeys("刘老师");

        //指导老师电话
        driver.findElement(By.id("teacherPhone")).click();
        driver.findElement(By.id("teacherPhone")).sendKeys("15619783353");
        //曲目1
        driver.findElement(By.id("track_1")).click();
        driver.findElement(By.id("track_1")).sendKeys("练习曲1");
        //曲目2
        driver.findElement(By.id("track_2")).click();
        driver.findElement(By.id("track_2")).sendKeys("练习曲2");
        //曲目3
        driver.findElement(By.id("track_3")).click();
        driver.findElement(By.id("track_3")).sendKeys("练习曲3");
        //出生年月
        driver.findElement(By.id("signTime")).click();
        driver.findElement(By.id("signTime")).sendKeys("002020-09-10");
        //考级委员会
        driver.findElement(By.id("signMeet")).click();
        driver.findElement(By.id("signMeet")).sendKeys("小提琴委员会");
        //获得级别
        driver.findElement(By.id("level")).click();
        driver.findElement(By.cssSelector(".MuiListItem-root:nth-child(1)")).click();
        //证书照片
        driver.findElement(By.id("majorUpload")).sendKeys(Config.certificateImgUrl);
        //提交
        driver.findElement(By.id("updateBtn")).click();
        //返回
        driver.findElement(By.id("rowBackBtn")).click();
        System.out.println("新增报考信息成功");
        //点击修改按钮
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("updateMajorBtn1"))).click();
        //修改指导老师姓名
        driver.findElement(By.id("teacherName")).click();
        driver.findElement(By.id("teacherName")).sendKeys("张老师");
        //提交
        driver.findElement(By.id("updateBtn")).click();
        //返回
        driver.findElement(By.id("rowBackBtn")).click();
        //点击申请审核按钮
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("applyBtn1"))).click();
        //点击确认审核按钮
        driver.findElement(By.id("okBtn")).click();
        //点击注销按钮
        driver.findElement(By.id("loginOutBtn1")).click();
        //账号
        driver.findElement(By.id("phone")).click();
        driver.findElement(By.id("phone")).sendKeys("13056126608");
        //密码
        driver.findElement(By.id("password")).click();
        driver.findElement(By.id("password")).sendKeys("123456");
        //验证码
        driver.findElement(By.id("code")).click();
        driver.findElement(By.id("code")).sendKeys("i63m");
        //登录按钮
        driver.findElement(By.id("loginBtn")).click();
        //通过审核按钮
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("okSignBtn0"))).click();
        //注销按钮
        driver.findElement(By.id("logoutBtn")).click();
        //账号
        driver.findElement(By.id("phone")).click();
        driver.findElement(By.id("phone")).sendKeys(Config.account);
        //密码
        driver.findElement(By.id("password")).click();
        driver.findElement(By.id("password")).sendKeys(Config.pwd);
        //验证码
        driver.findElement(By.id("code")).click();
        driver.findElement(By.id("code")).sendKeys("i63m");
        //登录按钮
        driver.findElement(By.id("loginBtn")).click();
        //等待页面加载，申请报考按钮出现，等待时间为10s
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("majorBtn1"))).click();
        //点击视频考级按钮
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("videoBtn1"))).click();
        //上传视频
        try {
            Thread.sleep(1000);
        }catch (InterruptedException e){
            throw new  RuntimeException(e);
        }
        driver.findElement(By.id("studentVideoFile10")).sendKeys(Config.video1url);
        driver.findElement(By.id("studentVideoFile21")).sendKeys(Config.video2url);
        driver.findElement(By.id("studentVideoFile32")).sendKeys(Config.video3url);
        //阅读上传说明按钮
        driver.findElement(By.id("uploadTextRadio")).click();
        //上传
        driver.findElement(By.id("commitVideoBtn")).click();
        System.out.println("视频上传完毕");
    }
}

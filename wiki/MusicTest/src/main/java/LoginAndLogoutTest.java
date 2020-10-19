// Generated by Selenium IDE

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import util.Config;
import util.Login;

import java.util.HashMap;
import java.util.Map;

//登陆测试
public class LoginAndLogoutTest {
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
    @After
    public void tearDown() {
        driver.quit();
    }
    @Test
    public void loginAndLogout() {
        //登陆
        Login login = new Login();
        login.login(driver);
        //注销
        driver.findElement(By.id("code")).click();
        System.out.println("通过");
    }
}
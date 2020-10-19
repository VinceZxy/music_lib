package util;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class Login {
    public void login(WebDriver driver){
        //打开开始报名页面
        driver.get(Config.ip+"startSignPage/1/1");
        //点击开始报名按钮
        driver.findElement(By.id("startSignBtn")).click();
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
    }
}

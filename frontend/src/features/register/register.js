import React from "react";
import {TextField,Grid, InputAdornment,Button,Typography} from "@material-ui/core";
import {AccountCircle,} from '@material-ui/icons';
import HttpsSharpIcon from '@material-ui/icons/HttpsSharp';
import MailIcon from '@material-ui/icons/Mail';
import md5 from 'js-md5'
import subConn from "../../util/actions/headleSubmit";
import CommonException from "../../util/actions/headleException";

export default class Register extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            phone:'',
            pwd:'',
            email:'',
            emailCode:'',
            m:{target:{id:'phone'}},
            phoneStatus:false,
            pwdStatus:false,
            emailStatus:false,
            emailCodeStatus:false,
            msg:'',

            phoneMsg:'',
            pwdMsg:'',
            emailMsg:'',
            emailCodeMsg:'',
            emailCodeText:''
        }
    }

    phoneChange(e){this.setState({phone:e.target.value, phoneStatus:false,phoneMsg:''})}
    emailChange(e){this.setState({email:e.target.value, emailStatus:false,emailMsg:''})}
    emailCodeChange(e){this.setState({emailCode:e.target.value, emailCodeStatus:false,emailCodeText:''})}
    pwdChange(e){this.setState({pwd:e.target.value, pwdStatus:false,pwdMsg:''})}

    sureRegister(){
        const ph = this.state.phone;
        const em = this.state.email;
        const pone = /^1[3|4|5|7|8][0-9]{9}$/;
        const email = /^\w+@[a-z0-9]+\.[a-z]{2,4}$/

        if(ph.trim() === '' || !pone.test(ph)){this.setState({phoneStatus:true,phoneMsg:'请正确输入手机'})}

        if(!this.state.pwd.trim()) {this.setState({pwdStatus:true,pwdMsg:'请正确输入密码'})} else {
            this.setState({pwd:md5(this.state.pwd)})
        }

        if(em.trim() ==='' || !email.test(em)) {
            this.setState({emailStatus:true,emailMsg:'正确输入邮箱',email:''});

        }

        if(this.state.emailCode.trim()==='') {this.setState({emailCodeStatus:true,emailCodeText:'验证码不能为空'})}
    }
    //注册操作
    register(){
        this.sureRegister();
        const pone = /^1[3|4|5|7|8][0-9]{9}$/;
        const email = /^\w+@[a-z0-9]+\.[a-z]{2,4}$/

        if(this.state.phoneStatus===false&&this.state.phone.trim()!==''&& pone.test(this.state.phone) &&
            this.state.pwdStatus===false&&this.state.pwd.trim()!==''&&
            this.state.emailStatus===false&&this.state.email.trim()!==''&& email.test(this.state.email) &&
            this.state.emailCodeStatus===false&&this.state.emailCode.trim()!=='') {
            subConn('/account/register',
                'post',
                {
                    telephone:this.state.phone,
                    password:this.state.pwd,
                    email:this.state.email,
                    email_code: this.state.emailCode,}
            ).then((res)=>{
                if(res.status===200){
                    this.setState({
                        phone:'',
                        pwd:'',
                        email:'',
                        emailCode:'',
                        phoneStatus:false,
                        pwdStatus:false,
                        emailStatus:false,
                        emailCodeStatus:false,
                        msg:'注册成功，请登录',

                        phoneMsg:'',
                        pwdMsg:'',
                        emailMsg:'',
                        emailCodeMsg:''
                    })

                    this.props.onOpenChange(true)
                    this.props.onMsgChange(this.state.msg)
                    this.props.history.push({pathname:"/logonPage",phone:res.data.telephone})
                }
            }).catch((error)=>{
                CommonException(error,this)
            })
        }else {
            this.setState({
                msg:'请完善注册信息'
            })
        }
    }

    //获取邮箱验证码  /send_email/
    getEmailCode(){
        if(this.state.phone!==''&&this.state.email!==''){
            subConn('/send_email/', 'post',{"telephone": this.state.phone,"email_mess":this.state.email},sessionStorage.getItem('token'))
                .then((res)=>{
                    if(res.status===200){
                        this.setState({emailCodeMsg:'邮箱验证码获取成功'})
                    }
                }).catch(()=>{
                this.setState({emailCodeMsg:'重新获取验证码'})
            })
        }else {
            this.setState({
                emailStatus:true,
                emailMsg:'邮箱不能为空'
            })
        }
    }

    render() {
        return (
            <Grid>
                <Grid item  style={{width:'50vh',backgroundColor:'white',marginTop:'6vh',borderRadius:'2vh',boxShadow:'0 0 1vh #999'}}>
                        <Grid  container justify="center" alignItems="center">
                            已有账号去
                            <Button id="goLoginBtn" color="primary" onClick={()=>{this.props.history.push("/logonPage")}}>
                                登录
                            </Button>
                        </Grid>
                        <Grid container direction="column" justify="center" alignItems="center">
                            <Typography style={{color:'red'}}>{this.state.msg}</Typography>
                            <Grid>
                                <TextField
                                    error={this.state.phoneStatus}
                                    id="phone"
                                    size="small"
                                    value={this.state.phone}
                                    onChange={this.phoneChange.bind(this)}
                                    variant="outlined"
                                    margin="normal"
                                    placeholder="请填写家长的手机"
                                    helperText={this.state.phoneMsg}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment >
                                                <AccountCircle />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid>
                                <TextField
                                    error={this.state.pwdStatus}
                                    id="password"
                                    size="small"
                                    type="password"
                                    placeholder="请输入密码"
                                    // value={this.state.pwd}
                                    helperText={this.state.pwdMsg}
                                    onChange={this.pwdChange.bind(this)}
                                    variant="outlined"
                                    margin="normal"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment>
                                                <HttpsSharpIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid>
                                <TextField
                                    error={this.state.emailStatus}
                                    id="email"
                                    size="small"
                                    variant="outlined"
                                    margin="normal"
                                    placeholder="请填写邮箱地址"
                                    helperText={this.state.emailMsg}
                                    onChange={this.emailChange.bind(this)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment>
                                                <MailIcon />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid>
                                <Button id="getEmailCodeBtn" component="span" color="primary"
                                        onClick={this.getEmailCode.bind(this)}>
                                    {this.state.emailCodeMsg===''?'获取邮箱验证码':this.state.emailCodeMsg}
                                </Button>
                            </Grid>
                            <Grid container direction="column" justify="center" alignItems="center">
                                <Grid>
                                    <TextField
                                        error={this.state.emailCodeStatus}
                                        id="email_code"
                                        size="small"
                                        type="text"
                                        placeholder="邮箱验证码"
                                        value={this.state.email_code}
                                        onChange={this.emailCodeChange.bind(this)}
                                        variant="outlined"
                                        helperText={this.state.emailCodeText}
                                        margin="normal"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment>
                                                    <MailIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                                {/*<Typography style={{color:'red'}}>{this.state.msg}</Typography>*/}
                            </Grid>
                            <Button id="okRegisterBtn" style={{marginBottom:'20px'}} variant="contained" color="primary" onClick={this.register.bind(this)}>
                                注册
                            </Button>
                        </Grid>
                </Grid>
            </Grid>
        )
    }
}





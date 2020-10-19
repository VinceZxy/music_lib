import React from "react";
import {TextField,Grid, InputAdornment,Button,Typography} from "@material-ui/core";
import {AccountCircle,} from '@material-ui/icons';
import HttpsSharpIcon from '@material-ui/icons/HttpsSharp';
import config from '../../../config/config.json'
import MailIcon from '@material-ui/icons/Mail';
import md5 from 'js-md5'
import axios from 'axios'
import subConn from "../../../util/actions/headleSubmit";
import {_local} from "../../../util/actions/headleStorage";
import CommonException from "../../../util/actions/headleException";

export default class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            phone:'',
            pwd:'',
            code:'',
            flg:true,
            m:{target:{id:'phone'}},

            phoneStatus:false,
            pwdStatus:false,
            codeStatus:false,
            imgCode:config.ip+"/imagecode/",
            mag:'',
            imgContent:''
        }
    }

    phoneChange(e){
        this.setState({
            phone:e.target.value,
            phoneStatus:false,
        })
    }
    textChange(e){
       if(e.target.id === 'password'){
            this.setState({
                pwd:md5(e.target.value),
                pwdStatus:false
            })
        }else if(e.target.id === 'code'){
            this.setState({
                code:e.target.value,
                codeStatus:false
            })
        }
    }

    componentDidMount() {

        //缓存中存在机构id 和水平考试id，mechanismId   levelTestId
        if(parseInt(_local.get('mechanismId')) && parseInt(_local.get('levelTestId'))){

            //继续正常 如果已经登录
            if(_local.get('token')){
                //判断角色是否管理员
                if(_local.get('roleId')){
                    this.props.history.push({pathname:"/reviewPage",accountId:_local.get('accountId')})
                }else {
                    this.props.history.push({pathname:"/studentListPage",accountId:_local.get('accountId')})
                }
            }
        }else {
            // 缓存不存在 mechanismId   levelTestId；路由到扫码页面
            this.props.history.push('/')
        }

        // 初始化验证码一次
        this.clickHeader();
    }

    //获取图形验证码
    clickHeader(){
        axios({
            url:config.ip+"/imagecode/",
            header:{'Accept':'image/jpg'},
            method:"get",
            responseType:'arraybuffer'
        }).then((res)=>{
            // 转换字符格式
            let base64 = new Buffer(res.data,'binary').toString('base64');
            this.setState({
                imgContent:base64
            })
        }).catch((err)=>{

        })
    }

    /* 点击登录按钮执行 */
    btnClick(){

        if( !parseInt(_local.get('mechanismId')) && !parseInt(_local.get('levelTestId'))){
            this.props.history.push('/')
            this.props.onMsgChange('提示：请先扫码')
            this.props.onOpenChange(true)
        }else {

            const ph = this.state.phone;
            const pone = /^1[3|4|5|7|8][0-9]{9}$/;
            if(!ph.trim() || !pone.test(ph)){   //电话校验
                this.setState({
                    phoneMsg:'请正确输入手机号',
                    phoneStatus:true
                })
            } if(!this.state.pwd.trim()){
                this.setState({
                    pwdMsg:'密码不能为空',
                    pwdStatus:true
                })
            } if(!this.state.code.trim()){
                this.setState({
                    codeStatus:true,
                    codeMsg:'验证码不能为空'
                })
            }

            if(!this.state.phoneStatus&&this.state.phone!==''&&
                !this.state.pwdStatus&&this.state.pwd!==''&&
                !this.state.codeStatus&&this.state.code!==''){

                subConn('/account/login',
                    'post',
                    {
                        "telephone":this.state.phone,
                        "password":this.state.pwd,
                        "verification_code":this.state.code,
                    },'').then((res)=>{
                    if(res.status===200){
                        _local.set('token', res.data.token.access_token,30*60*1000);
                        _local.set('accountId',res.data.user.id)

                        if(res.data.user.roles.length>0){
                            for (let i=0;i<res.data.user.roles.length;i++){
                                if(res.data.user.roles[i].id===2){
                                    _local.set('roleId',res.data.user.roles[i].id)
                                    this.props.history.push({pathname:"/reviewPage",})
                                }else {
                                    this.props.history.push({pathname:"/studentListPage",accountId:res.data.user.id});
                                }
                            }
                        }else {
                            this.props.history.push({pathname:"/studentListPage",accountId:res.data.user.id});
                        }

                    }
                }).catch((error)=>{
                    CommonException(error,this)

                    //刷新验证码
                    this.clickHeader();
                })
            }else {
                this.setState({
                    msg:'请按提示输入登录信息'
                })
            }
        }


    }

    render() {
        return (
            <Grid >
                <Grid item  style={{width:'50vh',backgroundColor:'white',marginTop:'6vh',borderRadius:'2vh',boxShadow:'0 0 1vh #999'}}>
                    <Grid container  justify="center" alignItems="center">
                        没有账号去
                        <Button id="registerBtn" color="primary" onClick={()=>{this.props.history.push("/registerPage")}}>
                            注册
                        </Button>
                    </Grid>
                    <Grid container direction="column" justify="center" alignItems="center">
                        <Typography style={{color:'red'}}>{this.state.msg}</Typography>
                        <Grid item>
                            <TextField
                                id="phone"
                                error={this.state.phoneStatus}
                                size="small"
                                value={this.state.phone}
                                onChange={this.phoneChange.bind(this)}
                                variant="outlined"
                                margin="normal"
                                placeholder="请填写家长的手机"
                                helperText={this.state.phoneMsg}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment>
                                            <AccountCircle />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="password"
                                error={this.state.pwdStatus}
                                size="small"
                                type="password"
                                placeholder="请输入密码"
                                onBlur={this.textChange.bind(this)}
                                variant="outlined"
                                margin="normal"
                                helperText={this.state.pwdMsg}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment>
                                            <HttpsSharpIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid container direction="column" justify="center" alignItems="center">
                            <Grid item>
                                <TextField
                                    id="code"
                                    error={this.state.codeStatus}
                                    size="small"
                                    type="text"
                                    placeholder="验证码"
                                    onBlur={this.textChange.bind(this)}
                                    variant="outlined"
                                    margin="normal"
                                    helperText={this.state.codeMsg}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment>
                                                <MailIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item>
                                <img id="imgCode" alt="验证码" src={"data:image/png;base64,"+this.state.imgContent}
                                     onClick={this.clickHeader.bind(this)}/>
                            </Grid>
                        </Grid>
                        <Button id="loginBtn" style={{marginBottom:'20px'}} variant="contained" color="primary"
                                onClick={this.btnClick.bind(this)}>
                            登录
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}





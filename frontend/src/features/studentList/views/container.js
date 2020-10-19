/**
 * @Description:
 * @author Chen
 * @date 2020-08-20 10:17
 */
import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ListInfo from "./listInfo";
import Button from "@material-ui/core/Button";
import subConn from "../../../util/actions/headleSubmit";
import conn from "../../../util/actions/handleConnection";
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import {withRouter} from 'react-router';
import logout from "../../../util/actions/handleLogout";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import MyContainedButton from "../../../util/components/myContainedButton";
import MyPwdInput from "../../../util/components/myPwdInput";
import md5 from 'js-md5'
import {_local} from "../../../util/actions/headleStorage";
import tokenExpired from "../../../util/actions/handleTokenExpired";
import CommonException from "../../../util/actions/headleException";

class StudentList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            infos: [],
            open: false,

            oldPwd: '',
            oldPwdState: false,
            oldPwdMsg: '',
            oldPwdShow:false,

            newPwd: '',
            newPwdState: false,
            newPwdMsg: '',
            newPwdShow:false,

            pwd: '',
            pwdState: false,
            pwdMsg: '',
            pwdShow:false,
        }
    }
    handleOldPwdShowChange=()=>{
        this.setState({
            oldPwdShow:!this.state.oldPwdShow
        })
    }
    handleNewPwdShowChange=()=>{
        this.setState({
            newPwdShow:!this.state.newPwdShow
        })
    }
    handlePwdShowChange=()=>{
        this.setState({
            pwdShow:!this.state.pwdShow
        })
    }
    handleLogoutClick = () => {
        const token=_local.get('token')
        if(token===false){
            tokenExpired(this)
        }else{
            logout(token, this,'提示：注销成功')
        }

    }
    handleClose = () => {
        this.setState({
            open: false,
            oldPwd: '',
            oldPwdState: false,
            oldPwdMsg: '',
            oldPwdShow:false,

            newPwd: '',
            newPwdState: false,
            newPwdMsg: '',
            newPwdShow:false,

            pwd: '',
            pwdState: false,
            pwdMsg: '',
            pwdShow:false,
        })
    }
    handleOldPwdChange = (oldPwd) => {
        this.setState({
            oldPwdMsg:'',
            oldPwdState:false,
            oldPwd: oldPwd
        })
    }
    handleNewPwdChange = (newPwd) => {
        if(newPwd===this.state.pwd){
            this.setState({
                pwdState: false,
                pwdMsg: ''
            })
        }else{
            this.setState({
                pwdState: true,
                pwdMsg: '提示：两次输入密码不一样'
            })
        }
        this.setState({
            newPwd: newPwd,
            newPwdState:false,
            newPwdMsg:''
        })
    }
    handlePwdChange = (pwd) => {
        if (pwd !== this.state.newPwd) {
            this.setState({
                pwdState: true,
                pwdMsg: '提示：两次输入密码不一样'
            })
        } else {
            this.setState({
                pwdState: false,
                pwdMsg: ''
            })
        }
        this.setState({
            pwd: pwd
        })
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        })
    }

    handleSubmit=()=>{
        if(this.state.oldPwd===''){
            this.setState({
                oldPwdState:true,
                oldPwdMsg:'提示：旧密码不能为空'
            })
        }
        if(this.state.newPwd===''){
            this.setState({
                newPwdState:true,
                newPwdMsg:'提示：请填写新密码'
            })
        }
        if(this.state.pwd===''){
            this.setState({
                pwdState:true,
                pwdMsg:'提示：请填写确认密码'
            })
        }
        if(this.state.oldPwd!==''&&
            this.state.newPwd!==''&&
            this.state.pwd===this.state.newPwd
        ){
            if(this.state.oldPwd===this.state.newPwd){
                this.props.onOpenChange(true);
                this.props.onMsgChange('提示：新旧密码不能相同');
            }else{
                const data={
                    id:this.props.accountId,
                    old_password:md5(this.state.oldPwd),
                    new_password:md5(this.state.newPwd)
                }
                const token=_local.get('token')
                if(token===false){
                    tokenExpired(this)
                }else{
                    subConn('/account/updatapassd','PUT',data,token).then((result)=>{
                        if(result.data==='密码修改成功'){
                            logout(token,this,'提示：密码修改成功，请重新登录')
                        }else if(result.data==='旧密码不正确'){
                            this.props.onOpenChange(true);
                            this.props.onMsgChange('提示：旧密码不正确');
                        }
                    }).catch((error)=>{
                        if(error.response.status===401){
                            CommonException(error,this);
                        }
                    })
                }
            }
        }

    }
    componentDidMount() {
        const accountId=this.props.accountId
        const token=_local.get('token')
        if(token===false){
            tokenExpired(this)
        }else{
            if(accountId!==undefined&&accountId!==null){
                conn('/student/' + this.props.accountId, 'GET', '', token).then((result) => {
                    this.setState({
                        infos: result.data
                    })
                }).catch((error) => {
                    if(error.response.status===401){
                        CommonException(error,this);
                    }
                })
            }
        }
    }


    render() {
        return (
            <div>
                <Grid container
                      direction="row"
                      spacing={4}
                >
                    <Grid item
                          container
                          direction="row"
                          justify="space-between"
                          style={{padding:'2vh 5vh 0vh 5vh'}}
                    >
                        <Grid item>
                            <Typography variant="h4">
                                学员列表
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button id='updatePwd' size="medium" color='primary' onClick={this.handleClickOpen}>
                                修改密码
                            </Button>
                            <Button id='logoutBtn' startIcon={<PowerSettingsNewIcon/>} onClick={this.handleLogoutClick} size="medium"
                                    color='primary'>
                                注销
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item style={{width: '100%'}}>
                        <ListInfo accountId={this.props.accountId} levelId={this.props.levelId} mechanismId={this.props.mechanismId} infos={this.state.infos}/>
                    </Grid>
                </Grid>
                {/*修改密码弹出框*/}
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">修改密码</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            请输入您的旧密码和新密码
                        </DialogContentText>
                        <Grid container spacing={2}>
                            <Grid item>
                                <MyPwdInput
                                    id='oldPwdInput'
                                    label='旧密码'
                                    error={this.state.oldPwdState}
                                    helperText={this.state.oldPwdMsg}
                                    onChange={this.handleOldPwdChange}
                                    value={this.state.oldPwd}
                                    show={this.state.oldPwdShow}
                                    onClick={this.handleOldPwdShowChange}
                                />
                            </Grid>
                            <Grid item>
                                <MyPwdInput
                                    id='newPwdInput'
                                    label='新密码'
                                    error={this.state.newPwdState}
                                    helperText={this.state.newPwdMsg}
                                    onChange={this.handleNewPwdChange}
                                    value={this.state.newPwd}
                                    show={this.state.newPwdShow}
                                    onClick={this.handleNewPwdShowChange}
                                />
                            </Grid>
                            <Grid item>
                                <MyPwdInput
                                    id='pwdInput'
                                    label='确认密码'
                                    error={this.state.pwdState}
                                    helperText={this.state.pwdMsg}
                                    onChange={this.handlePwdChange}
                                    value={this.state.pwd}
                                    show={this.state.pwdShow}
                                    onClick={this.handlePwdShowChange}
                                />
                            </Grid>
                        </Grid>

                    </DialogContent>
                    <DialogActions>
                        <MyContainedButton id='cancelBtn' value='取消' onClick={this.handleClose}/>
                        <MyContainedButton
                            id='updatePwdBtn'
                            value='修改'
                            onClick={this.handleSubmit}
                        />
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withRouter(StudentList)

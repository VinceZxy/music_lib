import React from "react";
import {Grid, InputAdornment, Typography,} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Axios from 'axios'
import config from '../../../config/config.json'
import {_local} from "../../../util/actions/headleStorage";
import conn from "../../../util/actions/handleConnection";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import logout from "../../../util/actions/handleLogout";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

export default class Major extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            id:'',
            items:null,
            open:false,
            msg:''
        };
    }

    /*确认申请审核*/
    startReview(){
        Axios.put(config.ip+"/register_major/?register_major_id="+this.state.id,{"register_major_id":this.state.id},
            {headers:{Authorization:_local.get('token')}})
            .then((res)=>{
                if (res.data){
                    conn('/register_major/'+sessionStorage.getItem('stuId'),'get','',_local.get('token'))
                        .then((res)=>{
                            // this.props.items=res.data
                            this.setState({items:res.data,open:false, id:0})
                        })
                }
            }).catch((err)=>{
                if(err.response.data){
                    this.setState({
                        msg:err.response.data
                    })
                }
        })
    }
    /*点击申请审核*/
    btnReview(prop){

        this.setState({
            open:true,
            id:prop
        })
    }

    handleClose(){
        this.setState({open:false})
    }

    render() {
        return(
            <Grid container
                  direction="column"
                  alignItems="center"
                  justify="center">

                <Dialog open={this.state.open} onClose={this.handleClose.bind(this)} aria-labelledby="draggable-dialog-title">
                    <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                        确认要申请审核吗？
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            注意：提交审核，将无法修改报名信息! 若审核失败，则需要审核提示，重新修改信息进行审核!
                            审核成功后,才是报名成功!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button id="cancelBtn" autoFocus onClick={this.handleClose.bind(this)} color="primary">
                            取消审核
                        </Button>
                        <Button id="okBtn" onClick={this.startReview.bind(this)} color="primary">
                            确认审核
                        </Button>
                    </DialogActions>
                </Dialog>
                <Grid item container direction="row" alignItems="center" justify="space-evenly" style={{margin:'3vh'}}>
                    <Grid item ><Typography variant="h6">报考专业列表</Typography></Grid>
                    <Grid item >
                        <Button id="goBackBtn" size="medium" color='primary' onClick={()=>{this.props.history.push('studentListPage')}}>{"<返回"}</Button>
                        <Button id="loginOutBtn1" size="medium" color='primary'
                                onClick={()=>{logout(_local.get('token'),this.props,'操作成功, 请登录')}}
                        >
                            <InputAdornment>
                                <PowerSettingsNewIcon/>
                            </InputAdornment>
                            注销
                        </Button>
                    </Grid>
                </Grid>
                <Grid item container direction="row" alignItems="center" justify="space-evenly">
                    <Grid item ><Typography variant="h6">列表信息({sessionStorage.getItem('stuName')})</Typography></Grid>
                    <Grid item >
                        <Button id="addMajorBtn" variant="contained" color="primary" size="small" startIcon={<AddCircleOutlineIcon/>}
                            onClick={()=>{this.props.history.push({pathname:"/addMajorPage",stuId:this.props.studentId})}}>
                            新增报考专业
                        </Button>
                    </Grid>
                </Grid>

                <Grid><Typography  style={{padding:'1vh',margin:'1vh'}} variant="body1">
                    {this.props.items || this.state.items?'':'没有报考信息，请先添加'}
                </Typography></Grid>

                <Grid container justify="center" style={{backgroundColor:'white',margin:'auto'}}>
                    {(this.state.items?this.state.items:this.props.items).map((item,i)=>{
                        return (
                            <Grid key={i} item
                                  style={{margin:'1vh',boxShadow:'0 0 1vh #999',padding:'1vh',width:'50vh'}}>
                                <Grid  container direction="row" >
                                    <Grid container direction="row" alignItems="center"  >
                                        <Grid item >{item.enter_major.major_name} {item.register_level}级&nbsp;&nbsp;</Grid>
                                        <Grid item >
                                            (当前状态&nbsp;&nbsp;
                                            {(item.status===2 && item.mode==='视频考试'?'视频状态':'当前状态')==='视频状态' ?
                                                // ((item.video_status<1?'视频未提交':'')||(item.video_status===1?'视频待审核':'')||(item.video_status===2?'视频审核通过':'')||(item.video_status>3?'视频审核未通过':'')) :
                                                ((item.video_status<1?'视频未提交':'')||(item.video_status===1?'视频已提交':'')) :
                                                ((item.status<1?'未提交审核':'')||(item.status===1?'审核中':'')||(item.status===2?'审核通过':'')||(item.status>2?'审核未通过':''))
                                            })

                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Button id={"findOneMajorBtn"+item.id} component="span" onClick={()=>{this.props.history.push({pathname:'/findOneMajor',id: item.id})}}
                                                style={{color:'#3C90E4'}} >查看
                                        </Button>

                                        <Button color="primary" id={"videoBtn"+item.id}
                                                // disabled={item.mode==='视频考试'&&item.status===2 && item.video_status>0?false:true}
                                            //审核通过并且 视频状态为0时 显示视频考级
                                                disabled={item.status===2 && item.video_status===0 && item.mode==='视频考试'?false:true}
                                                onClick={()=>{this.props.history.push({pathname:'/videoUploadPage',registerMajorId:item.id,accountId: this.props.accountId})}}>
                                            {item.mode==='视频考试' && item.video_status===0 && item.status===2?'视频考级':''}
                                        </Button>

                                        {/*  //审核未通过  显示修改 */}
                                        <Button
                                            id={"updateMajorBtn"+item.id}
                                            disabled={item.status===0?false:true}
                                            onClick={()=>{this.props.history.push({pathname:'/addMajorPage',id:item.id})}}
                                            style={{color:'#999'}}>
                                            {item.status<1 ?'修改':''}
                                        </Button>

                                        <Button id={"applyBtn"+item.id}
                                                onClick={this.btnReview.bind(this,item.id)}
                                                disabled={item.status<1?false:true}
                                                style={{color:'#3C90E4'}}>
                                            {item.status<1 ?'申请审核':''}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        )
                    })}
                </Grid>
            </Grid>

        )
    }
}

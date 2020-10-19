import {Grid, InputAdornment,Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import React from "react";
import conn from "../../../util/actions/handleConnection";
import config from '../../../config/config.json'
import {_local} from "../../../util/actions/headleStorage";
import logout from "../../../util/actions/handleLogout";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import subConn from "../../../util/actions/headleSubmit";

export default class OneMajor extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            oneMajor:{
                "id": null,
                "instructor": "",
                "instructor_phtone": "",
                "mode": "",
                "register_level": null,
                "status": null,
                "track1": {
                    "id": null,
                    "track_name": ""
                },
                "track2": {
                    "id": null,
                    "track_name": ""
                },
                "track3": {
                    "id": null,
                    "track_name": ""
                },
                "track4": {
                    "id": null,
                    "track_name": ""
                },
                "student_id": null,
                "enter_major_id": null,
                "certificate": [
                    {
                        "id": null,
                        "belong_committee": "",
                        "level": null,
                        "certificate_image": "",
                        "get_time": "",
                        "register_info_id": null
                    },
                ],
                "enter_major": {
                    "id": null,
                    "major_name": "",
                    "level": ""
                },
                "student": {
                    "id": null,
                    "student_name": "",
                    "name_pinyin": "",
                    "document_type": null,
                    "id_number": "",
                    "sex": null,
                    "nationality": "",
                    "nation": "",
                    "birth_time": "",
                    "photo": "",
                    "account_id": null
                }
            }
        }
    }
    componentDidMount() {
        let examinationID
        if(this.props.id){
            examinationID=this.props.id
        }else {
            examinationID=parseInt(sessionStorage.getItem('examinationID'))
        }
        conn('/register_major/major/'+examinationID,'get','',_local.get('token'))
            .then((result) => {
                this.setState({
                    oneMajor:result.data
                })
            }).then((err) => {
        })
    }

    uploadRegister(id){
        let uri;
        subConn('/register_major/report_generation?register_major_id='+id,'post','',_local.get('token'))
            .then((res)=>{
            if (res.status===200){
                uri=res.data
                window.open(config.ip+"/"+uri,'报名信息')
            }
        })

    }

    render() {
        return(
            <Grid container direction="column" justify="center" alignItems="center">
                <Grid container
                      direction="row"
                      justify="space-evenly"
                      alignItems="baseline"
                      style={{margin:'3vh'}}
                >
                    <Grid item ><Typography variant="h6">查看报名资料</Typography></Grid>
                    <Grid item>
                        <Button id="backBtn1" size="medium" color='primary'
                                onClick={()=>{this.props.history.push("/majorListPage")}}>{"<返回"}</Button>
                        <Button id="loginOutBtn" size="medium" color='primary' onClick={()=>{logout(_local.get('token'),this.props,'操作成功, 请登录')}}>
                            <InputAdornment>
                                <PowerSettingsNewIcon />
                            </InputAdornment>
                            注销
                        </Button>
                    </Grid>
                </Grid>
                <Grid> {this.state.oneMajor.student.student_name}</Grid>
                <Grid container justify="center">
                    <img style={{width:'20%',height:'auto',borderRadius:'50%'}} alt="123"
                         src={config.imgIp+this.state.oneMajor.student.photo}/>
                </Grid>
                <Grid >
                    <Button id="findSourceBut" style={{width:'200px'}} variant="contained" color="primary">成绩查询</Button>
                </Grid>
                <hr/>
                <Grid >
                    <Button id="loadBtn" style={{width:'200px'}} variant="contained" color="primary"
                            onClick={this.uploadRegister.bind(this,this.props.id)}>下载报名表
                    </Button>
                </Grid>
                <hr/>
                <Grid><Typography variant="h6">详细信息</Typography></Grid>

                <Grid style={{width:'80%'}}>
                    <Grid container direction="row" justify="space-between" alignItems="center">
                        <Grid>考试时间</Grid>
                        <Grid>{}</Grid>
                    </Grid>
                    <Grid container direction="row" justify="space-between" alignItems="center">
                        <Grid>考试地点</Grid>
                        <Grid>{}</Grid>
                    </Grid>
                    <Grid container direction="row" justify="space-between" alignItems="center">
                        <Grid>考场</Grid>
                        <Grid>{}</Grid>
                    </Grid>
                    <Grid container direction="row" justify="space-between" alignItems="center">
                        <Grid>专业名称</Grid>
                        <Grid>{this.state.oneMajor.enter_major.major_name}</Grid>
                    </Grid>
                    <Grid container direction="row" justify="space-between" alignItems="center">
                        <Grid>报考级别</Grid>
                        <Grid>{this.state.oneMajor.register_level}</Grid>
                    </Grid>
                    <Grid container direction="row" justify="space-between" alignItems="center">
                        <Grid>考试方式</Grid>
                        <Grid>{this.state.oneMajor.mode}</Grid>
                    </Grid>
                    <Grid container direction="row" justify="space-between" alignItems="center">
                        <Grid>指导老师姓名</Grid>
                        <Grid>{this.state.oneMajor.instructor}</Grid>
                    </Grid>
                    <Grid container direction="row" justify="space-between" alignItems="center">
                        <Grid>指导老师电话</Grid>
                        <Grid>{this.state.oneMajor.instructor_phtone}</Grid>
                    </Grid>
                    <Grid container direction="row" justify="space-between" alignItems="center">
                        <Grid>考试曲目1</Grid>
                        <Grid>{this.state.oneMajor.track1.track_name}</Grid>
                    </Grid>
                    <Grid container direction="row" justify="space-between" alignItems="center">
                        <Grid>考试曲目2</Grid>
                        <Grid>{this.state.oneMajor.track2 === undefined || !this.state.oneMajor.track2?'':this.state.oneMajor.track2.track_name}</Grid>
                    </Grid>
                    <Grid container direction="row" justify="space-between" alignItems="center">
                        <Grid>考试曲目3</Grid>
                        <Grid>{this.state.oneMajor.track3 === null || this.state.oneMajor.track3===undefined?'':this.state.oneMajor.track3.track_name}</Grid>
                    </Grid>
                    <Grid container direction="row" justify="space-between" alignItems="center">
                        <Grid>考试曲目4</Grid>
                        <Grid>{this.state.oneMajor.track4===null || this.state.oneMajor.track3===undefined?'':this.state.oneMajor.track4.track_name}</Grid>
                    </Grid>
                    {
                        this.state.oneMajor.certificate.map((item,i)=>{
                            return (
                                <Grid  container direction="row" justify="space-between" alignItems="center" key={'certificate'+i}>
                                    <Grid>已获证书</Grid>
                                    <img alt="证书" src={config.imgIp+'/'+item.certificate_image} style={{width:'18vh',height:'18vh'}}/>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Grid>
        )
    }

}

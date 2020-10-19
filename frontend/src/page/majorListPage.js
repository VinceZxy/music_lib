import React from "react";
import Grid from "@material-ui/core/Grid";
import MajorInfo from  '../features/MajorList/views/majorInfo'
import CssBaseline from "@material-ui/core/CssBaseline";
import {view as College} from "../features/college";
import {_local} from "../util/actions/headleStorage";
import conn from "../util/actions/handleConnection";
import {withRouter} from 'react-router';


class MajorListPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            items:[],
            studentName:'',
            studentId:null,
            accountId:''
        }
    }
    componentDidMount() {

        let studentInfo
        let stuId
        let stuName

        if(_local.get('roleId') && parseInt(_local.get('roleId'))===2){
            //当管理员登录 手动地址栏跳转时 返回到审核界面
            this.props.history.push("/reviewPage");
        }else if(_local.get('token')){
            if(this.props.location.studentInfo){
                //第一次进入该页面 由父级页面跳转
                studentInfo = this.props.location.studentInfo
                stuId=studentInfo.id
                sessionStorage.setItem('stuId',studentInfo.id);
                sessionStorage.setItem('stuName',studentInfo.student_name);
            }else if (this.props.location.id){
                stuId=this.props.location.id
            }else {
                // 表示返回到当前页面 或者登录后直接路由到该页面
                stuId = parseInt(sessionStorage.getItem('stuId'))
                stuName = sessionStorage.getItem('stuName')
                if(!(stuId && stuName)){
                    this.props.history.push({pathname:"/studentListPage",accountId:parseInt(_local.get('accountId'))});  //返回上级页面
                }
            }
            // 查询所有报考专业信息
            conn('/register_major/'+stuId,'get','',_local.get('token'))
                .then((result) => {
                    this.setState({
                        items:result.data,
                    })
                })
        }else {
            this.props.onMsgChange('提示：请先登录');
            this.props.onOpenChange(true);
            this.props.history.push('/logonPage')
        }
    }

    render() {
        return (
            <React.Fragment>
                <CssBaseline/>
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="center"
                    style={{backgroundColor:'#EDF8FF',paddingTop:'5vh',}}
                >
                    <Grid item><College direction='row' wid='10vh' variant='h2'/></Grid>
                    <Grid item style={{left:'-2vh'}}>
                        <MajorInfo studentName={this.props.location.studentInfo?this.props.location.studentInfo.student_name:sessionStorage.getItem('stuId')}
                                     accountId={this.state.accountId}
                                     items={this.state.items}
                                     studentId={this.props.location.studentInfo?this.props.location.studentInfo.id:sessionStorage.getItem('stuId')}
                                     props={this.props}
                                     history={this.props.history}
                        />
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

export default withRouter(MajorListPage)
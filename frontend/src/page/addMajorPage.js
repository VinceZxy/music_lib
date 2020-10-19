import React from "react";
import Grid from "@material-ui/core/Grid";
import AddMajor from  '../features/addMajor/views/addMajor'
import CssBaseline from "@material-ui/core/CssBaseline";
import {view as College} from "../features/college";
import {_local} from "../util/actions/headleStorage";
import {withRouter} from 'react-router';
class MajorListPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            stuId:null,
        }
    }

    //需要一个 学生id
    componentDidMount() {
        let stuId = this.props.location.stuId
        if(_local.get('roleId') && parseInt(_local.get('roleId'))===2){
            //当管理员登录 手动地址栏跳转时 返回到审核界面
                this.props.history.push("/reviewPage");
        }else if(_local.get('token')){

            //表示返回或者直接url访问
            if(stuId===null||stuId===undefined){
                stuId = parseInt(sessionStorage.getItem('stuId'))
                //表示直接url访问
                if(stuId===null||isNaN(stuId)){
                    //返回上级页面
                    this.props.history.push("/majorListPage");
                }else {
                    //用户返回操作
                    this.setState({stuId:stuId})
                }
            }else {
            }

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
                    style={{
                        overflow:'auto ',
                        height: '100vh',
                        backgroundColor:'#EDF8FF',paddingTop:'5vh'}}
                >
                    <College direction='row' wid='10vh' variant='h2'/>
                    <AddMajor
                        id={this.state.stuId}
                        examinationID={this.props.location.id?this.props.location.id:-1}
                        props={this.props}
                        history={this.props.history}
                    />
                </Grid>
            </React.Fragment>
        );
    }
}

export default withRouter(MajorListPage)
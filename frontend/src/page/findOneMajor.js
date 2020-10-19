import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import {view as College} from "../features/college";
import OneMajor from "../features/findMajor/view/oneMajor";
import {withRouter} from 'react-router';
import {_local} from "../util/actions/headleStorage";

class FindOneMajor extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            id: ''
        }
    }
    componentDidMount() {

        let examinationID
        if(_local.get('roleId') && parseInt(_local.get('roleId'))===2){
            //当管理员登录 手动地址栏跳转时 返回到审核界面
            this.props.history.push("/reviewPage");
        }else if(_local.get('token')){
            if(this.props.location.id){
                examinationID=this.props.location.id
                sessionStorage.setItem('examinationID',examinationID)
            }else {
                this.props.history.push("/majorListPage")
            }
        }else {
            this.props.onMsgChange('提示：请先登录');
            this.props.onOpenChange(true)
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
                    <OneMajor props={this.props}
                              history={this.props.history}
                              id={this.props.location.id?this.props.location.id:parseInt(sessionStorage.getItem('examinationID'))}
                    />
                </Grid>
            </React.Fragment>
        );
    }
}

export default withRouter(FindOneMajor)
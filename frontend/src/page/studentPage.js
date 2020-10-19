/**
 * @Description:
 * @author Chen
 * @date 2020-08-24 09:49
 */

import React from 'react';
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import {view as College} from "../features/college/index";
import {view as Student} from '../features/student/index'
import {view as Heads} from '../features/heads/index'
import {withRouter} from 'react-router';
import {_local} from "../util/actions/headleStorage";

function StudentPage(props){
    let accountId;
    let studentInfo;
    let headTitle;
    let levelId;
    let mechanismId;
    // levelId={this.props.levelId} mechanismId={this.props.mechanismId}
    if(props.location.accountId!==undefined){
        headTitle=props.location.flag
        sessionStorage.setItem('headTitle',props.location.flag)
        accountId=props.location.accountId;
        levelId=props.location.levelId
        sessionStorage.setItem('levelId',props.location.levelId)
        mechanismId=props.location.mechanismId
        sessionStorage.setItem('mechanismId',props.location.mechanismId)
        if(props.location.studentInfo!==undefined){
            studentInfo=props.location.studentInfo
            sessionStorage.setItem('studentInfo',JSON.stringify(props.location.studentInfo))
        }
    }else {
        let id = _local.get('accountId');
        if(id===null){
            props.onMsgChange('提示：请先登录');
            props.onOpenChange(true);
            props.history.push('/logonPage')
        }else{
            accountId=id
            const title=sessionStorage.getItem('headTitle');
            if(title!==null){
                headTitle=title
                levelId=sessionStorage.getItem('levelId');
                mechanismId=sessionStorage.getItem('mechanismId');
                if(title==='修改学生信息'){
                    studentInfo=JSON.parse(sessionStorage.getItem('studentInfo'));
                }
            }else{
                props.history.push('/studentListPage')
            }
        }
    }
    return (
        <React.Fragment>
            <CssBaseline/>
            <Grid
                container
                direction="column"
                justify="center"
                spacing={6}
                style={{backgroundColor:'#EDF8FF',paddingTop:'5vh'}}
            >
                <Grid item>
                    <College direction='row' wid='10vh' variant='h2'/>
                </Grid>
                <Grid item>
                    <Heads
                        headTitle={headTitle}
                        onOpenChange={props.onOpenChange}
                        onMsgChange={props.onMsgChange}
                        backPage={'/studentListPage'}
                        accountId={accountId}
                        features={
                            <Student
                                mechanismId={mechanismId}
                                levelId={levelId}
                                accountId={accountId}
                                onOpenChange={props.onOpenChange}
                                onMsgChange={props.onMsgChange}
                                studentInfo={studentInfo}
                            />
                        }
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default withRouter(StudentPage)
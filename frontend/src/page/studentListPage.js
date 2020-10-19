import React from "react";
import Grid from "@material-ui/core/Grid";
import {view as College} from "../features/college/index"
import {view as StudentList} from "../features/studentList/index"
import CssBaseline from "@material-ui/core/CssBaseline";
import {withRouter} from 'react-router';
import {_local} from "../util/actions/headleStorage";

function StudentListPage(props){
    let accountId;
    let levelId=_local.get("levelTestId");
    let mechanismId=_local.get("mechanismId");
    if(props.location.accountId!==undefined&&!isNaN(props.location.accountId)){//判断当前有参数
        // 获取角色id，判断是否为管理员
        let rID=_local.get('roleId')
        if(rID===undefined||rID===null){
            //不是管理员
            accountId=props.location.accountId;
        }else{
            props.history.push('/reviewPage');
        }
    }else {
        let id = parseInt(_local.get('accountId'));
        if(id===null||isNaN(id)||id===undefined){
            props.onMsgChange('提示：请先登录');
            props.onOpenChange(true);
            props.history.push('/logonPage')
        }else{
            // 获取角色id，判断是否为管理员
            let rID=_local.get('roleId')
            if(rID===undefined||rID===null){
                //不是管理员
                accountId=id
            }else{
                props.history.push('/reviewPage');
            }
        }
    }
    return (
        <React.Fragment>
            <CssBaseline/>
            <Grid
                container
                direction="column"
                justify="flex-start"
                spacing={6}
                style={{backgroundColor:'#EDF8FF',paddingTop:'5vh'}}
            >
                <Grid item>
                    <College direction='row' wid='10vh' variant='h2'/>
                </Grid>
                <Grid item>
                    <StudentList onOpenChange={props.onOpenChange}
                                 onMsgChange={props.onMsgChange}
                                 accountId={accountId}
                                 levelId={levelId}
                                 mechanismId={mechanismId}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
export default withRouter(StudentListPage)
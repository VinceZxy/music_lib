/**
 * @Description:
 * @author Chen
 * @date 2020-08-27 15:34
 */

import React from 'react';
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import {view as College} from "../features/college/index";
import {view as Heads} from "../features/heads/index";
import {view as VideoUpload} from '../features/videoUpload/index'
import {withRouter} from 'react-router';
import {_local} from "../util/actions/headleStorage";

function VideoUploadPage(props) {

    let accountId;
    let registerMajorId;
    if (props.location.accountId !== undefined) {
        accountId = props.location.accountId;
        if (props.location.registerMajorId !== undefined) {
            registerMajorId = props.location.registerMajorId
            sessionStorage.setItem('registerMajorId', props.location.registerMajorId)
        } else {
            let id = sessionStorage.getItem('registerMajorId');
            console.log(id)
            if (id !== null) {
                registerMajorId = id
            } else {
                props.history.push({
                    pathname: '/majorListPage', accountId: accountId
                });
            }
        }
    } else {
        let id = _local.get('accountId');
        if (id !== null) {
            accountId = id
            let rid = sessionStorage.getItem('registerMajorId');
            if (rid !== null&&rid!==undefined) {
                registerMajorId = rid
            } else {
                props.history.push({
                    pathname: '/majorListPage', accountId: accountId
                });
            }
        } else {
            props.onMsgChange('提示：请先登录');
            props.onOpenChange(true);
            props.history.push('/logonPage')
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
                style={{backgroundColor: '#EDF8FF', paddingTop: '5vh'}}
            >
                <Grid item>
                    <College direction='row' wid='10vh' variant='h2'/>
                </Grid>
                <Grid item>
                    <Heads headTitle='视频考级'
                           backPage='/majorListPage'
                           accountId={accountId}
                           onOpenChange={props.onOpenChange}
                           onMsgChange={props.onMsgChange}
                           features={
                               <VideoUpload
                                   onOpenChange={props.onOpenChange}
                                   onMsgChange={props.onMsgChange}
                                   accountId={accountId}
                                   id={registerMajorId}
                               />
                           }/>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default withRouter(VideoUploadPage)
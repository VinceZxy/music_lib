import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Login from '../features/login/view/login'
import {Grid, } from "@material-ui/core";
import {view as College} from "../features/college";
import {withRouter} from 'react-router';

function LoginPage(props) {
    return (
        <React.Fragment>
            <CssBaseline/>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={4}
                style={{backgroundColor: '#EDF8FF', height: '100vh', paddingTop: '0vh'}}
            >
                <College direction='row' wid='10vh' variant='h2'/>
                <Login history={props.history}
                       onOpenChange={props.onOpenChange}
                       onMsgChange={props.onMsgChange}
                       props={props}
                />
            </Grid>
        </React.Fragment>
    );
}
export default withRouter(LoginPage);


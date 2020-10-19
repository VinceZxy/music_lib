/**
 * @Description:
 * @author Chen
 * @date 2020/8/21
*/

import React from "react";
import {view as College} from "../features/college/index"
import {view as CollegeInfo} from "../features/collegeInfo/index"
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";

export default function QRCodePage(props){
    return(
        <React.Fragment>
            <CssBaseline/>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={6}
                style={{backgroundColor:'#EDF8FF',height:'102vh'}}
            >
                <Grid item >
                    <College direction="column" wid='20vh' variant='h2'/>
                </Grid>
                <Grid item>
                    <CollegeInfo id={props.id}/>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
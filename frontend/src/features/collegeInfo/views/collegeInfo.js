/**
 * @Description:
 * @author Chen
 * @date 2020/8/20
*/

import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

export default function CollegeInfo(props) {
    return(
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
        >
            <Typography variant="body1">
                办公地址：
                {props.info.address}
            </Typography>
            <Typography variant="body1">
                咨询电话：
                {props.info.telephone}
            </Typography>
        </Grid>

    );
}
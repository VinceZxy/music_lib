/**
 * @Description:
 * @author Chen
 * @date 2020/8/20
*/

import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import config from "../../../config/config.json"
export default function QR_Code(props) {
    const photo= props.mechanismInfo.qr_code_path
    return(
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
        >
            <img alt="二维码" style={{width:'12vh'}} src={photo===undefined?'':config.imgIp+photo}/>
            <Typography variant={"body1"}>{props.info.mechanisms[0].mechanism_name}</Typography>
        </Grid>
    );
}
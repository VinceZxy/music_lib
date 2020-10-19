import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

export default function CollegeName(props) {
    return(
        <Grid container
              direction="column"
              justify="center"
              alignItems="center"
        >
            <Typography variant={props.variant}>
                {props.info.college_name}
            </Typography>
            <Typography variant="body2">
                {props.info.college_eng_name}
            </Typography>
        </Grid>
    );
}
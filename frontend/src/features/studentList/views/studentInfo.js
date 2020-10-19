/**
 * @Description:
 * @author Chen
 * @date 2020/8/20
 *
 */
import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import config from '../../../config/config.json'
import {withRouter} from 'react-router';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.up('md')]: {
            width:'45vh'
        },
    },
}));

function StudentInfo(props) {
    const classes = useStyles();
    const info=props.info
    const handleUpdateClick=()=>{
        props.history.push({pathname:'/studentPage',flag:'修改学生信息',levelId:props.levelId,mechanismId:props.mechanismId,studentInfo:info,accountId:props.accountId})
    }
    const handleApplyClick=()=>{
        props.history.push({pathname:'/majorListPage',studentInfo:info})
    }
    return(
        <Paper elevation={2} style={{padding:'1vh',margin:'2vh'}} className={classes.root}>
            <Grid container justify="center" alignItems="center" spacing={5}>
                <Grid item>
                    <img alt={info.photo===''?'没有照片':'学生照片'} width='65vh' src={info.photo===''?'':config.imgIp+info.photo} />
                </Grid>
                <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                        <Typography  variant="subtitle1">
                            {info.student_name}
                        </Typography>
                        <Typography variant="body2" >
                            {info.birth_time}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button id={'updateStuInfoBtn'+props.info.id} disableElevation variant="contained" onClick={handleUpdateClick}>修改</Button>
                    </Grid>
                </Grid>
                <Grid item>
                    <Button id={'majorBtn'+props.info.id} disableElevation variant="contained" onClick={handleApplyClick}>申请报考</Button>
                </Grid>
            </Grid>
        </Paper>

    );
}
export default withRouter(StudentInfo)
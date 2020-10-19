/**
 * @Description:
 * @author Chen
 * @date 2020-08-20 10:17
 */
import React from 'react';
import {withRouter} from 'react-router';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import StudentInfo from "./studentInfo";
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Paper from "@material-ui/core/Paper";

function ListInfo(props) {
    const rows=props.infos.map((info)=>
        <Grid item key={info.id}>
            <StudentInfo levelId={props.levelId} mechanismId={props.mechanismId} accountId={props.accountId} info={info}/>
        </Grid>
    )
    const handleAddStudentClick=()=>{
        props.history.push({pathname:'/studentPage',levelId:props.levelId,mechanismId:props.mechanismId, accountId:props.accountId,flag:'新增学员'})
    }
    return(

        <Paper elevation={1} style={{minHeight:'71vh'}}>
            <Grid
                direction="column"
                container>
                <Grid item
                      direction="row"
                      justify="space-between"
                      style={{padding:'2vh 7vh'}}
                      container>
                    <Typography variant="h6">
                        列表信息
                    </Typography>
                    <Button id='addStudentBtn' variant="contained" startIcon={<AddCircleOutlineIcon/>} onClick={handleAddStudentClick} size="medium" color='primary'>
                        新增学员
                    </Button>
                </Grid>
                <Grid item container>
                    {
                        rows.length!==0?rows:
                            <Grid item style={{width:'100%'}}>
                                <Typography style={{padding:'1vh',margin:'2vh'}} variant='body2'>
                                    没有学生信息
                                </Typography>
                            </Grid>
                    }
                </Grid>

            </Grid>
        </Paper>

    );
}
export default withRouter(ListInfo);
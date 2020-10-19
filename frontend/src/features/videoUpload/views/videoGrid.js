/**
 * @Description:
 * @author Chen
 * @date 2020-08-28 11:41
 */

import React from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

export default function VideoGrid(props) {
    const [open,setOpen]=React.useState(true);
    const creatFileSrc = (videoFile) => {
        const reader = new FileReader();
        let video;
        reader.onload = (evt) => {
            video = document.querySelector('#videoFile'+props.track.id+props.index);
            video.src = evt.target.result;
        };
        reader.readAsDataURL(videoFile);
        setOpen(false);
    }
    const handleFileChange=(event)=>{
        creatFileSrc(event.target.files[0]);
    }
    return(
        <Paper style={{margin:'1vh',padding:'2vh',width:'50vh'}}>
            <Grid container alignItems="center" direction="column" spacing={2}>
                <Grid item container direction='row' spacing={6}>
                    <Grid item xs>
                        <Typography>曲目{props.index+1}：{props.track.track_name}</Typography>
                    </Grid>
                    <Grid item xs>
                        <input type='file' onChange={handleFileChange} className='videoFile' id={"studentVideoFile"+props.track.id+props.index} name='file' style={{display:'none'}} accept='video/*'/>
                        <label htmlFor={"studentVideoFile"+props.track.id+props.index}>
                            <Button id={'uploadVideoBtn'+props.track.id+''+props.index} variant="contained" color="primary" component="span">
                                点击上传视频
                            </Button>
                        </label>
                        <input type='text' name='track_ids' readOnly value={props.track.id}style={{display:'none'}}/>
                        <input type='text' name='register_ids' readOnly value={props.id}style={{display:'none'}}/>
                    </Grid>
                </Grid>
                <Grid item>
                    <video id={'videoFile'+props.track.id+props.index} hidden={open}  controls style={{width:'40vh'}}/>
                </Grid>
            </Grid>
        </Paper>

    );
}
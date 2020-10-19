/**
 * @Description:
 * @author Chen
 * @date 2020-08-31 16:11
 */

import React from 'react';
import Grid from "@material-ui/core/Grid";
import VideoGrid from "./videoGrid";

export default function VideoSelectGrid(props) {
    const rows=props.tracks.map((track,index)=>
        <Grid item key={track.id+''+index}>
            <VideoGrid videoList={props.videoList} onFileChange={props.onFileChange} track={track} id={props.id} index={index}/>
        </Grid>
    )
    return(
        <Grid container spacing={4}>
            {rows}
        </Grid>
    );
}
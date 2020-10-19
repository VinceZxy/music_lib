/**
 * @Description:
 * @author Chen
 * @date 2020-08-27 15:39
 */

import React,{useEffect} from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Backdrop from '@material-ui/core/Backdrop';
import Radio from '@material-ui/core/Radio';
import photo from '../../../img/123.png'
import conn from "../../../util/actions/handleConnection";
import {makeStyles} from "@material-ui/core/styles";
import VideoSelectGrid from "./videoSelectGrid";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import fileUpload from "../../../util/actions/handleFileUpload";
import {withRouter} from 'react-router';
import {_local} from "../../../util/actions/headleStorage";
import tokenExpired from "../../../util/actions/handleTokenExpired";
import CircularProgress from '@material-ui/core/CircularProgress';
import CommonException from "../../../util/actions/headleException";

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    gridItem:{padding:'2vh',width:'100%'},
    paper:{padding:'1vh'}
}));

function VideoUpload(props){
    const [open, setOpen] = React.useState(false);
    const [flag, setFlag] =React.useState(false);
    const [tracks,setTracks] =React.useState([]);
    const [id]=React.useState(props.id);
    const [msg,setMsg]=React.useState('请查看上传说明并勾选我已阅读上传说明')
    const [msgOpen,setMsgOpen]=React.useState(false);
    const [uploadOpen,setUploadOpen]=React.useState(false)
    const [info,setInfo]=React.useState({
        "enter_major": {
            "major_name": "",
        },
        "student": {
            "student_name": "",
        }
    });
    const videoList=React.useState([]);
    useEffect(()=>{
        const token=_local.get('token')
        if(token===false){
            tokenExpired(this)
        }else{
            conn('/register_major/major/'+id,'GET','',token).then((result)=>{
                const info=result.data;
                setInfo(info);
                const tracksInfo=[];
                if(info.track1!=null){
                    tracksInfo.push(info.track1)
                }
                if(info.track2!=null){
                    tracksInfo.push(info.track2)
                }
                if(info.track3!=null){
                    tracksInfo.push(info.track3)
                }
                if(info.track4!=null){
                    tracksInfo.push(info.track4)
                }
                setTracks(tracksInfo);
            }).catch((error)=>{
                if(error.response.status===401){
                    CommonException(error,this);
                }

            })
        }
    },[id])
    const handleFileChange=(event)=>{
        videoList.push(event.target.files[0])
        console.log(videoList)
    }
    const handleMsgClose=()=>{
        setMsgOpen(false);
    }
    const handleClose=()=> {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };
    const handleFlagClick=()=>{
        setFlag(!flag);
    }
    const handleClick=()=> {
        if(flag){
            let fileFlag=false;
            const form = document.getElementById('form1');
            const tagElements = form.getElementsByClassName('videoFile')
            for (let i = 0; i < tagElements.length; i++){
                if(tagElements[i].value===''){
                    fileFlag=false
                    break;
                }
                fileFlag=true
            }
            if(fileFlag){
                let form = document.getElementById('form1');
                let tagElements = form.getElementsByTagName('input');
                let formData=new FormData();
                // let trackCount=0;
                // let registerCount=1;
                // let videoCount=2;
                let trackCount=1;
                let registerCount=2;
                let videoCount=0;
                for (let j = 0; j < tagElements.length; j++){
                    if(j===videoCount){
                        formData.append('file',tagElements[j].files[0],tagElements[registerCount].value+'_'+tagElements[trackCount].value+'_'+tagElements[j].files[0].name)
                        videoCount+=3;
                    }else if(j===registerCount){
                        formData.append('register_ids',tagElements[j].value);
                        registerCount+=3
                    }else if(j===trackCount){
                        formData.append('track_ids',tagElements[j].value);
                        trackCount+=3;
                    }
                }
                const token=_local.get('token')
                if(token===false){
                    sessionStorage.removeItem('accountId')
                    sessionStorage.removeItem('studentId')
                    alert('登录时间过期，请重新登录')
                    props.history.push('/logonPage')
                }else{
                    setUploadOpen(true);
                    fileUpload('/register_major/upload_video',formData,token).then((result)=>{
                        setUploadOpen(false);
                        setMsg('提示：上传成功');
                        setMsgOpen(true);
                        setTimeout(()=>{props.history.push({
                            pathname:'/majorListPage',
                            accountId:props.accountId
                        });},1000)
                    }).catch((error)=>{
                        setMsg('提示：上传失败');
                        setMsgOpen(true);
                        setUploadOpen(false);
                        if(error.response.status===401){
                            CommonException(error,this);
                        }
                    })
                }

            }else{
                setMsgOpen(true);
                setMsg('提示：视频上传数量不正确');
            }
        }else{
            setMsgOpen(true);
            setMsg('提示：请查看上传说明并勾选我已阅读上传说明');
        }
    }
    const classes = useStyles();
    return(
        <div>
            <Grid container
                  direction="row"
                  spacing={2}
            >
                <Grid item  className={classes.gridItem}>
                    <Paper  className={classes.paper}>
                        <Grid item container justify="space-between">
                            <Grid item>
                                <Typography variant='body1' style={{padding:'1vh'}}>
                                    {info.student.student_name}&nbsp;&nbsp;&nbsp;{info.enter_major.major_name}{info.register_level}级
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Button id='uploadTextBtn' variant="outlined" color="primary" onClick={handleToggle}>
                                    查看上传说明
                                </Button>
                                <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
                                    <Paper style={{padding:'4vh',width:'35vh'}}>
                                        <Grid container spacing={2}>
                                            <Grid item>
                                                <img style={{width:'12vh'}} src={photo} alt='123'/>
                                            </Grid>
                                            <Grid item>
                                                <img style={{width:'12vh'}} src={photo} alt='123'/>
                                            </Grid>
                                            <Grid item>
                                                <img style={{width:'12vh'}} src={photo} alt='123'/>
                                            </Grid>
                                            <Grid item>
                                                <img style={{width:'12vh'}} src={photo} alt='123'/>
                                            </Grid>
                                            <Grid item>
                                                <img style={{width:'12vh'}} src={photo} alt='123'/>
                                            </Grid>
                                        </Grid>
                                        <Typography style={{marginTop:'3vh'}} variant='h6'>
                                            视频上传要求：
                                        </Typography>
                                        <Typography>
                                            1.读取手机已录制视频
                                        </Typography>
                                        <Typography>
                                            2.按以上拍摄示范图片角度拍摄
                                        </Typography>
                                        <Typography>
                                            3.拍摄场景要求简洁
                                        </Typography>
                                        <Typography>
                                            4.视频不允许后期剪辑，否则视为不合格
                                        </Typography>
                                    </Paper>
                                </Backdrop>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item className={classes.gridItem}>
                    <Paper style={{width:'100%',padding:'1vh'}}>
                        <form id='form1'>
                            <VideoSelectGrid videoList={videoList} onFileChange={handleFileChange} tracks={tracks} id={id}/>
                        </form>
                    </Paper>
                </Grid>
                <Grid item className={classes.gridItem}>
                    <Paper className={classes.paper}>
                        <Grid item justify="space-between" container>
                            <Grid item>
                                <Radio
                                    id='uploadTextRadio'
                                    checked={flag}
                                    onClick={handleFlagClick}
                                />我已阅读上传说明
                            </Grid>
                            <Grid item style={{}}>
                                <Button id='commitVideoBtn' variant="contained" color="primary" onClick={handleClick}>提交视频</Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                autoHideDuration={4500}
                onClose={handleMsgClose}
                open={msgOpen}
                message={msg}
                action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleMsgClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
            <Backdrop className={classes.backdrop} open={uploadOpen}>
                <CircularProgress color="inherit" />
                <Typography>正在上传，请稍等</Typography>
            </Backdrop>
        </div>
    );
}

export default withRouter(VideoUpload)
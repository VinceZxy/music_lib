import React from "react";
import {Grid, InputAdornment, Typography, TextField, FormControl,InputLabel} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import conn from "../../../util/actions/handleConnection";
import config from '../../../config/config.json'
import axios from 'axios'
import {_local} from "../../../util/actions/headleStorage";
import Snackbar from "@material-ui/core/Snackbar";
import logout from "../../../util/actions/handleLogout";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import subConn from "../../../util/actions/headleSubmit";
import CommonException from "../../../util/actions/headleException";

export default class Major extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            id:-1,
            oneMajor:{
                id: 0,
                instructor: "",
                instructor_phtone: "",
                mode: "",
                register_level: '',
                status: 0,
                student_id: 0,
                enter_major_id: 0,
                track1: {
                    "id": 0,
                    "track_name": ""
                },
                track2: {
                    "id": 0,
                    "track_name": ""
                },
                track3: {
                    "id": 0,
                    "track_name": ""
                },
                track4: {
                    "id": 0,
                    "track_name": ""
                },
                certificate: [
                    {
                        "id": 0,
                        "belong_committee": "",
                        "level": 0,
                        "certificate_image": "",
                        "get_time": "",
                        "register_info_id": 0
                    }
                ],
                enter_major: {
                    "id": 0,
                    "major_name": "",
                    "level": ""
                },
                student: {
                    "id": 0,
                    "student_name": "",
                    "name_pinyin": "",
                    "document_type": 0,
                    "id_number": "",
                    "sex": 0,
                    "nationality": "",
                    "nation": "",
                    "birth_time": "",
                    "photo": "",
                    "account_id": 0
                }
                },

            major:[{
                "id": 0,
                "major_name": "",
                "level": ""
            }],
            majorName:'',
            majorLevel: [],
            file: {},
            registerId:0,
            open:false,

            msgPh:'',
            //新增报考专业相关信息
            //所选报考专业id
            enter_major_id: '',
            mode: "",
            register_level: '',

            //指导老师信息
            instructor: "",
            instructor_phone: "",
            status: 0,

            //考试曲目
            track_1: '',
            track_2: '',
            track_3: '',
            track_4: '',

            //学员id
            student_id: sessionStorage.getItem('stuId'),

            //证书相关信息
            certificate:{},
            certificateId:null,
            belong_committee: "",
            level: '',
            certificate_image: "",
            get_time: "",

            track_4Status:false,
            track_3Status:false,
            track_2Status:false,
            track_1Status:false,
            teacherStatus:false,
            typeStatus:false,
            levelStatus:false,
            majorStatus:false,
            imgHidden:true,
            msg:''
        }
    }

    findMaxLevel(id){
        subConn('/major/get_major_byid/'+id,'get','',_local.get('token'))
            .then((res)=>{
                let array = [];
                for (let j=0;j<res.data.level;j++){
                    array.push(j+1)
                }
                this.setState({
                    majorLevel:array
                })
            })
    }
    onChange8(e){this.setState({level:e.target.value})}
    onChange7(e){this.setState({belong_committee:e.target.value})}
    onChange6(e){this.setState({get_time:e.target.value})}
    onChange5(e){this.setState({instructor_phone:e.target.value, teacherStatus:false,msgPh:''})}
    onChange4(e){this.setState({instructor:e.target.value,instructorStart:false})}
    onChange3(e){this.setState({mode:e.target.value, typeStatus:false})}
    onChange2(e){this.setState({register_level:e.target.value, levelStatus:false})}
    onChange1(e){
        this.setState({enter_major_id:e.target.value, majorStatus:false})
        // 存在专业  并且已选择专业
        if(e.target.value){
            this.findMaxLevel(e.target.value);
        }
    }

    onChangeTrack4(e){this.setState({track_4:e.target.value, track_4Status:false})}
    onChangeTrack3(e){this.setState({track_3:e.target.value, track_3Status:false})}
    onChangeTrack2(e){this.setState({track_2:e.target.value, track_2Status:false})}
    onChangeTrack1(e){this.setState({track_1:e.target.value, track_1Status:false})}

    reset(){
        this.setState({
            enter_major_id: '',
            mode: "",
            register_level: '',
            instructor: "",
            instructor_phone: "",
            status: 0,
            track_1: '',
            track_2: '',
            track_3: '',
            track_4: '',
            belong_committee: "",
            level: '',
            certificate_image: "",
            get_time: "",
            imgHidden:true,
            open:true,
            oneMajor:[],
            id:-1,
        })
    }

    optionBlur(name){

        this.setState({majorName:name})
    }
    componentDidMount() {

        // console.log(config.imgIp+'70numcode.png')
        //请求所有专业列表信息 根据水平考试id
        let id = 1;
        if(sessionStorage.getItem('levelId')){
            id = parseInt(sessionStorage.getItem('levelId'))
        }
        conn('/major/'+id,'get','',_local.get('token'))
            .then((result) => {
                this.setState({
                    major:result.data
                })
            })

        //修改时 查询一条报考信息
        let examinationID
        if(this.props.examinationID && this.props.examinationID!==-1){
            examinationID = this.props.examinationID
            conn('/register_major/major/'+examinationID,'get','',_local.get('token'))
                .then((result) => {
                    if(result.data){
                        // console.log(result.data)
                        if(result.data.enter_major){
                            this.findMaxLevel(result.data.enter_major.id);
                        }

                        this.setState({
                            enter_major_id: result.data.enter_major_id,
                            mode: result.data.mode,
                            register_level: result.data.register_level,

                            //指导老师信息
                            instructor: result.data.instructor,
                            instructor_phone: result.data.instructor_phtone,

                            //考试曲目
                            track_1: result.data.track1?result.data.track1.track_name:'',
                            track_2: result.data.track2?result.data.track2.track_name:'',
                            track_3: result.data.track3?result.data.track3.track_name:'',
                            track_4: result.data.track4?result.data.track4.track_name:'',

                            //学员id
                            student_id: result.data.student_id,

                            //证书相关信息
                            certificate:result.data.certificate[0],
                            belong_committee: result.data.certificate[0]?result.data.certificate[0].belong_committee:'',
                            level: result.data.certificate[0]?result.data.certificate[0].level:'',
                            certificate_image: result.data.certificate[0]?result.data.certificate[0].certificate_image:'',
                            get_time: result.data.certificate[0]?result.data.certificate[0].get_time:'',
                            certificateId:result.data.certificate[0]?result.data.certificate[0].id:'',
                            id:result.data.id,
                            file:config.imgIp+(result.data.certificate[0]?result.data.certificate[0].certificate_image:''),


                        })

                        // signImg  设置图片显示
                        let img = document.querySelector('#signImg')
                        if(result.data.certificate[0]){
                            this.setState({
                                imgHidden:false
                            })
                            img.src = config.imgIp+result.data.certificate[0].certificate_image
                        }else {
                            this.setState({imgHidden:true})
                        }

                    }
                })
        }

    }

    formSubmit(id,type){
        let formData1 = new FormData();
        formData1.append('id',this.state.certificateId)
        formData1.append('belong_committee',this.state.belong_committee)
        formData1.append('level',this.state.level)
        formData1.append('get_time',this.state.get_time.toString().substring(0,10))
        formData1.append('file',this.state.file)

        let cong= {headers: {'content-type': 'multipart/form-data',Authorization:_local.get('token')},}
        let uri=config.ip+'/certificate/'+id
        //type 有数据表示修改证书信息
        if(type){

            axios.put(uri,formData1,cong).then((res)=>{
                if(res.status){
                    document.querySelector('#signImg').src='';
                    this.reset();
                    this.setState({msg:"修改成功"})
                }
            }).catch((err)=>{
                // this.setState({msg:err.response.data,open:true})
                // CommonException(err,this)
            })
        }else {

            axios.post(uri,formData1,cong)
                .then((res)=>{
                    if(res.status){
                        document.querySelector('#signImg').src='';
                        this.reset();
                        this.setState({msg:"添加成功"})
                    }
                }).catch((err)=>{
                this.setState({msg:err.response.data,open:true})
                CommonException(err,this)
            })
        }

    }
    majorSubmit(){
        const majorInfo = {
            "instructor": this.state.instructor,
            "instructor_phtone": this.state.instructor_phone,
            "mode": this.state.mode,
            "register_level": this.state.register_level,
            "status": null,
            "track_1": this.state.track_1,
            "track_2": this.state.track_2,
            "track_3": this.state.track_3,
            "track_4": this.state.track_4,
            "student_id": this.state.student_id,
            "enter_major_id": this.state.enter_major_id,
            "id":this.state.id
        }

        const pone = /^1[3|4|5|7|8][0-9]{9}$/;
        if (this.state.mode===null||this.state.mode.trim()===''){
            this.setState({typeStatus:true,})
        }
        if(this.state.register_level<=0){
            this.setState({levelStatus:true,})
        }
        if (this.state.enter_major_id <=0 ){
            this.setState({majorStatus:true,})
        }
        if (!this.state.instructor.trim()){
            this.setState({instructorStart:true,})
        }
        if (this.state.instructor_phone.trim() ===''|| this.state.instructor_phone.length!==11 ||!pone.test(this.state.instructor_phone)){
            this.setState({teacherStatus:true,msgPh:'请正确输入手机',instructor_phone:''})
        }
        if (this.state.track_1===this.state.track_2){
            this.setState({track_2Status:true,track_2:''})}
        if(this.state.track_1.trim()===''){
            this.setState({track_1Status:true})
        }
        if(this.state.track_2.trim()===''){
            this.setState({track_2Status:true,})
        }


        //新增功能 完善信息
        if(this.state.mode && this.state.register_level &&
            this.state.enter_major_id && this.state.track_1 && this.state.track_1!==this.state.track_2 &&
            this.state.track_2 && this.state.instructor && pone.test(this.state.instructor_phone) &&
            this.state.instructor_phone && this.state.id<=0){
   
            conn("/register_major/",'post',majorInfo,_local.get('token'))
                .then((res)=>{
                    // console.log(res.data)
                    if(res.status===200){
                        this.setState({
                            registerId:res.data.id,
                        })
                        if(this.state.file && this.state.belong_committee &&
                            this.state.level && this.state.get_time){
                            this.formSubmit(this.state.registerId,'')
                        }else {
                            this.setState({
                                msg:"添加成功"
                            })
                            this.reset();
                            document.querySelector('#signImg').src='';
                        }
                    }
                }).catch((err)=>{
                    this.setState({msg:err.response.data,open:true})
                    CommonException(err,this)
                })
            //修改信息
        }else if(this.state.mode.trim() && this.state.register_level &&
            this.state.enter_major_id && this.state.track_1.trim() &&
            this.state.track_2.trim() && this.state.instructor && pone.test(this.state.instructor_phone) &&
            this.state.instructor_phone.trim() && this.state.id>0){

            //修改时 如果没有相关证书信息  用户可进行添加
            if(!this.state.certificate &&this.state.file && this.state.belong_committee &&
                this.state.level && this.state.get_time){
                this.formSubmit(this.props.examinationID,'')
            }else if(this.state.certificate){
                this.formSubmit(this.props.examinationID,'put');
            }
            // this.formSubmit(this.props.examinationID,'put');
            axios.put(config.ip+"/register_major/update_register_major",majorInfo,
                {headers:{Authorization:_local.get('token')}})
                .then((res)=>{
                    if(res.status===200){
                        this.setState({
                            msg:'修改成功'
                        })
                    }
                    this.reset();
                }).catch((err)=>{
                    this.setState({msg:err.response.data,open:true})
                    CommonException(err,this)
            })
        }
    }

    fileUploadChange(e){
        this.setState({
            imgHidden:false,
            file:e.target.files[0]
        })
        this.creatFileSrc(e.target.files[0]);
        console.log(e.target.files[0])
    }

    creatFileSrc = (videoFile) => {
        const reader = new FileReader();
        let img;
        reader.onload = (evt) => {
            img = document.querySelector('#signImg');
            img.src = evt.target.result;
        };
        reader.readAsDataURL(videoFile);
    }

    render() {
        return(
            <Grid container direction="column" alignItems="center" >
                <Grid container direction="row" justify="space-evenly" alignItems="baseline" style={{margin:'3vh'}}>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        autoHideDuration={3500}
                        open={this.state.open}
                        message={this.state.msg}
                        action={<Button id="sureBtn" onClick={()=>{this.setState({open:false})}} size="small" color="inherit">确定</Button>}
                    />
                    <Grid item ><Typography variant="h6">{this.state.id>0?'修改报名资料':'填写报名资料'}</Typography></Grid>
                    <Grid item>
                        <Button id="backBtn" onClick={()=>{this.props.history.push('/majorListPage')}}  size="medium" color='primary'>{"<返回"}</Button>
                        <Button id="outBtn" size="medium" color='primary' onClick={()=>{logout(_local.get('token'),this.props,'操作成功, 请登录')}}>
                            <InputAdornment>
                                <PowerSettingsNewIcon />
                            </InputAdornment>
                            注销
                        </Button>

                </Grid>
                </Grid>
                <Grid container style={{backgroundColor:"white",paddingLeft:'2vh'}}>
                    <Typography variant="h6">报名信息</Typography>
                    <Grid container spacing={2}>
                        <Grid item >
                            <FormControl variant="outlined" error={this.state.majorStatus} margin="normal">
                                <InputLabel>专业名称*</InputLabel>
                                <Select
                                    style={{width:'26vh'}}
                                    id="majorId"
                                    value={this.state.enter_major_id}
                                    onChange={this.onChange1.bind(this)}
                                >

                                    {this.state.major.map((option,index) => (
                                        <MenuItem id={"menuChange"+index} key={index+'optionMajor'} value={option.id} onClick={this.optionBlur.bind(this,option.major_name)}>{option.major_name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item >
                            <FormControl variant="outlined" error={this.state.levelStatus} margin="normal">
                                <InputLabel>报考级别*</InputLabel>
                                <Select
                                    style={{width:'26vh'}}
                                    id="examinationLevel"
                                    value={this.state.register_level}
                                    onChange={this.onChange2.bind(this)}
                                >
                                    {/*{this.MenuOption()}*/}
                                    {this.state.majorLevel.map((option,num) => (
                                        <MenuItem id={"level"+num} value={option} key={option+"1023"}>
                                            {option}级
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <FormControl variant="outlined" error={this.state.typeStatus} margin="normal">
                                <InputLabel>考试方式*</InputLabel>
                                <Select
                                    style={{width:'26vh'}}
                                    id="examinationType"
                                    value={this.state.mode}
                                    onChange={this.onChange3.bind(this)}
                                >
                                    {['现场考试','视频考试'].map((option,i) => (
                                        <MenuItem id={"mode"+i} value={option} key={option+i}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item><Typography variant="h6">指导老师信息</Typography></Grid>
                        <Grid container spacing={2}>
                            <Grid  item>
                                <TextField
                                    error={this.state.instructorStart}
                                    style={{width:'100%'}}
                                    id="teacherName"
                                    size="small"
                                    value={this.state.instructor}
                                    onChange={this.onChange4.bind(this)}
                                    variant="outlined"
                                    margin="normal"
                                    placeholder="指导老师姓名"
                                />
                            </Grid>
                            <Grid  item>
                                <TextField
                                    style={{width:'100%'}}
                                    error={this.state.teacherStatus}
                                    id="teacherPhone"
                                    size="small"
                                    value={this.state.instructor_phone}
                                    onChange={this.onChange5.bind(this)}
                                    variant="outlined"
                                    margin="normal"
                                    placeholder="指导老师电话"
                                    helperText={this.state.msgPh}
                                />
                            </Grid>
                        </Grid>
                        <Grid item ><Typography variant="h6">考试曲目信息</Typography></Grid>
                        <Grid container spacing={2}>
                            <Grid  item>
                                <TextField
                                    style={{width:'100%'}}
                                    id="track_1"
                                    size="small"
                                    error={this.state.track_1Status}
                                    value={this.state.track_1}
                                    onChange={this.onChangeTrack1.bind(this)}
                                    variant="outlined"
                                    margin="normal"
                                    placeholder="考试曲目1*"
                                />
                            </Grid>
                            <Grid  item>
                                <TextField
                                    style={{width:'100%'}}
                                    id="track_2"
                                    size="small"
                                    error={this.state.track_2Status}
                                    value={this.state.track_2}
                                    onChange={this.onChangeTrack2.bind(this)}
                                    variant="outlined"
                                    margin="normal"
                                    placeholder="考试曲目2*"
                                />
                            </Grid>
                            <Grid  item>
                                <TextField
                                    style={{width:'100%'}}
                                    id="track_3"
                                    size="small"
                                    error={this.state.track_3Status}
                                    value={this.state.track_3}
                                    onChange={this.onChangeTrack3.bind(this)}
                                    variant="outlined"
                                    margin="normal"
                                    placeholder="考试曲目3"
                                />
                            </Grid>
                            <Grid  item>
                                <TextField
                                    style={{width:'100%'}}
                                    id="track_4"
                                    size="small"
                                    error={this.state.track_4Status}
                                    value={this.state.track_4}
                                    onChange={this.onChangeTrack4.bind(this)}
                                    variant="outlined"
                                    margin="normal"
                                    placeholder="考试曲目4"
                                />
                            </Grid>
                        </Grid>

                        <form target="PhotoFile" onSubmit={this.formSubmit.bind(this)}>
                            <Grid container direction="row"
                                  justify="space-between" alignItems="center">
                                <Grid item component="span" style={{margin:'3vh'}}>
                                    已获{this.state.majorName===''?'钢琴':this.state.majorName}证书   {/*<Button color="primary">加载历史证书</Button>*/}
                                </Grid>
                            </Grid>
                            <Grid container item spacing={3}>
                                <Grid  item>
                                    <TextField
                                        id="signTime"
                                        label="获得时间"
                                        name="get_time"
                                        type="date"
                                        style={{width:'100%'}}
                                        onChange={this.onChange6.bind(this)}
                                        value={this.state.get_time.toString().substring(0,10)}
                                        size="small"
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid  item>
                                    <TextField
                                        style={{width:'100%'}}
                                        id="signMeet"
                                        name="belong_committee"
                                        label="所属考级委员会"
                                        size="small"
                                        value={this.state.belong_committee}
                                        onChange={this.onChange7.bind(this)}
                                        variant="outlined"
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid  item>
                                    <TextField
                                        style={{width:'100%'}}
                                        id="signMajorName"
                                        // label="所属专业名称"
                                        disabled
                                        size="small"
                                        variant="outlined"
                                        margin="normal"
                                        value={this.state.majorName===''?'钢琴':this.state.majorName}
                                    />
                                </Grid>
                                <Grid  item>
                                    <FormControl variant="outlined" margin="normal" size="small">
                                        <InputLabel>请选择获得级别</InputLabel>
                                        <Select
                                            style={{width:'26vh'}}
                                            id="level"
                                            value={this.state.level}
                                            onChange={this.onChange8.bind(this)}
                                        >
                                            {this.state.majorLevel.map((option,i) => (
                                                <MenuItem id={"signLevel"+i} value={option} key={option+"1023"+i}>
                                                    {option}级
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid  item>
                                    <input type="file"
                                           id="majorUpload"
                                           accept="image/*"
                                           name="file"
                                           style={{display:'none'}}
                                           onChange={this.fileUploadChange.bind(this)}
                                    />
                                    <label htmlFor="majorUpload">
                                        <Button id={"loadImgBtn"} color="primary" component="span">上传证书图片</Button>&nbsp;&nbsp;&nbsp;
                                    </label>
                                    <Button id={"deleteImgBtn"} style={{marginLeft:'3vh'}}  color="primary" component="span" onClick={()=>{this.setState({imgHidden:true})}}>删除</Button>
                                    <Grid>
                                        <img hidden={this.state.imgHidden} style={{padding:'2vh'}} width='200vh' id='signImg' alt='图片预览'/>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </form>
                        <iframe title='photo' id="id_iframe" name="PhotoFile" style={{display:"none"}}></iframe>
                        <Grid container justify="center" style={{margin:'3vh'}}>
                            <Button id="updateBtn" variant="contained" color="primary" onClick={this.majorSubmit.bind(this)} style={{marginRight:'10vh'}}>
                                {this.state.id>0?'修改':'提交'}
                            </Button>
                            <Button id="rowBackBtn" onClick={()=>{this.props.history.push('/majorListPage')}} variant="contained">返回</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

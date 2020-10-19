/**
 * @Description:
 * @author Chen
 * @date 2020-08-24 11:07
 */

import React from 'react';
import {withRouter} from 'react-router';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import nations from "../../../config/nationList.json"
import nationalities from "../../../config/nationality.json"
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import conn from "../../../util/actions/handleConnection";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import config from '../../../config/config.json'
import fileUpload from "../../../util/actions/handleFileUpload";
import {_local} from "../../../util/actions/headleStorage";
import tokenExpired from "../../../util/actions/handleTokenExpired";
import BackupIcon from '@material-ui/icons/Backup';
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import CommonException from "../../../util/actions/headleException";

class Student extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            studentId: -1,
            studentName: '',
            studentNameMsg: '',
            studentNameState: false,

            nameLetter: '',
            nameLetterMsg: '',
            nameLetterState: false,

            documentType: '',
            //1身份证
            //2港澳台身份证
            //3户口本
            //4护照
            documentTypeState: false,

            idNumber: '',
            idNumberMsg: '*温馨提示：证件号码输入错误自行承担',
            idNumberState: false,

            sex: '',
            //0男
            //1女
            sexState: false,

            //学员国籍
            nationality: '',
            nationalityState: false,

            //学员民族
            nation: '',
            nationState: false,

            birthTime: '',
            birthTimeMsg: '',
            birthTimeState: false,
            photoFile: {},

            levelId:'',
            mechanismId:'',
            photoName: '',
            havePhoto: false,
            accountId: '',
            open: false,
            msg: '提示：新增学员成功',
            imgHidden: true,
            addOpen:false
        }
    }
    handleAddOpenChange=()=>{
        this.setState({
            addOpen:!this.state.addOpen
        })
    }
    //学生姓名改变
    handleStudentNameChange = (event) => {
        const value=event.target.value
        if(value.lastIndexOf(' ')!==-1){
            this.setState({
                studentNameState: true,
                studentNameMsg: '提示：姓名中不允许有空格'
            })
        }else if (value=== '') {
            this.setState({
                studentNameState: true,
                studentNameMsg: '提示：请填写姓名'
            })
        } else {

            this.setState({
                studentNameState: false,
                studentNameMsg: '',
            })
        }
        this.setState({
            studentName: event.target.value
        })
    }
    //姓名拼音改变
    handleNameLetterChange = (event) => {
        const value=event.target.value
        if(value.lastIndexOf(' ')!==-1){
            this.setState({
                nameLetterState: true,
                nameLetterMsg: '提示：姓名拼音不能有空格'
            })
        }else if (value === '') {
            this.setState({
                nameLetterState: true,
                nameLetterMsg: '提示：请填写姓名拼音'
            })
        } else {
            this.setState({
                nameLetterState: false,
                nameLetterMsg: '',
            })
        }
        this.setState({
            nameLetter: event.target.value
        })
    }
    //证件类型改变
    handleDocumentTypeChange = (event) => {
        this.setState({
            documentTypeState: false,
            documentType: event.target.value,
            open: false
        })
    }
    //证件号码改变
    handleIdNumberChange = (event) => {
        //控制身份证号码长度
        if (event.target.value.length < 19) {
            this.setState({
                idNumber: event.target.value
            })
        }
        //身份证号码正确与否的提示语
        if(event.target.value.lastIndexOf(' ')!==-1){
            this.setState({
                idNumberState: true,
                idNumberMsg: '*温馨提示：证件号码中不能有空格',
            })
        }else if (event.target.value.length === 18 || event.target.value.length === 19) {
            this.setState({
                idNumberState: false,
                idNumberMsg: '*温馨提示：证件号码输入错误自行承担',
            })
        } else {
            this.setState({
                idNumberState: true,
                idNumberMsg: '提示：请输入正确格式的证件号码'
            })
        }
    }
    //性别改变
    handleSexChange = (event) => {
        this.setState({
            sex: event.target.value,
            sexState: false,
            open: false
        })
    }
    //国籍
    handleNationalityChange = (event) => {
        this.setState({
            nationality: event.target.value,
            nationalityState: false,
            open: false
        })
    }
    //民族
    handleNationChange = (event) => {
        this.setState({
            nation: event.target.value,
            nationState: false,
            open: false
        })
    }
    //出生年月日
    handleBirthTimeChange = (event) => {
        this.setState({
            birthTime: event.target.value,
            birthTimeState: false,
            open: false,
            birthTimeMsg:''
        })
    }
    //照片名称
    handlePhotoChange = (event) => {
        this.setState({
            photoName: event.target.files[0].name,
            imgHidden: false,
            open: false,
            havePhoto: true
        })
        this.creatFileSrc(event.target.files[0]);
        this.setState({
            photoFile: event.target.files[0]
        })
    }
    creatFileSrc = (videoFile) => {
        const reader = new FileReader();
        let img;
        reader.onload = (evt) => {
            img = document.querySelector('#uploadImg');
            img.src = evt.target.result;
        };
        reader.readAsDataURL(videoFile);
    }
    //提交
    handleSubmitClick = () => {
        if (this.state.studentName === '') {
            this.setState({
                studentNameState: true,
                studentNameMsg: '提示：请填写姓名',
            })
        }
        if (this.state.nameLetter === '') {
            this.setState({
                nameLetterState: true,
                nameLetterMsg: '提示：请填写姓名拼音',
            })
        }
        if (this.state.documentType === '') {
            this.setState({
                documentTypeState: true,
                open: true,
                msg: '提示：请选择证件类型',
            })
        }
        if (this.state.idNumber === '') {
            this.setState({
                idNumberState: true,
                idNumberMsg: '提示：请填写证件号码',
            })
        }
        if (this.state.sex === '') {
            this.setState({
                sexState: true,
                open: true,
                msg: '提示：请选择性别',
            })
        }
        if (this.state.nation === '') {
            this.setState({
                nationState: true,
                open: true,
                msg: '提示：请选择民族',
            })
        }
        if (this.state.nationality === '') {
            this.setState({
                nationalityState: true,
                open: true,
                msg: '提示：请选择国籍',
            })
        }
        if (this.state.birthTime === '') {
            this.setState({
                birthTimeState: true,
                birthTimeMsg: '提示：请选择出生年月日',
            })
        }
        if (this.state.photoName === '') {
            this.setState({
                photoName: '请选择照片',
                open: true,
                msg: '提示：请选择照片',
            })
        }
        const state=this.state
        if (state.studentName !== '' &&
            state.studentName.lastIndexOf(' ')===-1&&
            state.nameLetter !== '' &&
            state.nameLetter.lastIndexOf(' ')===-1&&
            state.documentType !== '' &&
            state.idNumber.length === 18 &&
            state.idNumber.lastIndexOf(' ')===-1&&
            state.sex !== '' &&
            state.nation !== '' &&
            state.nationality !== '' &&
            state.birthTime !== '' &&
            (state.photoName !== '' && state.photoName !== '请选择照片')
        ) {
            let method;
            let photoName;
            if (this.state.havePhoto) {
                photoName=new Date().getTime()+this.state.photoName
            }else{
                photoName=this.state.photoName
            }
            //修改与增加只是提交方式不同，判断是修改还是提交后修改提交方式
            if (this.state.studentId !== -1) {
                //修改操作
                method = 'PUT'
            } else {
                //增加
                method = 'POST'
            }
            const studentInfo = {
                "id": this.state.studentId,
                "student_name": this.state.studentName,
                "name_pinyin": this.state.nameLetter,
                "document_type": this.state.documentType,
                "id_number": this.state.idNumber,
                "sex": this.state.sex,
                "nationality": this.state.nationality,
                "nation": this.state.nation,
                "birth_time": this.state.birthTime,
                "photo": photoName,
                "account_id": this.state.accountId,
                "mechanism_id":this.state.mechanismId,
                "levetest_id":this.state.levelId,
            }

            const token = _local.get('token')
            if (token === false) {
                tokenExpired(this)
            } else {
                this.handleAddOpenChange(true);
                conn('/student/', method, studentInfo, token).then((result) => {
                    if (result.status === 200) {
                        // 成功后将数据初始化
                        document.querySelector('#uploadImg').src = '';
                        this.setState({
                            open: true,
                            studentName: '',
                            studentNameMsg: '',
                            studentNameState: false,
                            nameLetter: '',
                            nameLetterMsg: '',
                            nameLetterState: false,
                            documentType: '',
                            documentTypeState: false,
                            idNumber: '',
                            idNumberMsg: '*温馨提示：证件号码输入错误自行承担',
                            idNumberState: false,
                            sex: '',
                            sexState: false,
                            //学员国籍
                            nationality: '',
                            nationalityState: false,
                            //学员民族
                            nation: '',
                            nationState: false,
                            birthTime: '1000-01-01',
                            birthTimeMsg: '',
                            birthTimeState: false,
                            photoName: '',
                            imgHidden: true,
                            addOpen:false
                        })
                        // 判断是修改还是新增操作
                        if (this.state.studentId !== -1) {
                            //修改
                            this.props.onMsgChange('提示：修改学员信息成功');
                            this.props.onOpenChange(true);
                            this.props.history.push('/studentListPage')
                        } else {
                            //增加
                            this.setState({
                                msg: '提示：新增学员成功,如需查看请返回',
                            })
                        }

                    }
                }).catch((error) => {
                    console.log(error)
                    console.log(error.response)
                    if(error.response.status===401){
                        CommonException(error,this);
                    }
                    this.setState({
                        open: true,
                        msg: '增加学员失败',
                        addOpen:false
                    })
                })
            }
            if (this.state.havePhoto) {
                let formData = new FormData();
                formData.append('file', this.state.photoFile,photoName)
                const token = _local.get('token')
                if (token === false) {
                    tokenExpired(this)
                } else {
                    fileUpload('/student/upload_photos', formData, token).then()
                        .catch((error) => {
                            if(error.response.status===401){
                                CommonException(error,this);
                            }
                        })
                }
            }
        }
    }

    //提示框关闭
    handleClose = () => {
        this.setState({
            open: false
        })
    }

    componentDidMount() {
        const info = this.props.studentInfo
        this.setState({
            accountId: this.props.accountId,
            mechanismId:this.props.mechanismId,
            levelId:this.props.levelId
        })
        if (this.props.studentInfo !== undefined && this.props.studentInfo !== null) {
            this.setState({
                studentId: info.id,
                studentName: info.student_name,
                nameLetter: info.name_pinyin,
                documentType: info.document_type,
                //1身份证
                //2港澳台身份证
                //3户口本
                //4护照
                idNumber: info.id_number,
                sex: info.sex,
                //0男
                //1女
                //学员国籍
                nationality: info.nationality,
                //学员民族
                nation: info.nation,
                birthTime: info.birth_time,
                photoName: info.photo,
                open: false,
                msg: '提示：新增学员成功',
                imgHidden: false
            })
            let img = document.querySelector('#uploadImg');
            img.src = info.photo === '' ? '' : config.imgIp + info.photo
            img.alt = info.photo === '' ? '无学生照片' : '图片预览'
        }
    }

    render() {
        const nationsRows = nations.nations.map((nation) =>
            <MenuItem  value={nation} key={nation}>{nation}</MenuItem>
        );
        const nationalityRows = nationalities.nationalities.map((nationality) =>
            <MenuItem value={nationality} key={nationality}>{nationality}</MenuItem>
        );
        return (
            <Paper>
                <form>
                    <Grid style={{padding: '18px'}} spacing={5} container>
                        <Grid spacing={7} item container>
                            <Grid item>
                                <TextField
                                    id='studentNameInput'
                                    error={this.state.studentNameState}
                                    label="学员姓名*"
                                    variant="outlined"
                                    style={{minWidth: '35vh'}}
                                    value={this.state.studentName}
                                    onChange={this.handleStudentNameChange}
                                    helperText={this.state.studentNameMsg}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    id='studentNameLetterInput'
                                    error={this.state.nameLetterState}
                                    label="学员姓名拼音*"
                                    variant="outlined"
                                    style={{minWidth: '35vh'}}
                                    value={this.state.nameLetter}
                                    onChange={this.handleNameLetterChange}
                                    helperText={this.state.nameLetterMsg}
                                />
                            </Grid>
                            <Grid item>
                                <FormControl id='typeOfCertificateFm' error={this.state.documentTypeState} variant="outlined"
                                             style={{minWidth: '20vh'}}>
                                    <InputLabel id="typeOfCertificateLabel">证件类型*</InputLabel>
                                    <Select
                                        id='typeOfCertificateSelect'
                                        labelId="typeOfCertificateLabel"
                                        label="证件类型"
                                        value={this.state.documentType}
                                        onChange={this.handleDocumentTypeChange}
                                    >
                                        <MenuItem value={1}>身份证</MenuItem>
                                        <MenuItem value={2}>港澳台身份证</MenuItem>
                                        <MenuItem value={3}>户口本</MenuItem>
                                        <MenuItem value={4}>护照</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <TextField
                                    id='idNumberInput'
                                    error={this.state.idNumberState}
                                    helperText={this.state.idNumberMsg}
                                    label="证件号码*"
                                    variant="outlined"
                                    style={{minWidth: '35vh'}}
                                    value={this.state.idNumber}
                                    onChange={this.handleIdNumberChange}
                                />
                            </Grid>
                        </Grid>
                        <Grid item container spacing={7}>
                            <Grid item>
                                <FormControl id='sexFm' error={this.state.sexState} variant="outlined" style={{minWidth: '20vh',}}>
                                    <InputLabel id="sexLabel">性别*</InputLabel>
                                    <Select
                                        id='sexSelect'
                                        labelId="sexLabel"
                                        label="性别*"
                                        value={this.state.sex}
                                        onChange={this.handleSexChange}
                                    >
                                        <MenuItem value={0}>男</MenuItem>
                                        <MenuItem value={1}>女</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <FormControl id='nationFm' error={this.state.nationState} variant="outlined"
                                             style={{minWidth: '15vh'}}>
                                    <InputLabel id="nationLabel">民族*</InputLabel>
                                    <Select
                                        id='nationSelect'
                                        value={this.state.nation}
                                        labelId="nationLabel"
                                        label="民族*"
                                        onChange={this.handleNationChange}
                                    >
                                        {nationsRows}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <FormControl id='nationalityFm' error={this.state.nationalityState} variant="outlined"
                                             style={{minWidth: '15vh'}}>
                                    <InputLabel id="nationalityLabel">国籍*</InputLabel>
                                    <Select
                                        id='nationalitySelect'
                                        labelId="nationalityLabel"
                                        label="国籍*"
                                        value={this.state.nationality}
                                        onChange={this.handleNationalityChange}
                                    >
                                        {nationalityRows}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <TextField
                                    id='birthdayInput'
                                    error={this.state.birthTimeState}
                                    label="出生年月日"
                                    type="date"
                                    value={this.state.birthTime}
                                    onChange={this.handleBirthTimeChange}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    helperText={this.state.birthTimeMsg}
                                />
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Typography style={{paddingBottom: '2vh'}}>上传两寸个人彩照*</Typography>
                            <input
                                accept="image/*"
                                id="studentPhotoFile"
                                type="file"
                                name="file"
                                hidden
                                onChange={this.handlePhotoChange}
                            />
                            <label htmlFor="studentPhotoFile">
                                <Button id='uploadPhotoBtn' startIcon={<BackupIcon/>} variant="contained" color="primary" component="span">
                                    &nbsp;&nbsp;&nbsp;上传图片&nbsp;&nbsp;&nbsp;
                                </Button>
                            </label>
                            <br/>
                            <img hidden={this.state.imgHidden} style={{padding: '2vh'}} width='200vh' id='uploadImg' alt='图片预览'/>
                        </Grid>
                        <Grid item container spacing={6}>
                            <Grid item>
                                <Button id='commitBtn' onClick={this.handleSubmitClick} startIcon={<ArrowUpwardIcon/>}
                                        variant="contained" color='primary'>提交</Button>
                            </Grid>
                            <Grid item>
                                <Button id='backListBtn' startIcon={<ArrowBackIosIcon/>} variant="contained" onClick={() => {
                                    this.props.history.push('/studentListPage')
                                }} color='secondary'>返回</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    autoHideDuration={4500}
                    onClose={this.handleClose}
                    open={this.state.open}
                    message={this.state.msg}
                    action={
                        <React.Fragment>
                            <IconButton size="small" aria-label="close" color="inherit" onClick={this.handleClose}>
                                <CloseIcon fontSize="small"/>
                            </IconButton>
                        </React.Fragment>
                    }
                />
                <Backdrop style={{zIndex: 1, color: '#fff',}} open={this.state.addOpen}>
                    <CircularProgress color="inherit" />
                    <Typography>请稍等...</Typography>
                </Backdrop>
            </Paper>

        );
    }
}

export default withRouter(Student);
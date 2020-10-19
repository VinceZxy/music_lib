import React from 'react';
import { makeStyles,  } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import conn from "../../../util/actions/handleConnection";
import {_local} from "../../../util/actions/headleStorage";
import Grid from "@material-ui/core/Grid";
import putConn from "../../../util/actions/handlePut";
import CommonException from "../../../util/actions/headleException";
// import TablePagination from "@material-ui/core/TablePagination";


const useStyles1 = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}));

export default class Review extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            registerMajors:[
                {
                    "id": null,
                    "instructor": "",
                    "instructor_phtone": "",
                    "mode": "string",
                    "register_level": 0,
                    "status": 0,
                    "video_status": 0,
                    "track1": {
                        "id": 0,
                        "track_name": ""
                    },
                    "track2": {
                        "id": 0,
                        "track_name": ""
                    },
                    "track3": {
                        "id": 0,
                        "track_name": ""
                    },
                    "track4": {
                        "id": 0,
                        "track_name": ""
                    },
                    "student_id": 0,
                    "enter_major_id": 0,
                    "certificate": [
                        {
                            "id": 0,
                            "belong_committee": "",
                            "level": 0,
                            "certificate_image": "",
                            "get_time": "",
                            "register_info_id": 0
                        }
                    ],
                    "enter_major": {
                        "id": 0,
                        "major_name": "",
                        "level": ""
                    },
                    "student": {
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
                }
            ],

            page:'',
            pageSize:'',
            msg:''

        }
    }

    //查询所有待审核的专业信息
    findReview(){
        conn('/register_major/','get','',_local.get('token'))
            .then((res)=>{
                if(res.status===200){
                    this.setState({
                        registerMajors:res.data
                    })
                }
            }).catch((err)=>{
            CommonException(err,this)
            this.props.onOpenChange(true);
            this.props.onMsgChange(this.state.msg)
        })
    }

    componentDidMount() {
        this.findReview();
    }

    //打回
    cancelReview(id){
        putConn('/register_major/examine_fail/'+id,'get')
            .then((res)=>{
                this.props.onOpenChange(true)
                this.props.onMsgChange('操作成功')
        }).catch(()=>{
            this.props.onOpenChange(true)
            this.props.onMsgChange('网络异常')
        })
    }

    //通过审核
    okReview(id){
        putConn('/register_major/examine_success/'+id,'get')
            .then((res)=>{
                this.props.onOpenChange(true)
                this.props.onMsgChange('操作成功')
                if(res.status===200){
                    this.findReview();
                }
         }).catch(()=>{
            this.props.onOpenChange(true)
            this.props.onMsgChange('网络异常')
        })
    }


    //   学院 《==》 水平考试
    //水平考试 《==》 机构
    //   学院 《==》 机构  1:n

    render() {
        return (
             <Grid container>
                    <TableContainer component={Paper} style={{margin:"auto",paddingBottom:'4vh'}}>
                    <Table className={useStyles1.table} aria-label="custom pagination table">
                        <TableBody>
                            <TableRow>
                                {/*<TableCell component="th" scope="row">*/}
                                <TableCell style={{ width: 0 }} align="center">
                                    姓名
                                </TableCell>
                                <TableCell style={{ width: 0 }} align="center">
                                    报考专业名称
                                </TableCell>
                                <TableCell style={{ width: 0 }} align="center">
                                    报考等级
                                </TableCell>
                                <TableCell style={{ width: 0 }} align="center">
                                    指导老师
                                </TableCell>
                                <TableCell style={{ width: 0 }} align="center">
                                    指导老师电话
                                </TableCell>
                                <TableCell style={{ width: 0 }} align="center">
                                    考试方式
                                </TableCell>
                                <TableCell style={{ width: 0 }} align="center">
                                    考试曲目1
                                </TableCell>
                                <TableCell style={{ width: 0 }} align="center">
                                    考试曲目2
                                </TableCell>
                                <TableCell style={{ width: 0 }} align="center">
                                    考试曲目3
                                </TableCell>
                                <TableCell style={{ width: 0 }} align="center">
                                    考试曲目4
                                </TableCell>
                                <TableCell style={{ width: 0 }} align="center">
                                    操作
                                </TableCell>

                            </TableRow>
                        </TableBody>
                        <TableBody>
                            {/*{((this.state.registerMajors.length>0?this.state.registerMajors:[]).map((row,i) => (*/}
                            {(this.state.registerMajors.map((row,i) => (
                                <TableRow key={row.name+'23'+i}>
                                    <TableCell align="center">
                                        {row.student.student_name}
                                    </TableCell>
                                    <TableCell style={{ width: 0 }} align="center">
                                        {row.enter_major.major_name}
                                    </TableCell>
                                    <TableCell style={{ width: 0 }} align="center">
                                        {row.register_level}
                                    </TableCell>
                                    <TableCell style={{ width: 0 }} align="center">
                                        {row.instructor}
                                    </TableCell>
                                    <TableCell style={{ width: 0 }} align="center">
                                        {row.instructor_phtone}
                                    </TableCell>
                                    <TableCell style={{ width: 0 }} align="center">
                                        {row.mode}
                                    </TableCell>
                                    <TableCell style={{ width: 0 }} align="center">
                                        {row.track1?row.track1.track_name:''}
                                    </TableCell>
                                    <TableCell style={{ width: 0 }} align="center">
                                        {row.track2?row.track2.track_name:''}
                                    </TableCell>
                                    <TableCell style={{ width: 0 }} align="center">
                                        {row.track3?row.track3.track_name:''}
                                    </TableCell>
                                    <TableCell style={{ width: 0 }} align="center">
                                        {row.track4?row.track4.track_name:''}
                                    </TableCell>

                                    <TableCell style={{ width: 0 }} align="center">
                                        <Button id={"okSignBtn"+i} onClick={this.okReview.bind(this,row.id)} color="primary">通过审核</Button>
                                        <Button id={"noSignBtn"+i} onClick={this.cancelReview.bind(this,row.id)}>打回</Button>
                                    </TableCell>
                                </TableRow>
                            )))}
                        </TableBody>
                        {/*<TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            // count={rows.length}
                            // rowsPerPage={rowsPerPage}
                            // page={page}
                            // onChangePage={handleChangePage}
                            // onChangeRowsPerPage={handleChangeRowsPerPage}
                        />*/}
                    </Table>
                </TableContainer>
            </Grid>
        )
    }
}


import React from 'react';
import ReactDOM from 'react-dom';
import {Route} from 'react-router'
import { HashRouter, BrowserRouter} from "react-router-dom";
import StartSignPage from './page/startSignPage';
import QRCodePage from "./page/qrCodePage";
import Container from "@material-ui/core/Container";
import StudentListPage from '../src/page/studentListPage'
import {MuiThemeProvider, createMuiTheme, responsiveFontSizes} from "@material-ui/core";
import LogonPage from './page/loginPage'
import RegisterPage from "./page/registerPage";
import StudentPage from "./page/studentPage";
import MajorListPage from './page/majorListPage'
import AddMajorPage from './page/addMajorPage'
import VideoUploadPage from "./page/videoUploadPage";
import FindOneMajor from "./page/findOneMajor";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Snackbar from "@material-ui/core/Snackbar";
import ReviewPage from "./page/reviewPage";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);


class RouterComm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mechanismId: 1,
            levelTestId: 1,
            open: false,
            msg: ''
        }
    }

    handleOpenChange = (open) => {
        this.setState({
            open: open
        })
    }
    handleMsgChange = (msg) => {
        this.setState({
            msg: msg
        })
    }
    handleClose = () => {
        this.setState({
            open: false
        })
    }

    render() {
        return (
            <Container maxWidth={"xl"}>
                <MuiThemeProvider theme={theme}>

                    <HashRouter history={BrowserRouter}>
                        <Route path="/" render={() => {
                            return <QRCodePage id={this.state}/>
                        }} exact>
                        </Route>
                        <Route exact path="/startSignPage/:mechanismId/:levelTestId" component={StartSignPage}/>
                        {/*StudentListPage页面数据需求：
                            1、（必须）accountId:账号id*
                            2、（必须）levelId:水平考试id
                            3、（必须）mechanismId：机构id
                        */}
                        <Route exact
                               path="/studentListPage"
                               render={() => {
                                   return <StudentListPage
                                       onOpenChange={this.handleOpenChange}
                                       onMsgChange={this.handleMsgChange}
                                   />
                               }}
                        />
                        <Route exact path="/logonPage"
                               render={() => {
                                   return <LogonPage
                                       onOpenChange={this.handleOpenChange}
                                       onMsgChange={this.handleMsgChange}
                                   />
                               }}/>

                        <Route exact path="/registerPage" render={()=>{
                            return <RegisterPage
                                history={this.props.history}
                                onOpenChange={this.handleOpenChange}
                                onMsgChange={this.handleMsgChange}
                            />
                        }}/>

                        {/*StudentPage页面
                        数据需求：1、（必须）accountId：账号id
                        2、studentInfo：学生信息
                        3、headTitle:页面顶部标题（值可以为修改学员信息或新增学员，为修改学员时需要studentInfo）
                        4、（必须）levelId:水平考试id
                        5、（必须）mechanismId：机构id
                        */}
                        <Route exact
                               path='/studentPage'
                               render={() => {
                                   return <StudentPage
                                       onOpenChange={this.handleOpenChange}
                                       onMsgChange={this.handleMsgChange}
                                   />
                               }}
                        />
                        {/*
                        majorListPage 有账号id  stuId  stuName在加载 没有返回上级页面
                        AddMajorPage 有stuID再加载 没有则跳转上级页面 确保流程化
                        findOneMajor 有examinationID再加载 没有返回上级
                        */}
                        <Route exact path="/majorListPage"
                            render={()=>{return <MajorListPage history={this.props.history} onOpenChange={this.handleOpenChange}
                                       onMsgChange={this.handleMsgChange}/>
                               }}/>

                        <Route exact path="/addMajorPage"
                            render={()=>{return <AddMajorPage history={this.props.history} onOpenChange={this.handleOpenChange}
                                       onMsgChange={this.handleMsgChange}/>
                               }}/>

                        <Route exact path="/findOneMajor"
                            render={()=>{return <FindOneMajor history={this.props.history} onOpenChange={this.handleOpenChange}
                                       onMsgChange={this.handleMsgChange}/>
                               }}/>


                        <Route exact path="/reviewPage"
                               render={()=>{return <ReviewPage history={this.props.history} onOpenChange={this.handleOpenChange}
                                                                 onMsgChange={this.handleMsgChange}/>
                               }}/>
                        {/* videoUploadPage页面
                        数据需求：
                        1、accountId:账号id
                        2、registerMajorId：报考信息id*/}
                        <Route exact
                               path='/videoUploadPage'
                               render={() => {
                                   return <VideoUploadPage
                                       onOpenChange={this.handleOpenChange}
                                       onMsgChange={this.handleMsgChange}
                                   />
                               }}
                        />
                    </HashRouter>
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
                </MuiThemeProvider>
            </Container>
        );
    }
}

ReactDOM.render(
    <RouterComm/>,
    document.getElementById('root')
);

import React from 'react';
import {Button, Grid} from '@material-ui/core';
import conn from "../util/actions/handleConnection";
import {view as College} from "../features/college";
import {_local} from "../util/actions/headleStorage";

//布局整体界面
export default class First extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            items:{},
            mechanism_name:'',
            sign:{},
            day: 0,
            hour: 0,
            minute: 0,
            second: 0
        }
    }

    componentWillUnmount(){
        clearInterval(this.timerID);
    }

    componentDidMount() {

        // isExact 表示路由url是否完全匹配 完全匹配为true
        // isExact = this.props.match.isExact

        //机构id
        let mechanismId = this.props.match.params.mechanismId
        //水平考试id
        let levelTestId = this.props.match.params.levelTestId

        // 都存在 则表示确定由扫码页面跳转  保存到缓存
        // 缓存中存在 则表示已经扫码
        if( mechanismId && levelTestId){
            _local.set('mechanismId',mechanismId)
            _local.set('levelTestId',levelTestId)

            //根据机构id 查询机构名称
            conn('/mechanism/'+mechanismId,'','')
                .then((result) => {
                    this.setState({
                        mechanism_name:result.data.mechanism_name
                    });
                })

            //根据水平考试id 查该场水平考试的结束时间
            const url = '/level_test/'+levelTestId;
            const method = 'get';
            conn(url,method,'','')
                .then((result) => {
                    this.setState({
                        sign:result.data
                    });
                })

        }else if (parseInt(_local.get('mechanismId')) && parseInt(_local.get('levelTestId'))){
            //缓存中存在 则当前页面已加载 可直接去登录界面
            this.props.history.push('/logonPage');
        } else {
            //都不存在则路由到扫码页面
            this.props.history.push('/')
        }

        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    tick() {
        const remaining = Date.parse(this.state.sign.end_time)-new Date()
        const day =Math.floor((remaining / 1000 / 3600) / 24);
        const hours =Math.floor((remaining / 1000 / 3600) % 24);
        const minute =Math.floor((remaining / 1000 / 60) % 60);
        const second =Math.floor(remaining / 1000 % 60);
        if(remaining > 1000){
            this.setState({
                day:day<10 ? "0" +day : day,
                hour:hours < 10 ? "0" + hours : hours,
                minute:minute < 10 ? "0" + minute : minute,
                second:second < 10 ? "0" + second : second
            });
        }
    }

    render() {
        return (
            <React.Fragment>
                 <Grid
                     container
                     direction="column"
                     justify="center"
                     alignItems="center"
                     spacing={10}
                    style={{backgroundColor:'#EDF8FF',height:'100vh',overflow:'hidden'}}
                >
                        <College direction="column" wid='20vh' variant='h2'/>

                        <Grid container
                              direction="column"
                              justify="center"
                              alignItems="center"
                        >
                            <Grid item style={{color:'rgb(12,120,100)'}}>{this.state.sign.test_name}</Grid>
                            <Grid container
                                  direction="column"
                                  justify="center"
                                  alignItems="center"
                            >
                                <Grid item>
                                    <Button id="startSignBtn" variant="contained" color="primary" size="large"
                                            onClick={()=>{this.props.history.push("/logonPage")}}>
                                        开始报名
                                    </Button>
                                </Grid>
                                <Grid item >{this.state.mechanism_name}</Grid>
                            </Grid>
                            <Grid item >报名倒计时</Grid>
                            <Grid container
                                      direction="row"
                                      justify="space-around"
                                      alignItems="center"
                            style={{width:"80%"}}
                            >
                                    <Grid >
                                        <Grid>天</Grid>
                                        <Grid >{this.state.day}</Grid>
                                    </Grid>
                                    <Grid >
                                        <Grid>时</Grid>
                                        <Grid >{this.state.hour}</Grid>
                                    </Grid>
                                    <Grid >
                                        <Grid>分</Grid>
                                        <Grid >{this.state.minute}</Grid>
                                    </Grid>
                                    <Grid >
                                        <Grid>秒</Grid>
                                        <Grid>{this.state.second}</Grid>
                                    </Grid>
                                </Grid>
                        </Grid>
                 </Grid>
           </React.Fragment>

        );
    }
}
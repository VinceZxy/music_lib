/**
 * @Description:
 * @author Chen
 * @date 2020/8/20
*/

import React from "react";
import CollegeInfo from "./collegeInfo";
import QRCode from "./qrCode";
import Grid from "@material-ui/core/Grid";
import conn from "../../../util/actions/handleConnection";
export default class College extends React.Component{
    constructor(props) {
        super(props);
        this.state= {
            info: {
                "id": 1,
                "college_name": "",
                "college_eng_name": "",
                "address": "",
                "telephone": "",
                "icon": "",
                "mechanisms": [
                    {
                        "id": 1,
                        "mechanism_name": "",
                        "address": "",
                        "telephone": "",
                        "college_id": 1
                    }
                ]
            },
            mechanismInfo: {
            }
        }
    }
    componentDidMount(){
        conn('/college/1','GET','')
            .then((result)=>{
                this.setState({
                    info:result.data,
                })
        })
        conn('/qrcode/?mechanism_id='+this.props.id.mechanismId+'&level_test_id='+this.props.id.levelTestId,'GET','')
            .then((result)=>{
            this.setState({
                mechanismInfo:result.data
            })
        })
    }
    render() {
        return(
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={4}
            >
                <Grid item>
                    <QRCode info={this.state.info} mechanismInfo={this.state.mechanismInfo}/>
                </Grid>
                <Grid item>
                    <CollegeInfo info={this.state.info}/>
                </Grid>
            </Grid>
        );
    }
}
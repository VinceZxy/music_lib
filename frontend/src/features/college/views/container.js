/**
 * @Description:
 * @author Chen
 * @date 2020/8/20
*/

import React from "react";
import CollegeName from "../../../util/components/collegeName"
import Grid from "@material-ui/core/Grid";
import conn from "../../../util/actions/handleConnection";
import config from "../../../config/config.json"

export default class College extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            info:{
                "id": 0,
                "college_name": "",
                "college_eng_name": "",
                "address": "",
                "telephone": "",
                "icon": "",
                "mechanisms": [
                    {
                        "id": 0,
                        "mechanism_name": "",
                        "address": "",
                        "telephone": "",
                        "college_id": 0
                    }
                ]
            }
        }
    }
    componentDidMount(){
        conn('/college/1','GET','').then((result)=>{
            this.setState({
                info:result.data
            })
        })
    }

    render() {
        return(
            <Grid
                container
                direction={this.props.direction}
                justify="center"
                alignItems="center"
            >
                <img alt="学院图标" style={{width:this.props.wid,height:this.props.wid}} src={this.state.info.icon===''?'':config.imgIp+this.state.info.icon}/>
                <Grid item>
                    <CollegeName  variant={this.props.variant} info={this.state.info}/>
                </Grid>
            </Grid>
        );
    }

}
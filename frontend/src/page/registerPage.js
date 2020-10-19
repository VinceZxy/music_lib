import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import {Grid, } from "@material-ui/core";
import Register from "../features/register/register";
import {view as College} from "../features/college";
import {withRouter} from 'react-router';

class RegisterPage extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            info:{}
        }
    }
    componentDidMount(){
    }
    render() {
        return(
            <React.Fragment>
                <CssBaseline/>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    spacing={4}
                    style={{backgroundColor:'#EDF8FF',height:'100vh',}}
                >
                    <College direction='row' wid='10vh' variant='h2'/>
                    <Register history={this.props.history}
                              props={this.props}
                              onOpenChange={this.props.onOpenChange}
                              onMsgChange={this.props.onMsgChange}
                    />
                </Grid>
            </React.Fragment>
        );
    }
}

export default withRouter(RegisterPage)
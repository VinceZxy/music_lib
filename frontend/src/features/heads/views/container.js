/**
 * @Description:
 * @author Chen
 * @date 2020-08-28 10:23
 */
import React from 'react';
import {withRouter} from 'react-router';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import logout from "../../../util/actions/handleLogout";
import {_local} from "../../../util/actions/headleStorage";
import tokenExpired from "../../../util/actions/handleTokenExpired";

class Heads extends React.Component{
    handleLogoutClick=()=>{
        const token=_local.get('token')
        if(token===false){
            tokenExpired(this)
        }else{
            logout(token,this,'提示：注销成功')
        }

    }
    render() {
        return (
            <Grid container
                  direction="row"
                  spacing={4}
            >
                <Grid item
                      container
                      direction="row"
                      justify="space-between"
                >
                    <Grid item>
                        <Typography variant="h5">
                            {this.props.headTitle}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button id='backBtn' startIcon={<ArrowBackIosIcon/>} onClick={() => {
                            this.props.history.push({
                                pathname:this.props.backPage,
                                accountId:this.props.accountId
                            })
                        }} size="medium" color='primary'>
                            返回
                        </Button>
                        <Button id='logoutBtn' startIcon={<PowerSettingsNewIcon/>} onClick={this.handleLogoutClick} size="medium" color='primary'>
                            注销
                        </Button>
                    </Grid>
                </Grid>
                <Grid item style={{width: '100%'}}>
                    {this.props.features}
                </Grid>
            </Grid>
        );
    }
}

export default withRouter(Heads);

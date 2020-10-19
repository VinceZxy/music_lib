import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import {withRouter} from 'react-router';
import {view as College} from "../features/college";
import {view as Heads} from '../features/heads/index'
import Review from '../features/review/view/review';
import {_local} from "../util/actions/headleStorage";

class ReviewPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        if (_local.get('token')){
            if(!_local.get('roleId')){
                window.history.back()
            }
        }else {
            this.props.onMsgChange('提示：请先登录');
            this.props.onOpenChange(true);
            this.props.history.push('/logonPage')
        }
    }

    render() {
        return (
            <React.Fragment>
                <CssBaseline/>
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    spacing={6}
                    style={{backgroundColor:'#EDF8FF',paddingTop:'5vh'}}
                >
                    <Grid item>
                        <College direction='row' wid='10vh' variant='h2'/>
                    </Grid>
                    <Grid style={{margin:'5vh'}}>
                        <Heads
                            headTitle={'审核信息'}
                            onOpenChange={this.props.onOpenChange}
                            onMsgChange={this.props.onMsgChange}
                            features={
                                <Review history={this.props.history}  onOpenChange={this.props.onOpenChange}
                                        onMsgChange={this.props.onMsgChange} />
                            }
                        />
                    </Grid>

                </Grid>
            </React.Fragment>
        )

    }
}

export default withRouter(ReviewPage)
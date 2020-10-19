
/*
* 全局异常处理块儿 用于捕获axios的响应异常
* err catch异常对象
* setState
* */
import {_local} from "./headleStorage";

export default function CommonException(err, that) {

    //当异常有返回状态和数据时
    if(err.response && err.response.status){
        switch (err.response.status) {
            case 400:{
                that.setState({msg:'网络异常'})
                break;
            }
            case 401:{
                that.props.onOpenChange(true);
                that.props.onMsgChange('提示：'+err.response.data);
                that.props.history.push('/logonPage')
                _local.clear()
                sessionStorage.clear()
                break;
            }
            case 417:{
                that.setState({msg:err.response.data})
                break;
            }
            case 422:{
                that.setState({msg:err.response.data})
                break;
            }
            case 500:{
                that.setState({msg:err.response.data})
                break;
            }default:{
                that.setState({msg:'网络异常'})
            }
        }
    }else if(err.request){
        that.setState({msg:'网络异常'})
    }else if (err.config){
        that.setState({msg:'网络异常'})
    }else {
        that.setState({msg:'网络异常'})
    }
}
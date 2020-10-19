import {_local} from "./headleStorage";

/**
 * @Description:
 * @author Chen
 * @date 2020-09-08 09:41
 */

//token过期处理
export default function tokenExpired(that) {
    console.log(that)
    that.props.onOpenChange(true);
    that.props.onMsgChange('登录过期，请重新登陆');
    sessionStorage.clear()
    _local.clear()
    that.props.history.push('/logonPage')
}
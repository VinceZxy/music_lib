/**
 * @Description:
 * @author Chen
 * @date 2020-09-07 10:35
 */

import conn from "./handleConnection";
import {_local} from "./headleStorage";
import CommonException from "./headleException";

export  default function logout(token,that,msg){
    conn('/account/logout','POST','',token).then((result)=>{
        if(result.data==='注销成功'){
            that.props.onMsgChange(msg);
            that.props.onOpenChange(true);
            // mechanismId levelTestId
            const mechanismId=_local.get('mechanismId')
            const levelTestId=_local.get('levelTestId')
            sessionStorage.clear()
            _local.clear()
            _local.set('mechanismId',mechanismId)
            _local.set('levelTestId',levelTestId)
            that.props.history.push('/logonPage')
        }
    }).catch((error)=>{
        CommonException(error,this);
    })
}

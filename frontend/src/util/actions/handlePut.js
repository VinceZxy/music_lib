import axios from "axios";
import config from "../../config/config.json";
import {_local} from "./headleStorage";

export default function putConn(url,data) {
    let uri = config.ip+url;
    let cfg = {headers:{Authorization:_local.get('token')}}
    return axios.put(uri,data,cfg)
}
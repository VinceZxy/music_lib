import axios from "axios";
import config from "../../config/config.json";

export default function subConn(url,method,data,t) {
    return axios({
        url: config.ip+url,
        method: method,
        headers:{'Content-Type':'application/json', 'Accept': 'application/json',Authorization:t},
        params:data,
    })
}
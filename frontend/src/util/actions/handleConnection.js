import config from "../../config/config.json"
import axios from "axios";

export default function conn(url,method,data,t) {
    return  axios({
        url:config.ip+url,
        method:method,
        headers:{'Content-Type':'application/json', 'Accept': 'application/json',Authorization:t},
        data:JSON.stringify(data)
    })
}
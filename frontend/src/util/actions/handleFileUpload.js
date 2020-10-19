/**
 * @Description:
 * @author Chen
 * @date 2020-09-04 09:47
 */

import {post} from "axios";
import config from "../../config/config.json";

export default function fileUpload(url,formData,token) {
    const configInfo={
        headers: {
            'Authorization':token,
            'Content-Type': 'multipart/form-data'
        }
    }
    return  post(config.ip+url,formData,configInfo);
}
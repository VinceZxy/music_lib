/**
 * @Description:
 * @author Chen
 * @date 2020-09-07 13:49
 */

import React from 'react';
import Button from "@material-ui/core/Button";
export default function MyContainedButton(props) {
    return(
        <Button id={props.id} variant="contained" color="primary" onClick={props.onClick}>{props.value}</Button>
    );
}
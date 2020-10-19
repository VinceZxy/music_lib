/**
 * @Description:
 * @author Chen
 * @date 2020-09-07 15:37
 * @data:
 *      id:
 *      error:输入框警示状态boolean
 *      label:输入框标题
 *      show:密码是否显示boolean
 *      value:输入框值
 * @fuc：
 *      onChange:输入值改变事件
 *      onClick:显示密码按钮点击事件。触发时改变show的值
 */

import React from 'react';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Typography from "@material-ui/core/Typography";

export default function MyPwdInput(props) {
    const onTextChange=(event)=>{
        props.onChange(event.target.value);
    }
    return(
        <FormControl>
            <InputLabel id={props.id+'Label'} error={props.error} htmlFor={props.id}>{props.label}</InputLabel>
            <Input
                id={props.id}
                type={props.show?'text':'password'}
                value={props.value}
                onChange={onTextChange}
                error={props.error}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            onClick={props.onClick}
                        >
                            {props.show ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                }
            />
            <Typography variant='caption' style={{color:'red'}}>{props.helperText}</Typography>
        </FormControl>

    );
}
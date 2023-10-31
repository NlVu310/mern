import React from 'react'
// import { Input } from 'antd'
import { WrapperInputStyle } from './style'

const InputForm = (props) => {//eslint-disable-next-line
    const { placeholder = 'Nhập text', ...rests } = props
    const handleOnchangeInput = (e) => {
        props.onChange(e.target.value)
    }
    return (
        <WrapperInputStyle placeholder={placeholder} value={props.valueInput} {...rests} onChange={handleOnchangeInput} />
    )
}

export default InputForm
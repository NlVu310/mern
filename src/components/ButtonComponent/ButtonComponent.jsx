import React from 'react'
import { Button } from 'antd'

const ButtonComponent = ({ size, styleButton, styleTextButton, textbutton, disabled, ...rests }) => {
    return (
        <Button
            style={{
                ...styleButton,
                background: disabled ? '#ccc' : styleButton.background
            }}
            size={size}
            {...rests}
        >
            <span style={styleTextButton}>{textbutton}</span>
        </Button>
    )
}

export default ButtonComponent
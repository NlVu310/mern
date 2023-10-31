import React from 'react'
import { WrapperContent, WrapperLableText, WrapperTextPrice, WrapperTextValue } from './style'
import { Checkbox, Rate } from 'antd'

const NavBarComponent = () => {
    const onChange = () => { }
    const renderContent = (type, options) => {
        switch (type) {
            case 'text':
                return options.map((option) => {
                    return <WrapperTextValue> {option}</WrapperTextValue>
                })
            case 'checkbox':
                return (
                    <Checkbox.Group style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }} onChange={onChange}>
                        {options.map((option) => {
                            return (
                                <Checkbox style={{ marginLeft: '0' }} value={option.value} > {option.label} </Checkbox>
                            )
                        })}
                    </Checkbox.Group>)
            case 'star':
                return options.map((option) => {
                    return (
                        <div style={{ display: 'flex' }}>
                            <Rate style={{ fontSize: '12px' }} disabled defaultValue={option} />
                            <span> {`từ ${option} sao`} </span>
                        </div>
                    )
                })
            case 'price':
                return options.map((option) => {
                    return (
                        <WrapperTextPrice>
                            {option}
                        </WrapperTextPrice>
                    )
                })

            default:
                return {}
        }
    }

    return (
        <div>
            <WrapperLableText>Label</WrapperLableText>
            <WrapperContent>
                {renderContent('text', ['Tủ lạnh', 'Tv', 'Laptop'])}
            </WrapperContent>
            {/* <WrapperContent>
                {renderContent('checkbox', [
                    { value: 'a', label: 'A' },
                    { value: 'b', label: 'B' }
                ])}
            </WrapperContent>
            <WrapperContent>
                {renderContent('star', [3, 4, 5])}
            </WrapperContent>
            <WrapperContent>
                {renderContent('price', ['Dưới 40', 'Trên 50'])}
            </WrapperContent> */}
        </div>
    )
}

export default NavBarComponent
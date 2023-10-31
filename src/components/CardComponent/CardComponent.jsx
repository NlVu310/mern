import React from 'react'
import { StyleCard, StyleNameProduct, WrapperDiscountPriceText, WrapperPriceText, WrapperReportText, WrapperTextSell } from './style'
import { StarFilled } from '@ant-design/icons'
import logo from '../../assets/images/logo.png'


const CardComponent = (props) => {
    const { countInStock, description, image, name, price, rating, type, selled, discount } = props
    return (
        <StyleCard
            hoverable
            headStyle={{ width: '250px', height: '250px' }}
            style={{ width: '201px' }}
            bodyStyle={{ padding: '10px' }}
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
        >
            <img src={logo}
                style={{ width: '68px', height: '14px', top: '-1.5px', left: '-1.5px', position: 'absolute' }} alt='logo' />
            <StyleNameProduct>
                {name}
            </StyleNameProduct>
            <WrapperReportText>
                <span style={{ marginRight: '4px' }}>
                    <span>{rating}</span>  <StarFilled style={{ size: '10px', color: 'yellow' }} />
                </span>
                <WrapperTextSell> {selled || 'Đã bán 1000+'}</WrapperTextSell>
            </WrapperReportText>
            <WrapperPriceText>
                <span style={{ marginRight: '8px' }}>{price}</span>
                <WrapperDiscountPriceText > {discount || 5}%</WrapperDiscountPriceText>
            </WrapperPriceText>
        </StyleCard>
    )
}

export default CardComponent    
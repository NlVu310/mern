import React from 'react'
import { StyleCard, StyleNameProduct, WrapperDiscountPriceText, WrapperPriceText, WrapperReportText, WrapperTextSell } from './style'
import { StarFilled } from '@ant-design/icons'
import logo from '../../assets/images/logo.png'
import { Navigate, useNavigate } from 'react-router-dom'
import { convertPrice } from '../../utils'



const CardComponent = (props) => {
    const navigate = useNavigate()
    const { countInStock, description, image, name, price, rating, type, selled, discount, id } = props
    const handleDetailsProduct = (id) => {
        navigate(`/product-details/${id}`)
    }

    return (
        <StyleCard
            hoverable
            headStyle={{ width: '250px', height: '250px' }}
            style={{ width: '201px' }}
            bodyStyle={{ padding: '10px' }}
            cover={<img alt="example" src={image} />}
            onClick={() => handleDetailsProduct(id)}
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
                <span style={{ marginRight: '8px' }}>{convertPrice(price)}</span>
                <WrapperDiscountPriceText > - {discount || 5}%</WrapperDiscountPriceText>
            </WrapperPriceText>
        </StyleCard>
    )
}

export default CardComponent    
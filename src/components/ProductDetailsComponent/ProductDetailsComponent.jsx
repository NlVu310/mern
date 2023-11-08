import { Col, Image, Row } from 'antd'
import React from 'react'
import xiaomi1 from '../../assets/images/xiaomi1.jpg'
import xiaomismall from '../../assets/images/xiaomismall.jpg'
import { StarFilled, PlusOutlined, MinusOutlined } from '@ant-design/icons'
import { WrapperAddressProduct, WrapperInputNumber, WrapperPriceProduct, WrapperPriceTextProduct, WrapperQualityProduct, WrapperStyleColImage, WrapperStyleImageSmall, WrapperStyleNameProduct, WrapperTextSell } from './style'
import ButtonComponent from '../ButtonComponent/ButtonComponent'


const ProductDetailsComponent = () => {
    const onChange = () => []
    return (
        // <ConfigProvider theme={{ hashed: false }}>
        <Row style={{ padding: '16px', background: '#fff', borderRadius: '4px' }}>
            <Col span={10} style={{ borderRight: '1px solid #e5e5e5', paddingRight: '6px' }}>
                <Image width={'100%'} src={xiaomi1} alt="image product" preview={false} />
                {/* <Row style={{ paddingTop: '10px', justifyContent: 'space-between' }}>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src={xiaomismall} alt="small" preview={false} />
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src={xiaomismall} alt="small" preview={false} />
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src={xiaomismall} alt="small" preview={false} />
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src={xiaomismall} alt="small" preview={false} />
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src={xiaomismall} alt="small" preview={false} />
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src={xiaomismall} alt="small" preview={false} />
                    </WrapperStyleColImage>
                </Row> */}
            </Col>

            <Col span={14} style={{ paddingLeft: '10px' }}>
                <WrapperStyleNameProduct>Điện thoại Xiaomi Redmid 10 5G</WrapperStyleNameProduct>
                <div>
                    <StarFilled style={{ color: 'rgb(253, 216, 53)', fontSize: '12px' }} />
                    <StarFilled style={{ color: 'rgb(253, 216, 53)', fontSize: '12px' }} />
                    <StarFilled style={{ color: 'rgb(253, 216, 53)', fontSize: '12px' }} />
                    <StarFilled style={{ color: 'rgb(253, 216, 53)', fontSize: '12px' }} />
                    <StarFilled style={{ color: 'rgb(253, 216, 53)', fontSize: '12px' }} />
                    <WrapperTextSell> | Đã bán 1000+ </WrapperTextSell>
                </div>
                <WrapperPriceProduct>
                    <WrapperPriceTextProduct>
                        2.599.000
                    </WrapperPriceTextProduct>
                </WrapperPriceProduct>
                <WrapperAddressProduct>
                    <span> Giao đến</span>
                    <span className='address'> Hà Nội </span> -
                    <span className='change-address'> Đổi địa chỉ </span>
                </WrapperAddressProduct>
                <div style={{ margin: '10px 0 20px' }}>
                    <div style={{ marginBottom: '10px' }}> Số lượng</div>
                    <WrapperQualityProduct>
                        <button style={{ border: 'none', background: 'transparent' }}>
                            <MinusOutlined style={{ color: '#000', fontSize: '20px' }} />
                        </button>
                        <WrapperInputNumber min={0} defaultValue={1} onChange={onChange} />
                        <button style={{ border: 'none', background: 'transparent' }}>
                            <PlusOutlined style={{ color: '#000', fontSize: '20px' }} />
                        </button>
                    </WrapperQualityProduct>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <ButtonComponent
                        bordered={false}
                        size={40}
                        textButton={'Chọn mua'}
                        styleTextButton={{ color: '#fff' }}
                        styleButton={{ background: 'rgb(255,57,69)', height: '48px', width: '220px' }}>
                    </ButtonComponent>
                    <ButtonComponent
                        size={40}
                        textButton={'Mua trả sau'}
                        styleTextButton={{ color: 'blue' }}
                        styleButton={{ background: '#fff', height: '48px', width: '220px', border: '1px solid rgb(13, 92, 182)' }}>
                    </ButtonComponent>
                </div>
            </Col>
        </Row>
        // </ConfigProvider>
    )
}
export default ProductDetailsComponent
import { Col, Image, Rate, Row } from 'antd'
import React, { useState } from 'react'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import { WrapperAddressProduct, WrapperInputNumber, WrapperPriceProduct, WrapperPriceTextProduct, WrapperQualityProduct, WrapperStyleNameProduct, WrapperTextSell } from './style'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import * as ProductService from '../../services/ProductService'
import { useQuery } from '@tanstack/react-query'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { addOrderProduct } from '../../redux/slides/orderSlide'

const ProductDetailsComponent = ({ idProduct }) => {
    const [numProduct, setNumproduct] = useState(1)
    const user = useSelector((state) => state.user)
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const onChange = (value) => {
        setNumproduct(Number(value))
    }
    const fetchGetDetailsProduct = async (context) => {
        const id = context?.queryKey && context?.queryKey[1]
        if (id) {
            const res = await ProductService.getDetailsProduct(id)
            return res.data
        }
    }

    const handleChangeCount = (type) => {
        if (type === 'increase') {
            setNumproduct(numProduct + 1)
        } else if (type === 'decrease') {
            setNumproduct(numProduct - 1)
        }
    }

    const handleAddOrderProduct = () => {
        if (!user?.id) {
            navigate('/sign-in', { state: location?.pathname })
        } else {
            dispatch(addOrderProduct({
                orderItem: {
                    name: productDetails?.name,
                    amount: numProduct,
                    image: productDetails?.image,
                    price: productDetails?.price,
                    product: productDetails?._id
                }
            }))
        }
    }


    const { isLoading, data: productDetails } = useQuery(['products', idProduct], fetchGetDetailsProduct, { enabled: !!idProduct })
    console.log('check value', productDetails, user)

    console.log(productDetails?._id)


    return (
        <LoadingComponent isLoading={isLoading}>
            <Row style={{ padding: '16px', background: '#fff', borderRadius: '4px' }}>
                <Col span={10} style={{ borderRight: '1px solid #e5e5e5', paddingRight: '6px' }}>
                    <Image width={'100%'} src={productDetails?.image} alt="image product" preview={false} />
                </Col>

                <Col span={14} style={{ paddingLeft: '10px' }}>
                    <WrapperStyleNameProduct>{productDetails?.name}</WrapperStyleNameProduct>
                    <div>
                        <Rate allowHalf defaultValue={productDetails?.rating} value={productDetails?.rating} />
                        <WrapperTextSell> {productDetails?.selled} || daa ban 1000</WrapperTextSell>
                    </div>
                    <WrapperPriceProduct>
                        <WrapperPriceTextProduct>
                            {productDetails?.price.toLocaleString()}
                        </WrapperPriceTextProduct>
                    </WrapperPriceProduct>
                    <WrapperAddressProduct>
                        <span> Giao đến</span>
                        <span className='address'> {user?.address} </span> -
                        <span className='change-address'> Đổi địa chỉ </span>
                    </WrapperAddressProduct>
                    <div style={{ margin: '10px 0 20px' }}>
                        <div style={{ marginBottom: '10px' }}> Số lượng</div>
                        <WrapperQualityProduct>
                            <button style={{ border: 'none', background: 'transparent' }}>
                                <MinusOutlined style={{ color: '#000', fontSize: '20px', cursor: 'pointer' }} onClick={() => handleChangeCount('decrease')} />
                            </button>
                            <WrapperInputNumber value={numProduct} min={0} defaultValue={1} onChange={onChange} />
                            <button style={{ border: 'none', background: 'transparent' }}>
                                <PlusOutlined style={{ color: '#000', fontSize: '20px', cursor: 'pointer' }} onClick={() => handleChangeCount('increase')} />
                            </button>
                        </WrapperQualityProduct>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <ButtonComponent
                            onClick={handleAddOrderProduct}
                            size={40}
                            textbutton={'Chọn mua'}
                            styleTextButton={{ color: '#fff' }}
                            styleButton={{ background: 'rgb(255,57,69)', height: '48px', width: '220px' }}>
                        </ButtonComponent>
                        <ButtonComponent
                            size={40}
                            textbutton={'Mua trả sau'}
                            styleTextButton={{ color: 'blue' }}
                            styleButton={{ background: '#fff', height: '48px', width: '220px', border: '1px solid rgb(13, 92, 182)' }}>
                        </ButtonComponent>
                    </div>
                </Col>
            </Row>
        </LoadingComponent>
    )
}
export default ProductDetailsComponent
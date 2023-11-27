import { Col, Image, Rate, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import { WrapperAddressProduct, WrapperInputNumber, WrapperPriceProduct, WrapperPriceTextProduct, WrapperQualityProduct, WrapperStyleNameProduct, WrapperTextSell } from './style'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import * as ProductService from '../../services/ProductService'
import { useQuery } from '@tanstack/react-query'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { addOrderProduct, resetOrder } from '../../redux/slides/orderSlide'
import { convertPrice } from '../../utils'
import * as message from '../../components/MessageComponent/MessageComponent'


const ProductDetailsComponent = ({ idProduct }) => {
    const [numProduct, setNumproduct] = useState(1)
    const [errorLimitOrder, setErrorLimitOrder] = useState(false)
    const user = useSelector((state) => state.user)
    const order = useSelector((state) => state.order)
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


    const handleChangeCount = (type, limited) => {
        if (type === 'increase') {
            if (!limited) {
                setNumproduct(numProduct + 1)
            }
        } else {
            if (!limited) {
                setNumproduct(numProduct - 1)
            }
        }
    }
    const handleAddOrderProduct = () => {
        if (!user?.id) {
            navigate('/sign-in', { state: location?.pathname })
        } else {
            const orderRedux = order?.orderItems?.find((item) => item.product === productDetails?._id)
            if ((orderRedux?.amount + numProduct) <= orderRedux?.countInstock || (!orderRedux && productDetails?.countInStock > 0)) {
                dispatch(addOrderProduct({
                    orderItem: {
                        name: productDetails?.name,
                        amount: numProduct,
                        image: productDetails?.image,
                        price: productDetails?.price,
                        product: productDetails?._id,
                        countInstock: productDetails?.countInStock
                    }
                }))
            } else {
                setErrorLimitOrder(true)
            }
        }
    }



    useEffect(() => {
        if (order.isSucessOrder) {
            message.success('Đã thêm vào giỏ hàng')
        }
        return () => {
            dispatch(resetOrder())
        }
    }, [order.isSucessOrder])


    useEffect(() => {
        const orderRedux = order?.orderItems?.find((item) => item.product === productDetails?._id)
        if ((orderRedux?.amount + numProduct) <= orderRedux?.countInstock || (!orderRedux && productDetails?.countInStock > 0)) {
            setErrorLimitOrder(false)
        } else if (productDetails?.countInStock === 0) {
            setErrorLimitOrder(true)
        }
    }, [numProduct])

    const { isLoading, data: productDetails } = useQuery(['products', idProduct], fetchGetDetailsProduct, { enabled: !!idProduct })


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
                        <WrapperTextSell> đã bán {productDetails?.selled} </WrapperTextSell>
                    </div>
                    <WrapperPriceProduct>
                        <WrapperPriceTextProduct>
                            {convertPrice(productDetails?.price)}
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
                                <MinusOutlined style={{ color: '#000', fontSize: '20px', cursor: 'pointer' }} onClick={() => handleChangeCount('decrease', numProduct === 1)} />
                            </button>
                            <WrapperInputNumber value={numProduct} min={0} defaultValue={1} onChange={onChange} />
                            <button style={{ border: 'none', background: 'transparent' }}>
                                <PlusOutlined style={{ color: '#000', fontSize: '20px', cursor: 'pointer' }} onClick={() => handleChangeCount('increase', numProduct === productDetails?.countInStock)} />
                            </button>
                        </WrapperQualityProduct>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div>
                            <ButtonComponent
                                onClick={handleAddOrderProduct}
                                size={40}
                                textbutton={'Chọn mua'}
                                styleTextButton={{ color: '#fff' }}
                                styleButton={{ background: 'rgb(255,57,69)', height: '48px', width: '220px' }}>
                            </ButtonComponent>
                            {errorLimitOrder && <div style={{ color: 'red' }}>Sản phẩm hết hàng</div>}
                        </div>
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
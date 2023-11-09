import React, { useEffect, useState } from 'react'
import NavBarComponent from '../../components/NavBarComponent/NavBarComponent'
import CardComponent from '../../components/CardComponent/CardComponent'
import { Row, Pagination, Col } from 'antd'
import { WrapperNavBar, WrapperProducts } from './style'
import { useLocation } from 'react-router-dom'
import * as ProductService from '../../services/ProductService'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent'


const TypeProductPage = () => {
    const { state } = useLocation()
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState([])
    const fetchProductType = async (type) => {
        setLoading(true)
        const res = await ProductService.getProductType(type)
        if (res?.status === 'OK') {
            setProducts(res?.data)
            setLoading(false)
        } else {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (state) {
            fetchProductType(state)
            setLoading(false)
        }
    }, [])

    console.log('loading', loading)
    const onChange = () => { }
    return (
        <LoadingComponent isLoading={loading} >
            <div style={{ padding: '0 120px', backgroundColor: '#efefef' }}>
                <Row style={{ flexWrap: 'nowrap', paddingTop: '10px' }}>
                    <WrapperNavBar span={4} >
                        <NavBarComponent />
                    </WrapperNavBar>
                    <Col span={20} style={{ display: 'flex', flexDirection: 'column ', justifyContent: 'center' }}>
                        <WrapperProducts>
                            {products?.map((product) => {
                                return (
                                    <CardComponent
                                        key={product._id}
                                        countInStock={product.countInStock}
                                        description={product.description}
                                        image={product.image}
                                        name={product.name}
                                        price={product.price}
                                        rating={product.rating}
                                        type={product.type}
                                        selled={product.selled}
                                        discount={product.discount}
                                        id={product._id}
                                    />
                                )
                            })}
                        </WrapperProducts>
                        <Pagination defaultCurrent={1} total={100} onChange={onChange} style={{ textAlign: 'center', marginTop: '10px' }} />
                    </Col>
                </Row>
            </div >
        </LoadingComponent>
    )
}

export default TypeProductPage
import React, { useEffect, useState } from 'react'
import NavBarComponent from '../../components/NavBarComponent/NavBarComponent'
import CardComponent from '../../components/CardComponent/CardComponent'
import { Row, Pagination, Col } from 'antd'
import { WrapperNavBar, WrapperProducts } from './style'
import { useLocation } from 'react-router-dom'
import * as ProductService from '../../services/ProductService'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent'
import { useSelector } from 'react-redux'
import { useDebounce } from '../../hooks/useDebounce'


const TypeProductPage = () => {
    const { state } = useLocation()
    const searchProduct = useSelector((state) => state?.product?.search)
    const searchDebounce = useDebounce(searchProduct, 1000)//dùng để delay coi như load 
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])
    const [panigate, setPanigate] = useState({
        page: 0,
        limit: 100,
        total: 1
    })
    const fetchProductType = async (type, page, limit) => {
        setLoading(true)
        const res = await ProductService.getProductType(type, page, limit)
        if (res?.status === 'OK') {
            setLoading(false)
            setProducts(res?.data)
            setPanigate({ ...panigate, total: res?.total })
            setLoading(false)
        } else {
            setLoading(false)
        }
    }


    useEffect(() => {
        if (state) {
            fetchProductType(state, panigate.page, panigate.limit)
            setLoading(false)
        }
    }, [state, panigate.page, panigate.limit])

    const onChange = (current, pageSize) => {
        setPanigate({ ...panigate, page: current - 1, limit: pageSize })
    }
    return (
        <LoadingComponent isLoading={loading} >
            <div style={{ padding: '0 120px', backgroundColor: '#efefef', height: '1000px' }}>
                <div style={{ width: '1302px', margin: 'auto', height: '100%' }}>
                    <Row style={{ flexWrap: 'nowrap', paddingTop: '10px', height: 'calc(100% -20px)' }}>
                        <Col span={24} style={{ display: 'flex', flexDirection: 'column ', justifyContent: 'center' }}>
                            <WrapperProducts>
                                {products?.filter((pro) => {
                                    if (searchDebounce === '') {
                                        return pro
                                    } else if (pro?.name?.toLowerCase()?.includes(searchDebounce?.toLowerCase())) {
                                        return pro
                                    }
                                })?.map((product) => {
                                    return (
                                        <>
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
                                        </>

                                    )
                                })}
                            </WrapperProducts>
                            {/* <Pagination defaultCurrent={panigate?.page} total={panigate?.total + 1} onChange={onChange} style={{ textAlign: 'center', marginTop: '50px' }} /> */}
                        </Col>
                    </Row>
                </div>
            </div >
        </LoadingComponent>
    )
}

export default TypeProductPage
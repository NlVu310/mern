import React, { useEffect, useRef, useState } from 'react'
import TypeProductComponent from '../../components/TypeProductComponent/TypeProductComponent'
import { WrapperButtonMore, WrapperTypeProduct, WrapperProducts } from './style'
import SliderComponent from '../../components/SliderComponent/SliderComponent'
import tiki1 from '../../assets/images/tiki1.webp'
import tiki2 from '../../assets/images/tiki2.webp'
import tiki3 from '../../assets/images/tiki3.webp'
import CardComponent from '../../components/CardComponent/CardComponent'
import { useQuery } from '@tanstack/react-query'
import * as ProductService from '../../services/ProductService'
import { useSelector } from 'react-redux'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent'
import { useDebounce } from '../../hooks/useDebounce'

const HomePage = () => {
    const searchProduct = useSelector((state) => state?.product?.search)
    const refSearch = useRef()
    const searchDebounce = useDebounce(searchProduct, 1000)//dùng để delay coi như load 
    const [stateProduct, setStateProduct] = useState([])
    const [isLoading, setIsloading] = useState()
    const arr = ['TV', 'Tủ Lạnh', 'Laptop']
    const fetchProductAll = async (search) => { //đây là 1 function
        const res = await ProductService.getAllProduct(search)
        if (search.length > 0 || refSearch.current) {
            setStateProduct(res?.data)
            return []
        } else {
            return res
        }
        //phải return thì mấy trả ra được data
    }

    useEffect(() => {
        if (refSearch.current) {
            setIsloading(true)
            fetchProductAll(searchDebounce)
        }
        refSearch.current = true
        setIsloading(false)
    }, [searchDebounce])
    const { data: products } = useQuery(['products'], fetchProductAll, { retry: 3, retryDelay: 1000 })

    useEffect(() => {
        if (products?.data?.length > 0) {
            setStateProduct(products?.data)
        }
    }, [products])


    return (
        <LoadingComponent isLoading={isLoading}>
            <div style={{ padding: '0 120px' }}>
                <WrapperTypeProduct >
                    {arr.map((item) => {
                        return (
                            <TypeProductComponent name={item} key={item} />
                        )
                    })}
                </WrapperTypeProduct>
            </div>
            <div className='body' style={{ width: '100%', backgroundColor: '#efefef', }}>
                <div id='container' style={{ backgroundColor: '#efefef', padding: '0 120px', height: '1000px' }}>
                    <SliderComponent arrImages={[tiki1, tiki2, tiki3]} />
                    <WrapperProducts>
                        {stateProduct?.map((product) => {
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
                                />
                            )
                        })}
                    </WrapperProducts>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                        <WrapperButtonMore textButton='Xem thêm' type='outline' styleButton={{
                            border: '1px solid rgb(11,116 ,229)', color: 'rgb(11,116,229)', width: '240px', height: '38px', borderRadius: '4px'
                        }}
                            styleTextButton={{ fontWeight: 500 }} />
                        {/* <NavBarComponent /> */}
                    </div>
                </div>
            </div>

        </LoadingComponent>

    )
}

export default HomePage
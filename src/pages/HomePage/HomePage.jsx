import React, { useEffect, useState } from 'react'
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
import { useDebounce } from '../../hooks/useDebounce'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent'

const HomePage = () => {
    const searchProduct = useSelector((state) => state?.product?.search)
    const [limit, setLimit] = useState(6)
    const searchDebounce = useDebounce(searchProduct, 1000)//dùng để delay coi như load 
    const [loading, setloading] = useState(false)
    const [typeProducts, setTypeProducts] = useState([])

    const fetchProductAll = async (context) => { //đây là 1 function
        const limit = context?.queryKey && context?.queryKey[1]
        const search = context?.queryKey && context?.queryKey[2]
        const res = await ProductService.getAllProduct(search, limit)
        return res
    }

    const fetchALlTypeProduct = async () => {
        const res = await ProductService.getAllTypeProduct()
        if (res?.status === 'OK') {
            setTypeProducts(res?.data)
        }
    }

    useEffect(() => {
        fetchALlTypeProduct()
    }, [])
    const { isloading, data: products, isPreviousData } = useQuery(['products', limit, searchDebounce], fetchProductAll, { retry: 3, retryDelay: 1000, keepPreviousData: true })
    return (
        < LoadingComponent isLoading={isloading || loading}>
            <div style={{ padding: '0 120px' }}>
                <WrapperTypeProduct >
                    {typeProducts.map((item) => {
                        return (
                            <TypeProductComponent name={item} key={item} />
                        )
                    })}
                </WrapperTypeProduct>
            </div>
            <div className='body' style={{ width: '100%', backgroundColor: '#efefef', paddingTop: '5px' }}>
                <div id='container' style={{ backgroundColor: '#efefef', padding: '0 120px', height: '100%' }}>
                    <SliderComponent arrImages={[tiki1, tiki2, tiki3]} />
                    <WrapperProducts>
                        {products?.data?.map((product) => {
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
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                        <WrapperButtonMore textbutton='Xem thêm' type='outline' styleButton={{
                            border: '1px solid rgb(11,116 ,229)', color: 'rgb(11,116,229)', width: '240px', height: '38px', borderRadius: '4px'
                        }}
                            styleTextButton={{ fontWeight: 500 }}
                            onClick={() => setLimit((prev) => prev + 6)}
                        />
                    </div>
                </div>
            </div>

        </ LoadingComponent>

    )
}

export default HomePage
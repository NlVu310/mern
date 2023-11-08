import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ProductDetailsComponent from '../../components/ProductDetailsComponent/ProductDetailsComponent'

const ProductDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  return (
    <div style={{ padding: '0 120px', background: ' #efefef', height: '1000px' }}>
      <h5 style={{ marginTop: '0px' }}> <span style={{ cursor: 'pointer', fontWeight: 'bold' }} onClick={() => navigate('/')}> Trang chủ</span> - Chi tiết sản phẩm </h5>
      <ProductDetailsComponent idProduct={id} />
    </div>
  )
}

export default ProductDetails
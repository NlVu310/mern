import React from 'react'
import NavBarComponent from '../../components/NavBarComponent/NavBarComponent'
import CardComponent from '../../components/CardComponent/CardComponent'
import { Row, Pagination, Col } from 'antd'
import { WrapperNavBar, WrapperProducts } from './style'

const TypeProductPage = () => {
    const onChange = () => { }
    return (
        <div style={{ padding: '0 120px', backgroundColor: '#efefef' }}>
            <Row style={{ flexWrap: 'nowrap', paddingTop: '10px' }}>
                <WrapperNavBar span={4} >
                    <NavBarComponent />
                </WrapperNavBar>
                <Col span={20}>
                    <WrapperProducts>
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                    </WrapperProducts>
                    <Pagination defaultCurrent={1} total={100} onChange={onChange} style={{ textAlign: 'center', marginTop: '10px' }} />
                </Col>
            </Row>
        </div >
    )
}

export default TypeProductPage
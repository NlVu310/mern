import { Menu } from 'antd'
import React, { useState } from 'react'
import { getItem } from '../../utils';
import { UserOutlined, AppstoreOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import AdminUserComponent from '../../components/AdminUserComponent/AdminUserComponent';
import AdminProductComponent from '../../components/AdminProductComponent/AdminProductComponent';
import AdminOrderComponent from '../../components/AdminOrderComponent/AdminOrderComponent';

const AdminPage = () => {
    const items = [
        getItem('Người dùng', 'user', <UserOutlined />),
        getItem('Sản phẩm', 'product', <AppstoreOutlined />),
        getItem('Đơn đặt hàng', 'order', <ShoppingCartOutlined />)
    ];

    const [keySelected, setKeySelected] = useState('')
    const handleOnClick = ({ key }) => {
        setKeySelected(key)
    }
    const renderPage = (key) => {
        switch (key) {
            case 'user': //khai báo key trong items
                return (
                    <AdminUserComponent />
                )
            case 'product':
                return (
                    <AdminProductComponent />
                )
            case 'order':
                return (
                    <AdminOrderComponent />
                )
            default:
                return <></>
        }
    }

    // console.log('keySelected', keySelected)
    return (
        <>
            <HeaderComponent isHiddenSearch isHiddenCart />
            <div style={{ display: 'flex' }}>
                <Menu
                    mode="inline"
                    style={{
                        width: 256,
                        boxShadow: '1px 1px 2px #ccc',
                        height: '100vh'
                    }}
                    items={items}
                    onClick={handleOnClick}
                />
                <div style={{ flex: 1, padding: '15px' }}>
                    {renderPage(keySelected)}
                </div>
            </div>
        </>
    )
}

export default AdminPage
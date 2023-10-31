import React, { useEffect, useState } from 'react'
import { Badge, Col, Popover } from 'antd';
import { WrapperContentPopup, WrapperHeader, WrapperHeaderAccount, WrapperTextHeader, WrapperTextHeaderSmall } from './style';
import { UserOutlined, CaretDownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import ButtonInputSearchComponent from '../ButtonInputSearchComponent/ButtonInputSearchComponent';
import { useNavigate } from 'react-router-dom'; //hook 
import { useDispatch, useSelector } from 'react-redux';
import * as UserSerivce from '../../services/UserService'
import { resetUser } from '../../redux/slides/userSlide'
import LoadingComponent from '../LoadingComponent/LoadingComponent';


const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
    const navigate = useNavigate()
    const handleNavigateLogin = () => { //khai báo 1 hàm 
        navigate('/sign-in')
    }
    const user = useSelector((state) => state.user)
    // console.log("user", user)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [userAvatar, setUserAvatar] = useState('')// eslint-disable-next-line 
    const [userName, setUserName] = useState('')
    const handleLogOut = async () => {
        setLoading(true)
        await UserSerivce.logOutUser()
        dispatch(resetUser())
        navigate('/')
        setLoading(false)
    }

    useEffect(() => {
        setLoading(true)
        setUserName(user?.name)
        setUserAvatar(user?.avatar)
        setLoading(false)
    }, [user?.name, user?.avatar])

    const content = (
        <div>
            <WrapperContentPopup onClick={handleLogOut}>Đăng xuất</WrapperContentPopup>
            <WrapperContentPopup onClick={() => navigate('/profile-user')}>Thông tin người dùng</WrapperContentPopup>
            {user?.isAdmin && (
                <WrapperContentPopup onClick={() => navigate('/system/admin')}>Quản lí hệ thống</WrapperContentPopup>
            )}
        </div>
    );


    return (
        <div style={{ width: '100%', background: 'rgb(26, 148, 255)' }}
        >
            <WrapperHeader style={{ justifyContent: isHiddenSearch && isHiddenCart ? 'space-between' : 'unset' }}>
                <Col span={5}> <WrapperTextHeader> NLV</WrapperTextHeader> </Col>
                {!isHiddenSearch && (
                    <Col span={13}>
                        <ButtonInputSearchComponent
                            size="large"
                            bordered={false}
                            textButton="Tìm kiếm"
                            placeholder="inpt search text"
                        />
                    </Col>
                )}
                <Col span={6} style={{ display: 'flex', gap: '54px', alignItems: 'center' }}>
                    <LoadingComponent isLoading={loading} >
                        <WrapperHeaderAccount >
                            {userAvatar ? (
                                <img src={userAvatar} style={{
                                    height: '50px',
                                    width: '50px',
                                    borderRadius: '50%',
                                    objectFit: 'cover'
                                }} alt='avatar' />
                            ) : (
                                <UserOutlined style={{ fontSize: '30px' }} />
                            )}
                            {user?.access_token ? (
                                <>
                                    <Popover content={content} trigger="click" >
                                        <div style={{ cursor: 'pointer' }}> {user?.name || user?.email} </div>
                                    </Popover>
                                </>
                            ) : (
                                <div onClick={handleNavigateLogin} style={{ cursor: 'pointer' }}>
                                    <WrapperTextHeaderSmall> Đăng nhập/ Đăng ký </WrapperTextHeaderSmall>
                                    <div>
                                        <WrapperTextHeaderSmall> Tài khoản</WrapperTextHeaderSmall>
                                        <CaretDownOutlined />
                                    </div>
                                </div>
                            )
                            }
                        </WrapperHeaderAccount>
                    </LoadingComponent>
                    {!isHiddenCart && (
                        <div>
                            <Badge count={4} size='small'>
                                <ShoppingCartOutlined style={{ fontSize: "30px", color: '#fff' }} />
                            </Badge>
                            <WrapperTextHeaderSmall>  Giỏ hàng</WrapperTextHeaderSmall>
                        </div>
                    )}
                </Col>
            </WrapperHeader>
        </div>
    )
}

export default HeaderComponent
import React, { useEffect, useMemo, useState } from 'react'
import { CustomCheckbox, WrapperCountOrder, WrapperInfo, WrapperItemOrder, WrapperLeft, WrapperListOrder, WrapperRight, WrapperStyleHeader, WrapperStyleHeaderDilivery, WrapperTotal } from './style'
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons'
import StepComponent from '../../components/StepComponent/StepComponent'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import ModalComponent from '../../components/ModalComponent/ModalComponent'
import InputComponent from '../../components/InputComponent/InputComponent'
import { useDispatch, useSelector } from 'react-redux'
import { Form } from 'antd'
import { WrapperInputNumber } from '../../components/ProductDetailsComponent/style'
import { decreaseAmount, increaseAmount, removeAllOrderProduct, removeOrderProduct, selectedOrder } from '../../redux/slides/orderSlide'
import { convertPrice } from '../../utils'
import * as UserService from '../../services/UserService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent'
import * as message from '../../components/MessageComponent/MessageComponent'
import { updateUser } from '../../redux/slides/userSlide'
import { useNavigate } from 'react-router-dom'



const OrderPage = () => {
    const order = useSelector((state) => state.order)
    const user = useSelector((state) => state.user)
    const navigate = useNavigate()
    const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false)
    const [listChecked, setListChecked] = useState([])
    const dispatch = useDispatch()
    const [form] = Form.useForm();
    const [stateUserDetails, setStateUserDetails] = useState({
        name: '',
        phone: '',
        address: '',
        city: ''
    })

    const mutationUpdate = useMutationHooks(
        (data) => {
            const { id,
                token,
                ...rests } = data
            const res = UserService.updateUser(id, { ...rests }, token)
            return res
        }
    )
    const onChange = (e) => {
        if (listChecked.includes(e.target.value)) {
            const newListChecked = listChecked.filter((item) => item !== e.target.value)
            setListChecked(newListChecked)
        } else {
            setListChecked([...listChecked, e.target.value])
        }
    };

    const priceMemo = useMemo(() => {
        const result = order?.orderItems?.reduce((total, cur) => {
            return total + ((cur.price * cur.amount))
        }, 0)
        return result
    }, [order])

    const priceDiscountMemo = useMemo(() => {
        const result = order?.orderItems?.reduce((total, cur) => {
            const totalDiscount = cur.discount ? cur.discount : 0
            return total + (priceMemo * (totalDiscount * cur.amount) / 100)
        }, 0)
        if (Number(result)) {
            return result
        }
        return 0
    }, [order])


    const diliveryPriceMemo = useMemo(() => {
        if (priceMemo >= 2000000 && priceMemo < 5000000) {
            return 15000
        } else if (priceMemo >= 5000000 || order?.orderItems?.length === 0) {
            return 0
        } else {
            return 25000
        }
    }, [priceMemo])

    const totalPriceMemo = useMemo(() => {
        return Number(priceMemo) - Number(priceDiscountMemo) + Number(diliveryPriceMemo)
    }, [priceMemo, priceDiscountMemo, diliveryPriceMemo])




    const handleChangeCount = (type, idProduct, limited) => {
        if (type === 'increase') {
            if (!limited) {
                dispatch(increaseAmount({ idProduct }))
            }
        } else {
            if (!limited) {
                dispatch(decreaseAmount({ idProduct }))
            }
        }
    }

    const handleDeleteOrder = (idProduct) => {
        dispatch(removeOrderProduct({ idProduct }))
    }

    const handleOnchangeCheckAll = (e) => {
        if (e.target.checked) {
            const newListChecked = []
            order?.orderItems?.forEach((item) => {
                newListChecked.push(item?.product)
            })
            setListChecked(newListChecked)
        } else {
            setListChecked([])
        }
    }

    const handleRemoveAllOrder = () => {
        if (listChecked?.length > 1) {
            dispatch(removeAllOrderProduct({ listChecked }))
        }
    }

    const handleOnchangeDetails = (e) => {
        setStateUserDetails({
            ...stateUserDetails,
            [e.target.name]: e.target.value
        })
    }
    const handleChangeAddress = () => {
        setIsOpenModalUpdateInfo(true)
    }

    const handleAddCard = () => {
        // if (!order?.orderItemsSlected?.length) {
        //     message.error('Vui lòng chọn sản phẩm')
        // }
        if (!user?.phone || !user?.address || !user?.name || !user?.city) {
            setIsOpenModalUpdateInfo(true)
        }
        else {
            navigate('/payment')
        }
    }

    const handleCancelUpdate = () => {
        setStateUserDetails({
            name: '',
            phone: '',
            city: '',
            address: '',
        })
        form.resetFields()
        setIsOpenModalUpdateInfo(false)
    }
    const handleUpdateInforUser = () => {
        const { name, address, city, phone } = stateUserDetails
        if (name && address && city && phone) {
            mutationUpdate.mutate({ id: user?.id, token: user?.access_token, ...stateUserDetails }, {
                onSuccess: () => {
                    // dispatch(updateUser({ name, address, city, phone }))
                    setIsOpenModalUpdateInfo(false)
                },
                // onSettled: () => {
                //     stateUserDetails.refetch()
                // }
            })
        }
    }

    const { isLoading, data } = mutationUpdate

    useEffect(() => {
        dispatch(selectedOrder({ listChecked }))
    }, [listChecked])


    useEffect(() => {
        form.setFieldsValue(stateUserDetails)
    }, [form, stateUserDetails])

    useEffect(() => {
        if (isOpenModalUpdateInfo) {
            setStateUserDetails({
                city: user?.city,
                name: user?.name,
                address: user?.address,
                phone: user?.phone
            })
        }
    }, [isOpenModalUpdateInfo])

    const itemsDelivery = [
        {
            title: '25.000 VND',
            description: 'Dưới 2.000.000 VND',
        },
        {
            title: '15.000 VND',
            description: 'Từ 2.000.000 VND đến dưới 5.000.000 VND',
        },
        {
            title: 'Free ship',
            description: 'Trên 5.000.000 VND',
        },
    ]
    console.log('order', order)


    return (
        <div style={{ background: '#f5f5fa', with: '100%', height: '100vh' }}>
            <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
                <h3 style={{ fontWeight: 'bold', marginTop: '0' }}>Giỏ hàng</h3>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <WrapperLeft>
                        <h4>Phí giao hàng</h4>
                        <WrapperStyleHeaderDilivery>
                            <StepComponent
                                items={itemsDelivery} current={diliveryPriceMemo === 15000
                                    ? 1 : diliveryPriceMemo === 25000 ? 0
                                        : order.orderItems.length === 0 ? 3 : 2
                                }
                            />
                        </WrapperStyleHeaderDilivery>
                        <WrapperStyleHeader>
                            <span style={{ display: 'inline-block', width: '390px' }}>
                                <CustomCheckbox onChange={handleOnchangeCheckAll} checked={listChecked?.length === order?.orderItems?.length}></CustomCheckbox>
                                <span> Tất cả ({order?.orderItems?.length} sản phẩm)</span>
                            </span>
                            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <span>Đơn giá</span>
                                <span>Số lượng</span>
                                <span>Thành tiền</span>
                                <DeleteOutlined style={{ cursor: 'pointer' }} onClick={handleRemoveAllOrder} />
                            </div>
                        </WrapperStyleHeader>
                        <WrapperListOrder>
                            {order?.orderItems?.map((order) => {
                                return (
                                    <WrapperItemOrder key={order?.product}>
                                        <div style={{ width: '390px', display: 'flex', alignItems: 'center', gap: 4 }}>
                                            <CustomCheckbox onChange={onChange} checked={listChecked.includes(order?.product)} value={order?.product} ></CustomCheckbox>
                                            <img src={order?.image} style={{ width: '77px', height: '79px', objectFit: 'cover' }} />
                                            <div style={{
                                                width: 260,
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap'
                                            }}>{order?.name}</div>
                                        </div>
                                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <span>
                                                <span style={{ fontSize: '13px', color: '#242424' }}>{convertPrice(order?.price)}</span>
                                            </span>
                                            <WrapperCountOrder>
                                                <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('decrease', order?.product, order?.amount === 1)} >
                                                    <MinusOutlined style={{ color: '#000', fontSize: '10px' }} />
                                                </button>
                                                <WrapperInputNumber defaultValue={order?.amount} value={order?.amount} size="small" min={1} max={order?.countInStock} />
                                                <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('increase', order?.product, order?.amount === order?.countInStock, order?.amount === 1)} >
                                                    <PlusOutlined style={{ color: '#000', fontSize: '10px' }} />
                                                </button>
                                            </WrapperCountOrder>
                                            <span style={{ color: 'rgb(255, 66, 78)', fontSize: '13px', fontWeight: 500 }}>{convertPrice(order?.price * order?.amount)}</span>
                                            <DeleteOutlined style={{ cursor: 'pointer' }} onClick={() => handleDeleteOrder(order?.product)} />
                                        </div>
                                    </WrapperItemOrder>
                                )
                            })}
                        </WrapperListOrder>
                    </WrapperLeft>
                    <WrapperRight>
                        <div style={{ width: '100%' }}>
                            <WrapperInfo>
                                <div>
                                    <span>Địa chỉ: </span>
                                    <span style={{ fontWeight: 'bold' }}>{`${user?.address} ${user?.city}`} </span>
                                    <span onClick={handleChangeAddress} style={{ color: '#9255FD', cursor: 'pointer' }}>Thay đổi</span>
                                </div>
                            </WrapperInfo>
                            <WrapperInfo>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span>Tạm tính</span>
                                    <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>{convertPrice(priceMemo)}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    {/* <span>Giảm giá</span>
                                    <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>{convertPrice(priceDiscountMemo)}</span> */}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span>Phí giao hàng</span>
                                    <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>{convertPrice(diliveryPriceMemo)}</span>
                                </div>
                            </WrapperInfo>
                            <WrapperTotal>
                                <span>Tổng tiền</span>
                                <span style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ color: 'rgb(254, 56, 52)', fontSize: '24px', fontWeight: 'bold' }}>{convertPrice(totalPriceMemo)}</span>
                                    <span style={{ color: '#000', fontSize: '11px' }}>(Đã bao gồm VAT nếu có)</span>
                                </span>
                            </WrapperTotal>
                        </div>
                        <div style={{ marginLeft: '40px' }}>
                            <ButtonComponent
                                onClick={() => handleAddCard()}
                                size={40}
                                styleButton={{
                                    background: 'rgb(255, 57, 69)',
                                    height: '48px',
                                    width: '360px',
                                    border: 'none',
                                    borderRadius: '4px'
                                }}
                                textbutton={'Mua hàng'}
                                styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                            ></ButtonComponent>
                        </div>
                    </WrapperRight>
                </div>
            </div>
            <ModalComponent forceRender title="Cập nhật thông tin giao hàng" open={isOpenModalUpdateInfo} onCancel={handleCancelUpdate} onOk={handleUpdateInforUser}>
                <LoadingComponent isLoading={isLoading}>
                    <Form
                        name="basic"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        // onFinish={onUpdateUser}
                        autoComplete="on"
                        form={form}
                    >
                        <Form.Item
                            label="Tên"
                            name="name"
                            rules={[{ required: true, message: 'Nhập tên!' }]}
                        >
                            <InputComponent value={stateUserDetails['name']} onChange={handleOnchangeDetails} name="name" />
                        </Form.Item>
                        <Form.Item
                            label="Thành phố"
                            name="city"
                            rules={[{ required: true, message: 'Nhập Thành phố!' }]}
                        >
                            <InputComponent value={stateUserDetails['city']} onChange={handleOnchangeDetails} name="city" />
                        </Form.Item>
                        <Form.Item
                            label="Số điện thoại"
                            name="phone"
                            rules={[{ required: true, message: 'Nhập số điện thoại!' }]}
                        >
                            <InputComponent value={stateUserDetails.phone} onChange={handleOnchangeDetails} name="phone" />
                        </Form.Item>

                        <Form.Item
                            label="Địa chỉ"
                            name="address"
                            rules={[{ required: true, message: 'Nhập địa chỉ!' }]}
                        >
                            <InputComponent value={stateUserDetails.address} onChange={handleOnchangeDetails} name="address" />
                        </Form.Item>
                    </Form>
                </LoadingComponent>
            </ModalComponent>
        </div>
    )
}


export default OrderPage
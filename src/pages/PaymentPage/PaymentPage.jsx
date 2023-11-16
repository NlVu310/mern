import React, { useEffect, useMemo, useState } from 'react'
import { Lable, WrapperInfo, WrapperLeft, WrapperRadio, WrapperRight, WrapperTotal } from './style'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import ModalComponent from '../../components/ModalComponent/ModalComponent'
import InputComponent from '../../components/InputComponent/InputComponent'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Radio } from 'antd'
import { selectedOrder } from '../../redux/slides/orderSlide'
import { convertPrice } from '../../utils'
import * as UserService from '../../services/UserService'
import * as OrderService from '../../services/OrderService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent'
import * as message from '../../components/MessageComponent/MessageComponent'

const PaymentPage = () => {
    const order = useSelector((state) => state.order)
    const user = useSelector((state) => state.user)
    const [delivery, setDelivery] = useState('fast')
    const [payment, setPayment] = useState('paypal')
    const [sdkReady, setSdkReady] = useState(false)

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
    const onChange = (e) => {
        if (listChecked.includes(e.target.value)) {
            const newListChecked = listChecked.filter((item) => item !== e.target.value)
            setListChecked(newListChecked)
        } else {
            setListChecked([...listChecked, e.target.value])
        }
    };


    const mutationAddOrder = useMutationHooks(
        (data) => {
            const {
                token,
                ...rests } = data
            const res = OrderService.createOrder({ ...rests }, token)
            return res
        }
    )

    const mutationUpdate = useMutationHooks(
        (data) => {
            const { id,
                token,
                ...rests } = data
            const res = UserService.updateUser(id, { ...rests }, token)
            return res
        }
    )


    const priceMemo = useMemo(() => {
        const result = order?.orderItems?.reduce((total, cur) => {
            // const result = order?.orderItemsSlected?.reduce((total, cur) => {
            return total + ((cur.price * cur.amount))
        }, 0)
        return result
    }, [order])

    const priceDiscountMemo = useMemo(() => {
        const result = order?.orderItems?.reduce((total, cur) => {
            // const result = order?.orderItemsSlected?.reduce((total, cur) => {
            const totalDiscount = cur.discount ? cur.discount : 0
            return total + (priceMemo * (totalDiscount * cur.amount) / 100)
        }, 0)
        if (Number(result)) {
            return result
        }
        return 0
    }, [order])

    const diliveryPriceMemo = useMemo(() => {
        if (priceMemo >= 20000) {
            return 10000
        } else if (priceMemo === 0) {
            return 0
        } else {
            return 0
        }
    }, [priceMemo])

    const totalPriceMemo = useMemo(() => {
        return Number(priceMemo) - Number(priceDiscountMemo) + Number(diliveryPriceMemo)
    }, [priceMemo, priceDiscountMemo, diliveryPriceMemo])

    const handleOnchangeDetails = (e) => {
        setStateUserDetails({
            ...stateUserDetails,
            [e.target.name]: e.target.value
        })
    }
    const handleChangeAddress = () => {
        setIsOpenModalUpdateInfo(true)
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

    const handlePayment = (e) => {
        setPayment(e.target.value)
    }

    const handleDilivery = (e) => {
        setDelivery(e.target.value)
    }

    const handleAddOrder = () => {
        mutationAddOrder.mutate({
            token: user?.access_token,
            orderItems: order?.orderItems,
            // orderItems: order?.orderItems,
            fullName: user?.name,
            address: user?.address,
            phone: user?.phone,
            city: user?.city,
            paymentMethod: payment,
            itemsPrice: priceMemo,
            shippingPrice: diliveryPriceMemo,
            totalPrice: totalPriceMemo,
            user: user?.id
        }, {
            onSuccess: () => {
                message.success('Đặt hàng thành công')
            }
        })
    }

    console.log('order', order, user)

    const { isLoading, data } = mutationUpdate
    const { isLoadingAddOrder } = mutationAddOrder
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

    return (
        <div style={{ background: '#f5f5fa', with: '100%', height: '100vh' }}>
            {/* <LoadingComponent isLoading={isLoadingAddOrder}> */}
            <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
                <h3 style={{ marginTop: '0' }}>Thanh toán</h3>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <WrapperLeft>
                        <WrapperInfo>
                            <div>
                                <Lable>Chọn phương thức giao hàng</Lable>
                                <WrapperRadio onChange={handleDilivery} value={delivery} >
                                    <Radio value="fast"><span style={{ color: '#ea8500', fontWeight: 'bold' }}>FAST</span> Giao hàng tiết kiệm</Radio>
                                    <Radio value="gojek"><span style={{ color: '#ea8500', fontWeight: 'bold' }}>GO_JEK</span> Giao hàng tiết kiệm</Radio>
                                </WrapperRadio>
                            </div>
                        </WrapperInfo>
                        <WrapperInfo>
                            <div>
                                <Lable>Chọn phương thức thanh toán</Lable>
                                <WrapperRadio onChange={handlePayment} value={payment} >
                                    <Radio value="later_money"> Thanh toán tiền mặt khi nhận hàng</Radio>
                                    <Radio value="paypal"> Thanh toán tiền bằng paypal</Radio>
                                </WrapperRadio>
                            </div>
                        </WrapperInfo>
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
                                    <span>Giảm giá</span>
                                    <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>{convertPrice(priceDiscountMemo)}</span>
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
                        <div style={{ marginLeft: '60px' }}>
                            <ButtonComponent
                                onClick={() => handleAddOrder()}
                                size={40}
                                styleButton={{
                                    background: 'rgb(255, 57, 69)',
                                    height: '48px',
                                    width: '340px',
                                    border: 'none',
                                    borderRadius: '4px'
                                }}
                                textbutton={'Đặt hàng'}
                                styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                            ></ButtonComponent>
                        </div>
                    </WrapperRight>
                </div>
            </div>
            <ModalComponent forceRender title="Cập nhật thông tin giao hàng" open={isOpenModalUpdateInfo} onCancel={handleCancelUpdate} onOk={handleUpdateInforUser}>
                {/* <Loading isLoading={isLoading}> */}
                <Form
                    name="basic"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 20 }}
                    // onFinish={onUpdateUser}
                    autoComplete="on"
                    form={form}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <InputComponent value={stateUserDetails['name']} onChange={handleOnchangeDetails} name="name" />
                    </Form.Item>
                    <Form.Item
                        label="City"
                        name="city"
                        rules={[{ required: true, message: 'Please input your city!' }]}
                    >
                        <InputComponent value={stateUserDetails['city']} onChange={handleOnchangeDetails} name="city" />
                    </Form.Item>
                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[{ required: true, message: 'Please input your  phone!' }]}
                    >
                        <InputComponent value={stateUserDetails.phone} onChange={handleOnchangeDetails} name="phone" />
                    </Form.Item>

                    <Form.Item
                        label="Adress"
                        name="address"
                        rules={[{ required: true, message: 'Please input your  address!' }]}
                    >
                        <InputComponent value={stateUserDetails.address} onChange={handleOnchangeDetails} name="address" />
                    </Form.Item>
                </Form>
                {/* </Loading> */}
            </ModalComponent>
            {/* </LoadingComponent> */}
        </div>
    )
}

export default PaymentPage
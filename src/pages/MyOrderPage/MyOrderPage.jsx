import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import * as message from '../../components/MessageComponent/MessageComponent'
import { useLocation, useNavigate } from 'react-router-dom'
import * as OrderService from '../../services/OrderService'
import { useQuery } from '@tanstack/react-query'
import { WrapperContainer, WrapperFooterItem, WrapperHeaderItem, WrapperItemOrder, WrapperListOrder, WrapperStatus } from './style'
import { convertPrice } from '../../utils'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { useMutationHooks } from '../../hooks/useMutationHook'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent'



const MyOrderPage = () => {
    const location = useLocation()
    const { state } = location
    const navigate = useNavigate()
    // const query = useQuery()
    const user = useSelector((state) => state.user)
    const order = useSelector((state) => state.order)


    const fetchMyOrder = async () => {
        const res = await OrderService.getOrderByUserId(state?.id, state?.token)
        return res
    }

    const queryOrder = useQuery({ queryKey: ['orders'], queryFn: fetchMyOrder }, {
        enabled: state?.id && state?.token
    })
    const { isLoading, data } = queryOrder

    const handleDetailsOrder = (id) => {
        navigate(`/details-order/${id}`, {
            state: {
                token: state?.token
            }
        })
    }

    const mutation = useMutationHooks(
        (data) => {
            const { id, token, orderItems, userId } = data
            const res = OrderService.cancelOrder(id, token, orderItems, userId)
            return res
        }
    )

    const handleCancelOrder = (order) => {
        mutation.mutate({ id: order._id, token: state?.token, orderItems: order?.orderItems, userId: user.id }, {
            onSuccess: () => {
                queryOrder.refetch()
            },
        })
    }
    const { isLoading: isLoadingCancel, isSuccess: isSuccessCancel, isError: isErrorCancle, data: dataCancel } = mutation

    useEffect(() => {
        if (isSuccessCancel && dataCancel?.status === 'OK') {
            message.success()
        } else if (isSuccessCancel && dataCancel?.status === 'ERR') {
            message.error(dataCancel?.message)
        } else if (isErrorCancle) {
            message.error()
        }
    }, [isErrorCancle, isSuccessCancel])

    const renderProduct = (data) => {
        return data?.map((order) => {
            return <WrapperHeaderItem key={order?._id}>
                <img src={order?.image}
                    style={{
                        width: '70px',
                        height: '70px',
                        objectFit: 'cover',
                        border: '1px solid rgb(238, 238, 238)',
                        padding: '2px'
                    }}
                />
                <div style={{
                    width: 260,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    marginLeft: '10px'
                }}>{order?.name}</div>
                <span style={{ fontSize: '13px', color: '#242424', marginLeft: 'auto' }}>{convertPrice(order?.price)}</span>
            </WrapperHeaderItem>
        })
    }


    console.log('data', data)
    return (
        // <> test my order</>
        <LoadingComponent isLoading={isLoading || isLoadingCancel}>
            <WrapperContainer>
                <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
                    <h4 style={{ marginTop: '0px' }}>Đơn hàng của tôi</h4>
                    <WrapperListOrder>
                        {data?.data?.map((order) => {
                            return (
                                <WrapperItemOrder key={order?._id}>
                                    <WrapperStatus>
                                        <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Trạng thái</span>
                                        <div>
                                            <span style={{ color: 'rgb(255, 66, 78)' }}>Giao hàng: </span>
                                            <span style={{ color: 'rgb(90, 32, 193)', fontWeight: 'bold' }}>{`${order.isDelivered ? 'Đã giao hàng' : 'Chưa giao hàng'}`}</span>
                                        </div>
                                        <div>
                                            <span style={{ color: 'rgb(255, 66, 78)' }}>Thanh toán: </span>
                                            <span style={{ color: 'rgb(90, 32, 193)', fontWeight: 'bold' }}>{`${order.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}`}</span>
                                        </div>
                                    </WrapperStatus>
                                    {renderProduct(order?.orderItems)}
                                    <WrapperFooterItem>
                                        <div>
                                            <span style={{ color: 'rgb(255, 66, 78)' }}>Tổng tiền: </span>
                                            <span
                                                style={{ fontSize: '13px', color: 'rgb(56, 56, 61)', fontWeight: 700 }}
                                            >{convertPrice(order?.totalPrice)}</span>
                                        </div>
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <ButtonComponent
                                                onClick={() => handleCancelOrder(order)}
                                                size={40}
                                                styleButton={{
                                                    height: '36px',
                                                    border: '1px solid #9255FD',
                                                    borderRadius: '4px'
                                                }}
                                                textbutton={'Hủy đơn hàng'}
                                                styleTextButton={{ color: '#9255FD', fontSize: '14px' }}
                                            >
                                            </ButtonComponent>
                                            <ButtonComponent
                                                onClick={() => handleDetailsOrder(order?._id)}
                                                size={40}
                                                styleButton={{
                                                    height: '36px',
                                                    border: '1px solid #9255FD',
                                                    borderRadius: '4px'
                                                }}
                                                textbutton={'Xem chi tiết'}
                                                styleTextButton={{ color: '#9255FD', fontSize: '14px' }}
                                            >
                                            </ButtonComponent>
                                        </div>
                                    </WrapperFooterItem>
                                </WrapperItemOrder>
                            )
                        })}
                    </WrapperListOrder>
                </div>
            </WrapperContainer>
        </LoadingComponent>
    )
}


export default MyOrderPage
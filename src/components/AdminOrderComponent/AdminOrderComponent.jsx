import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import * as OrderService from '../../services/OrderService'
import { useQuery } from '@tanstack/react-query'
import InputComponent from '../InputComponent/InputComponent'
import { Button, Form, Select, Space } from 'antd'
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import TableComponent from '../TableComponent/TableComponent'
import { WrapperHeader } from './style'
import { convertPrice, renderPaidOptions, renderShippedOptions } from '../../utils'
import { orderContant } from '../../contant'
import LoadingComponent from '../LoadingComponent/LoadingComponent'
import PieChartComponent from './PieChartComponent'
import { useLocation, useNavigate } from 'react-router-dom'
import { useMutationHooks } from '../../hooks/useMutationHook'
import ModalComponent from '../ModalComponent/ModalComponent'
import * as message from '../../components/MessageComponent/MessageComponent'
import DrawerComponent from '../DrawerComponent/DrawerComponent'


const AdminOrderComponent = () => {
    const [rowSelected, setRowSelected] = useState('')
    const [form] = Form.useForm();
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const user = useSelector((state) => state?.user)
    const order = useSelector((state) => state.order)
    const location = useLocation()
    const { state } = location
    const navigate = useNavigate()
    const getAllOrder = async () => {
        const res = await OrderService.getAllOrder()
        return res
    }


    const inittial = () => ({
        userName: '',
        phone: '',
        address: '',
        isPaid: '',
        isDelivered: '',
    })

    const [stateOrderDetails, setstateOrderDetails] = useState(inittial())


    const fetchGetDetailsOrder = async (rowSelected) => {
        const res = await OrderService.getDetailsOrder(rowSelected)
        if (res?.data) {
            setstateOrderDetails({
                userName: res?.data?.shippingAddress?.fullName,
                phone: res?.data?.shippingAddress?.phone,
                address: res?.data?.shippingAddress?.address,
                isPaid: res?.data?.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán',
                isDelivered: res?.data?.isDelivered,
            })
        }
    }
    const queryOrder = useQuery({ queryKey: ['orders'], queryFn: getAllOrder })
    const { isLoading: isLoadingOrders, data: orders } = queryOrder


    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
                <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsOpenDrawer(true)} />
            </div>
        )
    }


    const mutationUpdate = useMutationHooks(
        (data) => {
            const { id, ...rests } = data
            const res = OrderService.updateOrder(id, { ...rests })
            return res
        }
    )

    const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate

    const onUpdateOrder = async () => {
        mutationUpdate.mutate({ id: rowSelected, ...stateOrderDetails }, {
            onSettled: () => {
                queryOrder.refetch()
            }
        })
    }

    const handleOnchangeDetails = (e) => {
        setstateOrderDetails({
            ...stateOrderDetails,
            [e.target.name]: e.target.value
        })
    }

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <InputComponent
                    // ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    // onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        // onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        // onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                // setTimeout(() => searchInput.current?.select(), 100);
            }
        },

    });

    // useEffect = (() => {

    // }, [])
    const columns = [
        {
            title: 'Tên người dùng',
            dataIndex: 'userName',
            sorter: (a, b) => a.userName.length - b.userName.length,
            ...getColumnSearchProps('userName')
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            sorter: (a, b) => a.phone.length - b.phone.length,
            ...getColumnSearchProps('phone')
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            sorter: (a, b) => a.address.length - b.address.length,
            ...getColumnSearchProps('address')
        },
        {
            title: 'Thanh toán',
            dataIndex: 'isPaid',
            sorter: (a, b) => a.isPaid.length - b.isPaid.length,
            ...getColumnSearchProps('isPaid')
        },
        {
            title: 'Giao hàng',
            dataIndex: 'isDelivered',
            sorter: (a, b) => a.isDelivered.length - b.isDelivered.length,
            ...getColumnSearchProps('isDelivered')
        },
        {
            title: 'Phương thức thanh toán',
            dataIndex: 'paymentMethod',
            sorter: (a, b) => a.paymentMethod.length - b.paymentMethod.length,
            ...getColumnSearchProps('paymentMethod')
        },
        {
            title: 'Thành tiền',
            dataIndex: 'totalPrice',
            sorter: (a, b) => a.totalPrice.length - b.totalPrice.length,
            ...getColumnSearchProps('totalPrice')
        },
        {
            title: 'Hành động',
            dataIndex: 'action',
            render: renderAction
        },
    ];



    const dataTable = orders?.data?.length && orders?.data?.map((order) => {
        return { ...order, key: order._id, userName: order?.shippingAddress?.fullName, phone: order?.shippingAddress?.phone, address: order?.shippingAddress?.address, paymentMethod: orderContant.payment[order?.paymentMethod], isPaid: order?.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán', isDelivered: order?.isDelivered, totalPrice: convertPrice(order?.totalPrice) }
    })



    const mutation = useMutationHooks(
        (data) => {
            const { id } = data
            const res = OrderService.deleteOrder(id)
            return res
        }

    )

    const handleCancelOrder = (id) => {
        mutation.mutate({ id: rowSelected }, {
            onSettled: () => {
                queryOrder.refetch()
            }
        })
    }

    const handleCancelDelete = () => {
        setIsModalOpenDelete(false)
    }

    const { data, isLoading, isSuccess, isError } = mutation

    useEffect(() => {
        if (isSuccess && data?.status === 'OK') {
            message.success()
            handleCancelDelete()
        } else if (isError) {
            message.error()
        }
    }, [isSuccess])

    useEffect(() => {
        if (rowSelected) {
            fetchGetDetailsOrder(rowSelected)

            console.log('stateorderdetails', stateOrderDetails)
        }
    }, [rowSelected])

    useEffect(() => {
        if (!isModalOpenDelete) {
            form.setFieldsValue(stateOrderDetails)
        } else {
            form.setFieldsValue(inittial())
        }
    }, [form, stateOrderDetails, isModalOpenDelete])

    useEffect(() => {
        if (isSuccessUpdated && dataUpdated?.status === 'OK') {
            message.success()
            setIsOpenDrawer(false)
        } else if (isErrorUpdated) {
            message.error()
            console.log('iserror', isErrorUpdated)
        }
    }, [isSuccessUpdated])



    const mutationDeletedMany = useMutationHooks(
        (data) => {
            const { ids } = data
            const res = OrderService.deleteManyOrder(ids)
            return res
        }
    )

    const handleDeleteManyOrder = (ids) => {
        mutationDeletedMany.mutate({ ids: ids }, {
            onSettled: () => {
                queryOrder.refetch()
            }
        })
    }


    const handleChangeIsPaid = (value) => {
        setstateOrderDetails({
            ...stateOrderDetails,
            isPaid: value
        })
    }
    const handleChangeShip = (value) => {
        setstateOrderDetails({
            ...stateOrderDetails,
            isDelivered: value
        })
    }



    return (
        <div>
            <LoadingComponent isLoading={isLoadingOrders}>
                <WrapperHeader>Quản lý đơn hàng</WrapperHeader>
                <div style={{ height: 200, width: 200 }}>
                    <PieChartComponent data={orders?.data} />
                </div>
                <div style={{ marginTop: '20px' }}>
                    <TableComponent
                        handleDeleteMany={handleDeleteManyOrder}
                        columns={columns}
                        isLoading={isLoadingOrders}
                        data={dataTable}
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: event => {
                                    setRowSelected(record._id)
                                }
                            };
                        }} />
                </div>


                <DrawerComponent title='Chi tiết đơn hàng' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="90%">
                    <LoadingComponent isLoading={isLoadingUpdated}>
                        <Form
                            name="basic"
                            labelCol={{ span: 2 }}
                            wrapperCol={{ span: 22 }}
                            onFinish={onUpdateOrder}
                            autoComplete="on"
                            form={form}
                        >
                            <Form.Item
                                label="Tên người dùng"
                                name="userName"
                                rules={[{ required: false, message: 'Please input your name!' }]}

                            >
                                <InputComponent value={stateOrderDetails.userName} onChange={handleOnchangeDetails} name="userName" />
                            </Form.Item>
                            <Form.Item
                                label="Số điện thoại"
                                name="phone"
                                rules={[{ required: false, message: 'Please input your name!' }]}

                            >
                                <InputComponent value={stateOrderDetails.phone} onChange={handleOnchangeDetails} name="phone" />
                            </Form.Item>
                            <Form.Item
                                label="Địa chỉ"
                                name="address"
                                rules={[{ required: false, message: 'Please input your address!' }]}

                            >
                                <InputComponent value={stateOrderDetails.address} name="address" />
                            </Form.Item>

                            <Form.Item
                                label="Thanh toán"
                                name="isPaid"
                            >
                                <Select
                                    name="isPaid"
                                    value={stateOrderDetails.isPaid}
                                    onChange={handleChangeIsPaid}
                                    options={renderPaidOptions()}
                                />
                            </Form.Item>

                            <Form.Item
                                label="Giao hàng"
                                name="isDelivered"
                            >
                                <Select
                                    name="isDelivered"
                                    value={stateOrderDetails.isDelivered}
                                    onChange={handleChangeShip}
                                    options={renderShippedOptions()} />

                                {/* <InputComponent value={stateOrderDetails.isDelivered} onChange={handleOnchangeDetails} name="isDelivered" /> */}
                            </Form.Item>


                            <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                                <Button type="primary" htmlType="submit">
                                    Apply
                                </Button>
                            </Form.Item>
                        </Form>
                    </LoadingComponent>
                </DrawerComponent>
                <ModalComponent forceRender title="Xóa đơn hàng" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleCancelOrder}>
                    <LoadingComponent isLoading={isLoading}>
                        <div>bạn có chắc xóa đơn hàng này không?</div>
                    </LoadingComponent>
                </ModalComponent>
            </LoadingComponent>
        </div>
    )
}

export default AdminOrderComponent
// import axios from "axios"
import { axiosJWT } from "./UserService"

// export const createOrder = async (data) => {
//     const res = await axios.post(`${process.env.REACT_APP_API_URL}/product/create`, data)
//     return res.data
// }

export const createOrder = async (data, access_token) => {
    // console.log('check order crearte ', access_token, data)
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/order/create/${data.user}`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const getOrderByUserId = async (id, access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/order/get-all-order-by-id/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const getDetailsOrder = async (id, access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/order/get-details-order/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}


export const cancelOrder = async (id, access_token, orderItems, userId) => {
    const data = { orderItems, orderId: id }
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/order/cancel-order/${userId}`, { data }, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const getAllOrder = async () => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/order/get-all-order`)
    return res.data
}

export const deleteOrder = async (id) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/order/delete-order/${id}`)
    return res.data
}


export const updateOrder = async (id, data) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/order/update/${id}`, data)
    return res.data
}


export const deleteManyOrder = async (data) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/order/delete-many-order`, data)
    return res.data
}
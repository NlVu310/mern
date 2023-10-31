import React, { useEffect, useState } from 'react'
import { WrapperHeader, WrapperUploadFile } from './style'
import { PlusOutlined, UploadOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Form, Modal } from 'antd'
import TableComponent from '../TableComponent/TableComponent'
import InputComponent from '../InputComponent/InputComponent'
import { getBase64 } from '../../utils'
import * as ProductService from '../../services/ProductService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import LoadingComponent from '../LoadingComponent/LoadingComponent'
import * as message from '../../components/MessageComponent/MessageComponent'
import { useQuery } from '@tanstack/react-query'
import DrawerComponent from '../DrawerComponent/DrawerComponent'


const AdminProductComponent = () => {
    const [form] = Form.useForm();


    return (
        <div>

        </div>
    )
}

export default AdminProductComponent
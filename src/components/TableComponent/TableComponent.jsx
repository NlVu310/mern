import { Pagination, Table } from 'antd';
import React, { useState } from 'react'
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import { DownOutlined, SmileOutlined } from '@ant-design/icons'
import ModalComponent from '../ModalComponent/ModalComponent';


const TableComponent = (props) => {
    const { selectionType = 'checkbox', data = [], columns = [], isLoading = false, handleDeleteMany } = props
    const [rowSelectedkeys, setRowSelectedKeys] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setRowSelectedKeys(selectedRowKeys)
            console.log(`selectedRowKeys: ${selectedRowKeys}`);
        },

    };

    const handleDeleteAll = () => {
        handleDeleteMany(rowSelectedkeys)
        setIsModalOpen(false)
    }

    const handleOpenModal = () => {
        setIsModalOpen(true)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    return (
        <LoadingComponent isLoading={isLoading}>
            {rowSelectedkeys.length > 0 && (
                <div style={{
                    background: '#1d1ddd',
                    fontWeight: 'bold',
                    padding: '10px',
                    cursor: 'pointer'
                }}
                    onClick={handleOpenModal}>
                    Xóa tất cả
                </div>)
            }
            <div>
                <Table
                    rowSelection={{
                        type: selectionType,
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={data}
                    {...props}
                />

            </div>


            <ModalComponent open={isModalOpen} onCancel={handleCancel} onOk={handleDeleteAll}>
                <div>bạn có chắc muốn xóa dữ liệu đã chọn ?</div>
            </ModalComponent>
        </LoadingComponent>
    )
}

export default TableComponent
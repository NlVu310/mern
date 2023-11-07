import { Divider, Dropdown, Space, Table } from 'antd';
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
        // getCheckboxProps: (record) => ({
        //     disabled: record.name === 'Disabled User',
        //     // Column configuration not to be checked
        //     name: record.name,
        // }),
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


    const items = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    1st menu item
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                    2nd menu item (disabled)
                </a>
            ),
            icon: <SmileOutlined />,
            disabled: true,
        },
        {
            key: '3',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                    3rd menu item (disabled)
                </a>
            ),
            disabled: true,
        },
        {
            key: '4',
            danger: true,
            label: 'a danger item',
        },
    ];
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
                <div>bạn có chắc xóa ?</div>
            </ModalComponent>
        </LoadingComponent>
    )
}

export default TableComponent
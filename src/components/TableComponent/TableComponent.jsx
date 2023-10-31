import { Divider, Table } from 'antd';
import React from 'react'
import LoadingComponent from '../LoadingComponent/LoadingComponent';

const TableComponent = (props) => {
    const { selectionType = 'checkbox', data = [], columns = [], isLoading = false } = props

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };
    return (
        <LoadingComponent isLoading={isLoading}>
            <div>
                <Divider />

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
        </LoadingComponent>
    )
}

export default TableComponent
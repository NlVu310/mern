import { Modal } from 'antd'
import React from 'react'

const ModalComponent = ({ title = 'Xóa dữ liệu', isOpen = false, children, ...rests }) => {
    return (
        <Modal title={title} open={isOpen} {...rests}>
            {children}
        </Modal>
    )
}

export default ModalComponent
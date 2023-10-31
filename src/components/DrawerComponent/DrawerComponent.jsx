import { Drawer } from 'antd'
import React from 'react'

const DrawerComponent = ({ title = 'Drawer', placement = 'right', isOpen = false, children, getContainer = false, ...rests }) => {
    return (
        <>
            <Drawer getContainer={getContainer} title={title} placement={placement} open={isOpen} {...rests}>
                {children}
            </Drawer>
        </>)
}

export default DrawerComponent
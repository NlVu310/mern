import React, { useEffect, useState } from 'react'
import { WrapperContentProfile, WrapperHeader, WrapperInput, WrapperLabel, WrapperUploadFile } from './style'
import InputForm from '../InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { useDispatch, useSelector } from 'react-redux' //gọi từ trong store
import * as UserSerivce from '../../services/UserService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent'
import * as message from '../../components/MessageComponent/MessageComponent'
import { updateUser } from '../../redux/slides/userSlide'
import { Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { getBase64 } from '../../utils'
// import { updateUser } from '../../redux/slides/userSlide'

const ProfilePage = () => {
    const user = useSelector((state) => state.user) //lấy ra user từ trong store
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [avatar, setAvatar] = useState('')
    const dispatch = useDispatch('')

    const mutation = useMutationHooks( //truyền vào data 
        (data) => {
            const { id, access_token, ...rests } = data
            UserSerivce.updateUser(id, rests, access_token)//xu li thay doi data
            //gọi api
        }
    )

    const { data, isLoading, isSuccess, isError } = mutation
    //khai báo cho mutation
    // console.log("data", data)

    useEffect(() => {
        setEmail(user?.email)
        setName(user?.name)
        setPhone(user?.phone)
        setAddress(user?.address)
        setAvatar(user?.avatar)
    }, [user])

    useEffect(() => {
        if (isSuccess) {
            message.success()
            handleGetDetailsUser(user?.id, user?.access_token)
        } else if (isError) {
            message.error()
        }
    }, [isSuccess, isError])

    const handleOnchangeName = (value) => {
        setName(value)
    }
    const handleOnchangeEmail = (value) => {
        setEmail(value)
    }
    const handleOnchangePhone = (value) => {
        setPhone(value)
    }
    const handleOnchangeAddress = (value) => {
        setAddress(value)
    }
    const handleOnchangeAvatar = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setAvatar(file.preview)
    }

    const handleUpdate = () => {
        mutation.mutate({ id: user?.id, email, name, phone, avatar, address, access_token: user?.access_token })
        //truyền data vào trong mutation
        console.log('user', user)
    }


    const handleGetDetailsUser = async (id, token) => {
        const res = await UserSerivce.getDetailUser(id, token)
        dispatch(updateUser({ ...res?.data, access_token: token }))
        //lấy ra thông tin user
    }

    return (
        <div style={{ width: '1302px', margin: '0 auto', height: '500px' }}>
            <WrapperHeader>thông tin người dùng</WrapperHeader>
            <LoadingComponent isLoading={isLoading}>
                <WrapperContentProfile>
                    <WrapperInput>
                        <WrapperLabel htmlFor='name'> Name: </WrapperLabel>
                        <InputForm
                            id='name'
                            style={{ marginLeft: '13px', width: '600px' }}
                            value={name} onChange={handleOnchangeName}
                        />
                        {/* <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            textbutton={'Cập nhật'}
                            styleTextButton={{ color: 'rgb(26, 148, 255)' }}
                            styleButton={{ color: 'rgb(26, 148, 255)', width: 'fit-content', padding: '2px 6px 6px', fontSize: '15px' }}>
                        </ButtonComponent> */}
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor='email'>Email: </WrapperLabel>
                        <InputForm
                            id='email'
                            style={{ marginLeft: '16px', width: '600px' }}
                            value={email} onChange={handleOnchangeEmail}
                        />
                        {/* <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            textbutton={'Cập nhật'}
                            styleTextButton={{ color: 'rgb(26, 148, 255)' }}
                            styleButton={{ color: 'rgb(26, 148, 255)', width: 'fit-content', padding: '2px 6px 6px', fontSize: '15px' }}>
                        </ButtonComponent> */}
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor='phone'>Phone: </WrapperLabel>
                        <InputForm
                            id='phone'
                            style={{ marginLeft: '10px', width: '600px' }}
                            value={phone} onChange={handleOnchangePhone}
                        />
                        {/* <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            textbutton={'Cập nhật'}
                            styleTextButton={{ color: 'rgb(26, 148, 255)' }}
                            styleButton={{ color: 'rgb(26, 148, 255)', width: 'fit-content', padding: '2px 6px 6px', fontSize: '15px' }}>
                        </ButtonComponent> */}
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor='address'>Address: </WrapperLabel>
                        <InputForm
                            id='address'
                            style={{ marginLeft: '2px', width: '600px' }}
                            value={address} onChange={handleOnchangeAddress}
                        />
                        {/* <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            textbutton={'Cập nhật'}
                            styleTextButton={{ color: 'rgb(26, 148, 255)' }}
                            styleButton={{ color: 'rgb(26, 148, 255)', width: 'fit-content', padding: '2px 6px 6px', fontSize: '15px' }}>
                        </ButtonComponent> */}
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor='avatar'>Avatar </WrapperLabel>
                        <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                            <Button icon={<UploadOutlined />} > select File </Button>
                        </WrapperUploadFile>
                        {avatar && (
                            <img src={avatar} style={{
                                height: '60px',
                                width: '60px',
                                borderRadius: '50%',
                                objectFit: 'cover'
                            }} alt='avatar' />
                        )}
                        {/* <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            textbutton={'Cập nhật'}
                            styleTextButton={{ color: 'rgb(26, 148, 255)' }}
                            styleButton={{ color: 'rgb(26, 148, 255)', width: 'fit-content', marginLeft: '20px', padding: '2px 10px 6px', fontSize: '15px' }}>
                        </ButtonComponent> */}
                    </WrapperInput>
                    <div style={{ display: 'flex', margin: 'auto' }}>
                        <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            textbutton={'Cập nhật'}
                            styleTextButton={{ color: 'rgb(26, 148, 255)' }}
                            styleButton={{ color: 'rgb(26, 148, 255)', padding: '2px 6px 6px', fontSize: '15px' }}>
                        </ButtonComponent>
                    </div>
                </WrapperContentProfile>
            </LoadingComponent>
        </div >
    )
}

export default ProfilePage
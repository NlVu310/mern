import React, { useEffect, useState } from 'react'
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style'
import { Image } from 'antd'
import logologin from '../../assets/images/logologin.png'
import InputForm from '../InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { useNavigate } from 'react-router-dom'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import * as UserSerivce from '../../services/UserService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent'
import jwt_decode from "jwt-decode"
import { useDispatch } from 'react-redux'
import { updateUser } from '../../redux/slides/userSlide'

const SignInPage = () => {
    const navigate = useNavigate()
    const handleNavigateSignUp = () => {
        navigate('/sign-up') //chuyen huong 
    }

    const mutation = useMutationHooks(
        data => UserSerivce.loginUser(data)//xu li thay doi data
    )

    const { data, isLoading, isSuccess } = mutation //khai báo mutation có những gì



    useEffect(() => {
        if (isSuccess) {
            // message.success()
            localStorage.setItem('access_token', JSON.stringify(data?.access_token))//truyền vào data tạm thời 
            if (data?.access_token) {
                const decoded = jwt_decode(data?.access_token)
                if (decoded?.id) {
                    handleGetDetailsUser(decoded?.id, data?.access_token)
                }
                navigate('/')
            }
        }
    }, [isSuccess]) //goi den khi render


    const [isShowPassword, setIsShowPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch('')

    const handleOnchangeEmail = (value) => {
        setEmail(value)
    }
    const handleOnchangePassword = (value) => {
        setPassword(value)
    }
    const handleSignIn = () => {
        mutation.mutate({
            email,
            password,
        })
    }

    const handleGetDetailsUser = async (id, token) => {
        const res = await UserSerivce.getDetailUser(id, token)
        dispatch(updateUser({ ...res?.data, access_token: token }))//truy cập vào store 
        //trong store lấy ra user
    }



    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.53)', height: '100vh' }}>
            <div style={{ width: '800px', height: '445px', borderRadius: '6px', background: '#fff', display: 'flex' }}>
                <WrapperContainerLeft>
                    <h1> Xin chào</h1>
                    <p> Đăng nhập hoặc tạo tài khoản </p>
                    <InputForm
                        style={{ marginBottom: '10px' }}
                        placeholder='abc@gmail.com'
                        value={email} onChange={handleOnchangeEmail} />
                    <div style={{ position: 'relative' }}>
                        <span
                            onClick={() => setIsShowPassword(!isShowPassword)}
                            style={{
                                zIndex: 10,
                                position: 'absolute',
                                top: '4px',
                                right: '8px'
                            }}
                        >{
                                isShowPassword ? (
                                    <EyeFilled />
                                ) : (
                                    <EyeInvisibleFilled />
                                )
                            }
                        </span>
                        <InputForm
                            placeholder="password"
                            type={isShowPassword ? "text" : "password"}
                            value={password} onChange={handleOnchangePassword}
                        />
                    </div>

                    {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}
                    <LoadingComponent isLoading={isLoading}>
                        <ButtonComponent
                            onClick={handleSignIn}
                            disabled={!email.length || !password.length}
                            size={40}
                            textButton={'Đăng nhập'}
                            styleTextButton={{ color: '#fff' }}
                            styleButton={{ background: 'rgb(255,57,69)', height: '48px', width: '100%', margin: '26px 0 10px' }}>
                        </ButtonComponent>
                    </LoadingComponent>
                    <p> <WrapperTextLight> Quên mật khẩu</WrapperTextLight></p>
                    <p>Chưa có tải khoản? <WrapperTextLight onClick={handleNavigateSignUp} > Tạo tài khoản </WrapperTextLight></p>
                </WrapperContainerLeft>
                <WrapperContainerRight>
                    <Image src={logologin} alt='logo' preview={false} height={203} width={203} />
                    <h4> Mua sắm tại NLV</h4>
                </WrapperContainerRight>
            </div>
        </div>
    )
}

export default SignInPage
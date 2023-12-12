import React, { useEffect } from 'react'
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style'
import InputForm from '../InputForm/InputForm'
import logologin from '../../assets/images/logologin.png'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { Image } from 'antd'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import * as UserSerivce from '../../services/UserService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent'
import * as message from '../../components/MessageComponent/MessageComponent'


const SignUpPage = () => {
    const navigate = useNavigate()
    const handleNavigateSignIn = () => {
        navigate('/sign-in')
    }

    const mutation = useMutationHooks( //truyền vào trong data
        data => UserSerivce.signUpUser(data),
        //xử lí data đã lấy được,
    )
    const { data, isLoading, isSuccess, isError } = mutation //truyền vào mutation lúc đầu

    //xử lí sau khi sử dụng
    useEffect(() => {
        if (data?.status === 'OK') {
            message.success()
            navigate('/sign-in')
        }
        else if (isError) {
            message.error()
        }
    }, [isSuccess, isError])

    const [isShowPassword, setIsShowPassword] = useState(false) //mặc định false
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false)
    const [email, setEmail] = useState('') // mặc định rỗng
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleOnchangeEmail = (value) => {
        setEmail(value)
    }
    const handleOnchangePassword = (value) => {
        setPassword(value)
    }
    const handleOnchangeConfirmPassword = (value) => {
        setConfirmPassword(value)
    }
    const handleSignUp = () => {
        mutation.mutate({ //tryền dữ liệu vào mutatioi
            email,
            password,
            confirmPassword
        })
    }


    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.53)', height: '100vh' }}>
            <div style={{ width: '800px', height: '445px', borderRadius: '6px', background: '#fff', display: 'flex' }}>
                <WrapperContainerLeft>
                    <p> Tạo tài khoản </p>

                    <InputForm
                        style={{ marginBottom: '10px' }}
                        placeholder='email'
                        value={email} onChange={handleOnchangeEmail}
                    />

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
                        <InputForm placeholder="password"
                            style={{ marginBottom: '10px' }}
                            type={isShowPassword ? "text" : "password"}
                            value={password} onChange={handleOnchangePassword}
                        />
                    </div>
                    <div style={{ position: 'relative' }}>
                        <span
                            onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
                            style={{
                                zIndex: 10,
                                position: 'absolute',
                                top: '4px',
                                right: '8px'
                            }}
                        >{
                                isShowConfirmPassword ? (
                                    <EyeFilled />
                                ) : (
                                    <EyeInvisibleFilled />
                                )
                            }
                        </span>
                        <InputForm
                            placeholder="comfirm password"
                            type={isShowConfirmPassword ? "text" : "password"}
                            value={confirmPassword} onChange={handleOnchangeConfirmPassword}
                        />
                    </div>
                    {data?.status === 'ERR' && (<span style={{ color: 'red' }}>{data?.message}</span>)}

                    <LoadingComponent isLoading={isLoading}>
                        <ButtonComponent
                            disabled={!email.length || !password.length || !confirmPassword.length}
                            onClick={handleSignUp}
                            size={40}
                            textbutton={'Đăng kí'}
                            styleTextButton={{ color: '#fff' }}
                            styleButton={{ background: 'rgb(255,57,69)', height: '48px', width: '100%', margin: '26px 0 10px' }}>
                        </ButtonComponent>
                    </LoadingComponent>
                    <p>Bạn đã có tài khoản <WrapperTextLight onClick={handleNavigateSignIn}> Đăng nhập </WrapperTextLight> </p>
                </WrapperContainerLeft>
                <WrapperContainerRight>
                    <Image src={logologin} alt='logo' preview={false} height={203} width={203} />
                    <h4> Mua sắm tại NLV</h4>
                </WrapperContainerRight>
            </div>
        </div>
    )
}

export default SignUpPage
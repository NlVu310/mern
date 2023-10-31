// eslint-disable-next-line
import React, { Fragment, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; //định tuyến router 
import { routes } from './routes';
import DefaultComponent from './components/DefaultComponent/DefaultComponent';
import { isJsonString } from './utils';
import jwt_decode from "jwt-decode";
import * as UserSerivce from './services/UserService'
import { useDispatch, useSelector } from 'react-redux';
import { resetUser, updateUser } from './redux/slides/userSlide';
import LoadingComponent from './components/LoadingComponent/LoadingComponent';

function App() {
  const dispatch = useDispatch(); //gửi 1 action đến redux store 
  const user = useSelector((state) => state.user)
  const [isloading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const { storageData, decoded } = handleDecoded()
    if (decoded?.id) {
      handleGetDetailsUser(decoded?.id, storageData)
    }
    setIsLoading(false)
  }, [])

  const handleDecoded = () => {
    let storageData = localStorage.getItem('access_token')
    let decoded = {}
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData)
      decoded = jwt_decode(storageData)
    }
    return { decoded, storageData }
  }

  UserSerivce.axiosJWT.interceptors.request.use(async (config) => {
    const currentTime = new Date()
    const { decoded } = handleDecoded()
    if (decoded?.exp < currentTime.getTime() / 1000) {
      const data = await UserSerivce.refreshToken()
      config.headers['token'] = `Bearer ${data?.access_token}`
    } else {
      dispatch(resetUser())
    }
    return config;
  }, (err) => {
    return Promise.reject(err)
  })

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserSerivce.getDetailUser(id, token)
    dispatch(updateUser({ ...res?.data, access_token: token }))
    setIsLoading(false)
  }

  return (
    <LoadingComponent isLoading={isloading}>
      <div>
        <Router>
          <Routes>
            {routes.map((route) => {
              const Page = route.page
              const Layout = route.isShowHeader ? DefaultComponent : Fragment
              return (
                <Route key={route.path} path={route.path} element={ //cần xem lại
                  <Layout>
                    <Page />
                  </Layout>
                } />
              )
            })}
          </Routes>
        </Router>
      </div>
    </LoadingComponent>
  )
}

export default App; 
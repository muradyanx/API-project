import './App.css';
import {useEffect, useState} from 'react';
import Sidebar from "./components/sidebar";
import HeaderComponent from "./components/header-component";
import {Route, Routes, useNavigate} from "react-router-dom";
import Dashboard from "./page/dashboard";
import Products from "./page/products";
import {ROUTER_NAMES} from "./routers";
import './assets/index.scss'
import AddProducts from "./page/add-products";
import ManageUser from "./page/manage-user";
import LoginUser from './page/login-user'
import {GetMyAccount} from "./platform/api/auth";
import {useDispatch} from 'react-redux';
import Registration from './page/Registration';
import {profileActions} from './state/profile/actions';
import useMainApiCalls from "./hooks/use-main-api-calls";

function App() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {getTestUserAccount} = useMainApiCalls()

  const [token, setToken] = useState('')

  useEffect(() => {
    const login = localStorage.getItem('token_admin')
    if (login) {
      getMyAccount(login)
      navigate(ROUTER_NAMES.DASHBOARD)

    } else {
      navigate(ROUTER_NAMES.LOGIN)
    }
  }, [])
  const getMyAccount = async (login) => {
    const result = await GetMyAccount(login)
    if (result && result.data) {
      setToken(result.data._id)
      dispatch({type: profileActions.MANAGE_USER_INFO, payload: result.data})
    } else {
      navigate(ROUTER_NAMES.LOGIN)
      localStorage.removeItem('token_admin')
      window.location.reload()
    }
  }
  return (
    <div className="App">

       {token ? <div className='P-admin-section'>
        <Sidebar/>
        <div className='P-admin-pages'>
          <HeaderComponent/>
          <div className='P-pages'>
            <Routes>
              <Route path={ROUTER_NAMES.DASHBOARD} element={<Dashboard/>}></Route>
              <Route path={ROUTER_NAMES.PRODUCTS} element={<Products/>}></Route>
              <Route path={ROUTER_NAMES.ADD_PRODUCT} element={<AddProducts/>}></Route>
              <Route path={ROUTER_NAMES.EDIT_PRODUCT} element={<AddProducts/>}></Route>
              <Route path={ROUTER_NAMES.MANAGE_USER} element={<ManageUser/>}></Route>
            </Routes>
          </div>
        </div>
      </div> : <div>
        <Routes>
          <Route path={ROUTER_NAMES.LOGIN} element={<LoginUser/>}></Route>
          <Route path={ROUTER_NAMES.REGISTRATION} element={<Registration/>}></Route>
        </Routes>
      </div>
      }
    </div>
  );
}

export default App;

import {Layout, LoginPage,RegisterPage,ActivatePage, ForgetPassword,  NotFound,ChangePasswordPage,ResetPassword,ProfilePage, HomePage} from './pages'
import { PrivateRoute } from './components'
import {Routes,Route,Navigate} from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export function Urls() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Layout/>}>
      <Route index element={<HomePage/>}/>
      <Route path="login" element={<LoginPage/>}/>
      <Route path="changepassword" element={<PrivateRoute><ChangePasswordPage/></PrivateRoute>}/>
      <Route path="register" element={<RegisterPage/>}/>
      <Route path="forgetpassword" element={<ForgetPassword/>}/>
      <Route path="activate/:uid/:token" element={<ActivatePage/>}/>
      <Route path="resetpassword/:uid/:token" element={<ResetPassword/>}/>
      <Route path="profile" element={<PrivateRoute><ProfilePage/></PrivateRoute>}/>
      <Route path="*" element={<NotFound/>}/>
      </Route>
    </Routes>
    <ToastContainer theme="dark" />
    </>
  )
}


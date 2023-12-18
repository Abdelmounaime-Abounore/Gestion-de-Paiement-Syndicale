import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'
import Cookies from 'js-cookie';
import VerifyEmail from './components/VerifyEmail'
import AddClient from './components/AddClient'
import Appartement from './components/Appartements'
import CreatePaiement from './components/createPaiement'
import NotFound from './components/NotFound';


// eslint-disable-next-line react/prop-types
const LogoutMiddleware = ({ children }) => {
  const isAuthenticated = !!Cookies.get('jwtToken');

  if (isAuthenticated) {
    return children;
  }

  return (
    <Navigate to="/login" />
  )
}

// eslint-disable-next-line react/prop-types
const LoginMiddleware = ({ children }) => {
  const isAuthenticated = !!Cookies.get('jwtToken');

  if (!isAuthenticated) {
    return children;
  }

  return (
    <Navigate to="/" />
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LogoutMiddleware> <Home /> </LogoutMiddleware>} />
        <Route path='/register' element={<LoginMiddleware> <Register /> </LoginMiddleware>} />
        <Route path='/login' element={<LoginMiddleware> <Login /> </LoginMiddleware>} />
        <Route path='/forgotPassword' element={<ForgotPassword />} />
        <Route path='/resetPassword/:token' element={<ResetPassword />} />
        <Route path='/verifyEmail/:token' element={<VerifyEmail />} />
        
        <Route path='/add-client' element={<LogoutMiddleware><AddClient /></LogoutMiddleware>} />
        <Route path='/appartements' element={<LogoutMiddleware><Appartement /></LogoutMiddleware>} />
        <Route path='/paiement' element={<LogoutMiddleware><CreatePaiement /></LogoutMiddleware>} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
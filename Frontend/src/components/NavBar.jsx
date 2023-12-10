// eslint-disable-next-line no-unused-vars
import { React } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';
import Logo from '../assets/Picto_Blog_Assurance.png'


const NavBar = () => {
  const navigate = useNavigate()
  const logout = () => {
      axios.get('http://localhost:3000/api/auth/logout')
      .then(result => {
        Cookies.remove('jwtToken');
        Cookies.remove('user') ;
        const msg = result.data.success;
        console.log(msg);
        navigate('/login')
      })
      .catch(err => {
        const error = err.response ? err.response.data.error : 'An error occurred in logout';
        console.log(error);
      });
    }
  
  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-200 p-6">
      <div className="flex items-center flex-shrink-0 mr-6 text-blue-900">
        <img src={Logo} alt="Logo" style={{ width: '10%' }} />
        <span className="font-semibold text-xl tracking-tight">
          Castilla Syndic 
        </span>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-blue-700 hover:border-white">
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg" >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <Link to="/"
            className="block mt-4 lg:inline-block lg:mt-0 text-blue-900 hover:text-blue-700 mr-5">
            Home
          </Link>
          <Link to="/forgotPassword"
            className="block me-2 mt-4 lg:inline-block lg:mt-0 text-blue-900 hover:text-blue-700 mr-5">
            Reset Password
          </Link>
          <button
            className="block mt-4 lg:inline-block lg:mt-0 text-blue-900 hover:text-blue-700"
            onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

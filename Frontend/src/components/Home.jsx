// eslint-disable-next-line no-unused-vars
import React from 'react'
import NavBar from './NavBar'
import Cookies from 'js-cookie';


const Home = () => {
  const user = JSON.parse(Cookies.get('user'));
  // console.log(Cookies.get());


  return (
    <>
      <NavBar/>
    <div className="flex items-center mt-10 pt-10 justify-center">
    <div>
      <div>
          
      </div>
    </div>
    </div>
    </>
  )
}

export default Home
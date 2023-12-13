// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react'
import NavBar from './NavBar'
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import AppartementForm from './AddAppartement';
import ClientForm from './AddClient';


const Home = () => {
  const user = JSON.parse(Cookies.get('user'));

  const [isAppModelOppen, setIsAppModelOppen] = useState(false);
  const [isClientModalOppen, setIsClientModalOppen] = useState(false);

  const openAppModal = () => {
    setIsAppModelOppen(true);
  };

  const openClientModal = () => {
    setIsClientModalOppen(true);
  };

  return (
    <>
      <NavBar />
      <div className="flex items-center mt-10 pt-10 justify-center">
        <div>
          <div>
              <button onClick={openAppModal}>Add Appartement</button>
              <button onClick={openClientModal}>Add Client</button>
          </div>
        </div>
      </div>
      {isAppModelOppen && (
        <AppartementForm 
          isOpen={isAppModelOppen}
          onClose={() => setIsAppModelOppen(false)}
        />
      )
      }
      {isClientModalOppen && (
        <ClientForm 
          isOpen={isClientModalOppen}
          onClose={() => setIsClientModalOppen(false)}
        />
      )
      }
    </>
  )
}

export default Home
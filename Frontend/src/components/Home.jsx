// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import NavBar from './NavBar'
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import AppartementForm from './AddAppartement';
import ClientForm from './AddClient';
import Paiement from './createPaiement';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faDollar, faEye } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import AddAppartement from "../assets/appartement.jpg"
import AddClient from "../assets/client.jpg"
import Payment from "../assets/paiement.avif"
import ShowAppartement from '../assets/show.jpg'

const Home = () => {
  const user = JSON.parse(Cookies.get('user'));

  const [isAppModelOppen, setIsAppModelOppen] = useState(false);
  const [isClientModalOppen, setIsClientModalOppen] = useState(false);
  const [isPaiementModalOppen, setIsPaiementModalOppen] = useState(false);

  const openAppModal = () => {
    setIsAppModelOppen(true);
  };

  const openClientModal = () => {
    setIsClientModalOppen(true);
  };

  const openPaiementModal = () => {
    setIsPaiementModalOppen(true);
  };

  return (
    <>
      <div className='bg-blue-950 pb-9'>
        <NavBar />
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-10 w-11/12	m-auto'>
          <div className='bg-gray-100 rounded flex flex-col justify-between'>
            <div>
              <div className='rounded'>
                <img src={AddAppartement} alt="Add-Appartement" className='rounded h-48' />
              </div>
              <h1 className='font-bold m-3'>Add Appartement</h1>
              <p className='m-3 '>
                Add a new apartment to the system. This feature allows you to input details about a new property.
                Once added, the apartment will be available within the system for management and tracking purposes.
              </p>
            </div>
            <div className='flex m-3'>
              <div className='p-2 bg-blue-950 rounded text-white hover:bg-blue-700 cursor-pointer flex items-center' onClick={openAppModal}>
                <FontAwesomeIcon className='mx-1' icon={faBuilding} size='' /> Add Appartement
              </div>
            </div>
          </div>
          <div className='bg-gray-100 rounded flex flex-col justify-between'>
            <div>
              <div className='rounded'>
                <img src={AddClient} alt="Add-Client" className='rounded h-48' />
              </div>
              <h1 className='font-bold m-3'>Add Client</h1>
              <p className='m-3 '>
                Add a new client to the system. This feature enables you to register new clients by entering
                their personal information.
                Once added, the client's information becomes accessible within the system for efficient management and correspondence.
              </p>
            </div>
            <div className='flex m-3'>
              <div className='p-2 bg-blue-950 rounded text-white hover:bg-blue-700 cursor-pointer flex items-center' onClick={openClientModal}>
                <FontAwesomeIcon className='mx-1' icon={faUser} size='' /> Add Client
              </div>
            </div>
          </div>
          <div className='bg-gray-100 rounded flex flex-col justify-between'>
            <div>
              <div className='rounded'>
                <img src={Payment} alt="Add-Payment" className='rounded h-48' />
              </div>
              <h1 className='font-bold m-3'>Add Payment</h1>
              <p className='m-3 '>
                Record a new payment within the system. This functionality allows you to log and track payments made. Additionally, it aids in maintaining a comprehensive record
                of all financial transactions related to the properties or services offered.
              </p>
            </div>
            <div className='flex m-3'>
              <div className='p-2 bg-blue-950 rounded text-white hover:bg-blue-700 cursor-pointer flex items-center' onClick={openPaiementModal}>
                <FontAwesomeIcon className='mx-1' icon={faDollar} size='' /> Add Payment
              </div>
            </div>
          </div>
          <div className='bg-gray-100 rounded flex flex-col justify-between'>
            <div>
              <div className='rounded'>
                <img src={ShowAppartement} alt="Show Appartements" className='rounded h-48' />
              </div>
              <h1 className='font-bold m-3'>Show Appartements</h1>
              <p className='m-3 '>
                Consult a list of apartments available in the system and see their details.
              </p>
            </div>
            <div className='flex m-3'>
              <Link to="/appartements">
                <div className='p-2 bg-blue-950 rounded text-white hover:bg-blue-700 cursor-pointer flex items-center'>
                  <FontAwesomeIcon className='mx-1' icon={faEye} size='' /> Show Appartements
                </div>
              </Link>
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
        {isPaiementModalOppen && (
          <Paiement
            onClose={() => setIsPaiementModalOppen(false)}
          />
        )}
      </div>

    </>
  )
}

export default Home
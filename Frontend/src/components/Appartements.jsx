import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateModal from './updateModal';
import PaymentModal from './Payment';
import NavBar from './NavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';

function Appartement() {
    const [appartements, setAppartements] = useState([]);
    const [paiements, setPaiements] = useState([]);
    const [selectedAppartement, setSelectedAppartement] = useState(null);
    const [IsModalPaiement, setIsModalPaiement] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState(null);
    
    const getCookie = (name) => {
        const cookies = document.cookie.split(';').map(cookie => cookie.trim());
        const cookie = cookies.find(cookie => cookie.startsWith(`${name}=`));
        if (cookie) {
          return cookie.split('=')[1];
        }
        return null;
      };
    const token = getCookie('jwtToken');
    const tokenWithdots = token.replace(/~/g, '.');

    useEffect(() => {
        const fetchAppartements = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/appartement/get-appartements/${tokenWithdots}`);
                setAppartements(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchAppartements();
    }, [appartements]);

    const handleDelete = async (e, id) => {
        // e.preventDefault();
        setError(null);
        try {
            const response = await axios.delete(`http://localhost:3000/api/appartement/delete-appartement/${id}/${tokenWithdots}`);

            if (response.status === 200) {
                console.log('Appartement deleted successfully');
                setAppartements(prevAppartements => prevAppartements.filter(appartement => appartement._id !== id));
            } else {
                setError('Failed to delete appartement');
            }
        } catch (error) {
            setError('Failed to delete appartement');
            console.error('Failed to delete appartement', error);
        }
    };

    const handleUpdate = (appartement) => {
        setSelectedAppartement(appartement);
        setIsModalOpen(true);
    };
    const displayModalPaiement = (appartement) => {
        setSelectedAppartement(appartement);
        setIsModalPaiement(true);
    };

    return (
        <>
            <NavBar />
            <div>
                <h1 className='font-semibold text-2xl px-6 py-4 text-gray-600'>Appartements</h1>
                {error && <p className="text-red-500 my-2 px-6">{error}</p>}
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr className='text-gray-600'>
                            <th scope="col" className="px-6 py-3">Address</th>
                            <th scope="col" className="px-6 py-3">Client</th>
                            <th scope="col" className="px-6 py-3">Paiement Details</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                            <th scope="col" className="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {appartements.map(appartement => (
                            <tr key={appartement._id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <td className="px-6 py-4">{appartement.address}</td>
                                <td className="px-6 py-4">{appartement.client.name}</td>
                                <td className="px-6 py-4">
                                    {/* <FontAwesomeIcon onClick={() => displayCalendar(appartement)} icon={faEye} className='text-blue-900 w-5 h-5' style={{ paddingLeft: "40px" }} /> */}
                                    <button onClick={() => displayModalPaiement(appartement)}><FontAwesomeIcon icon={faEye} className='text-blue-900 w-5 h-5' style={{ paddingLeft: "40px" }} /></button>
                                </td>
                                <td className="py-4" style={{ paddingLeft: "40px" }}>
                                    <button onClick={() => handleDelete(appartement._id)}><FontAwesomeIcon icon={faTrash} className='text-red-500 w-5 h-5' /></button>
                                </td>
                                <td className="py-4" style={{ paddingLeft: "40px" }}>
                                    <button onClick={() => handleUpdate(appartement)}><FontAwesomeIcon icon={faPenSquare} className='text-blue-500 w-5 h-5' /></button>
                                </td>
                            </tr>
                        )
                        )}
                    </tbody>
                </table>
                {isModalOpen && (
                    <UpdateModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        appartement={selectedAppartement}
                    />
                )}
                {IsModalPaiement && (
                    <PaymentModal 
                        isOpen={IsModalPaiement}
                        onClose={() => setIsModalPaiement(false)}
                        appartement={selectedAppartement}
                    />
                )}
            </div>
        </>
    );
}

export default Appartement
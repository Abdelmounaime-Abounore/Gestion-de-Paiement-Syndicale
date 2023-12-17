import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PaymentModal = ({ isOpen, onClose, appartement }) => {
    const [appartementId, setAppartementId] = useState(appartement._id);
    const [paiements, setPaiements] = useState([]);

    useEffect(() => {
        const displayPayment = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/paiement/get-paiement/${appartementId}`)
                const paiements = response.data.paiements;
                setPaiements(paiements)
            } catch (error) {
                console.error(error);
            }
        };

        displayPayment();
    }, []);

    return (
        <div className={`modal ${isOpen ? 'open' : ''}`}>
            <div className="">
                <div className="w-11/12 m-auto relative top-[-160px]">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t bg-gray-500	 dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-100 dark:text-white">
                                Paiments
                            </h3>
                            <button
                                type="button"
                                onClick={onClose}
                                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-hide="authentication-modal"
                            >
                                <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-4 md:p-5">
                            {paiements.length > 0 ? (
                                <div className="flex flex-wrap">
                                    {paiements.map((paiement, index) => (
                                        <p key={index}
                                            className={`w-1/5 p-5 flex-shrink-0 border border-gray-300 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-GRAY-200'}`}>
                                            {paiement.month} - {paiement.year}
                                        </p>
                                    ))}
                                </div>
                            ) : (
                                <p>No payments available</p>
                            )}
                        </div>
                        <div className="p-4 md:p-5">
                            <div>
                                <button
                                    type="submit"
                                    onClick={onClose}
                                    className="text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm mx-3 px-7 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentModal;
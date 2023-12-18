import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Logo from '../assets/Picto_Blog_Assurance.png'

const PaymentModal = ({ isOpen, onClose, appartement }) => {
    const [appartementId, setAppartementId] = useState(appartement._id);
    const [appartementAddress, setappartementAddress] = useState(appartement.address);
    const [paiements, setPaiements] = useState([]);

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
        const displayPayment = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/paiement/get-paiement/${appartementId}/${tokenWithdots}`)
                const paiements = response.data.paiements;
                setPaiements(paiements)
            } catch (error) {
                console.error(error);
            }
        };

        displayPayment();
    }, []);

    const downloadPaymentDetailsAsPDF = async (appartementAddress, paiement) => {
        try {
            const paymentElement = document.createElement('div');
            paymentElement.innerHTML = `
            <div class="m-5 mr-6 ml-5 flex flex-shrink-0 items-center text-blue-900">
                <img src="${Logo}" alt="Logo" class="mt-4" style="width: 40px;" />
                <span class="font-semibold text-xl tracking-tight">
                    Castilla Syndic 
                </span>
            </div>
            <h2 class="m-3 p-3">Payment Facture of <span class="text-blue-800">${appartementAddress}</span> Apartment</h2>
            <p class="m-3 p-3">The month <span class="text-blue-800">${paiement.month}</span> of the year <span class="text-blue-800">${paiement.year}</span> has been paid</p>
            <p class="text-blue-800 mt-3 m-3 p-3 text-xs">Castilla Syndic</p>
            <br><br>
          `;

            document.body.appendChild(paymentElement);

            const canvas = await html2canvas(paymentElement);
            const imgData = canvas.toDataURL('image/png');

            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 10, 10);

            pdf.save('payment_details.pdf');

            document.body.removeChild(paymentElement);
        } catch (error) {
            console.error('Failed to generate PDF', error);
        }
    };

    return (
        <div className={`modal ${isOpen ? 'open' : ''}`}>
            <div className="">
                <div className="w-11/12 m-auto relative top-[-160px]">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t bg-gray-400 dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-100 dark:text-white">
                                Paiments of {appartementAddress} Appartement
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
                                        <p
                                            key={index}
                                            onClick={() => downloadPaymentDetailsAsPDF(appartementAddress, paiement)}
                                            className={`w-1/5 p-5 flex-shrink-0 border border-gray-300 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'} hover:bg-red-200 cursor-pointer`}>
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
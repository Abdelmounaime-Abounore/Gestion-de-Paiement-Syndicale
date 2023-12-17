import React, { useState, useEffect } from 'react';
import axios from "axios";

function Paiement({ onClose }) {

    const currentYear = new Date().getFullYear();

    const years = [];
    for (let year = 2020; year <= currentYear; year++) {
        years.push(year);
    }

    const [formData, setFormData] = useState({
        appartement: '',
        month: '',
        year: ''
    });

    const [appartements, setAppartements] = useState([]);

    useEffect(() => {

        const fetchAppartements = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/appartement/get-appartements');
                setAppartements(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchAppartements();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        try {
            const response = await axios.post('http://localhost:3000/api/paiement/create-paiement', formData);

            if (response.status === 201) {
                console.log('paiement created successfully');
                setFormData({
                    appartement: '',
                });
            } else {
                console.error('Failed to create paiement');
            }
        } catch (error) {
            console.error('Failed to create paiement', error);
        }
    };

    return (

        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t bg-gray-300 dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-500 dark:text-white">
                            Add Paiement
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
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label
                                    htmlFor="appartement"
                                    className="block mb-2 text-sm font-medium text-gray-500 dark:text-white"
                                >
                                    Select Appartement:
                                </label>
                                <select
                                    name='appartement'
                                    onChange={(e) => setFormData({ ...formData, appartement: e.target.value })}
                                    className="border border-gray-300 text-gray-700 py-1 px-3 rounded focus:outline-none focus:bg-white focus:border-gray-500"
                                >
                                    <option value="">Select an Appartement ...</option>
                                    {appartements.map((appartement) => (
                                        <option key={appartement._id} value={appartement._id}>
                                            {appartement.address}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label
                                    htmlFor="month"
                                    className="block mb-2 text-sm font-medium text-gray-500 dark:text-white"
                                >
                                    Select Month:
                                </label>
                                <select
                                    name="month"
                                    onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                                    className="border border-gray-300 text-gray-700 py-1 px-3 rounded focus:outline-none focus:bg-white focus:border-gray-500"
                                >
                                    <option value="">Select a Month ...</option>
                                    <option value="January">January</option>
                                    <option value="February">February</option>
                                    <option value="March">March</option>
                                    <option value="April">April</option>
                                    <option value="May">May</option>
                                    <option value="June">June</option>
                                    <option value="July">July</option>
                                    <option value="August">August </option>
                                    <option value="September">September</option>
                                    <option value="October">October</option>
                                    <option value="November">November</option>
                                    <option value="December">December</option>
                                </select>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-500 dark:text-white">
                                    Select a Year
                                </label>
                                <select 
                                    id="yearSelect" 
                                    className="border border-gray-300 text-gray-700 py-1 px-3 rounded focus:outline-none focus:bg-white focus:border-gray-500" 
                                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                >
                                    <option value="">Select Year</option>
                                    {years.map((year) => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='my-3'>
                                <button
                                    type="submit"
                                    onClick={handleSubmit}
                                    className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Add Paiement
                                </button>
                                <button
                                    type="submit"
                                    onClick={onClose}
                                    className="text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm mx-3 px-7 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Paiement;
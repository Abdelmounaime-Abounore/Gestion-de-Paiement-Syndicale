import React, { useState } from 'react';
import axios from "axios";

function ClientForm({ onClose }) {
  const [client, setClient] = useState({
    name: '',
    cin: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient({
      ...client,
      [name]: value
    });
  };

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


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3000/api/client/create-client/${tokenWithdots}`, client);

      if (response.status === 201) {
        console.log('Client created successfully');
        setClient({
          name: '',
          cin: '',
        });
      } else {
        console.error('Failed to create client');
      }
    } catch (error) {
      console.error('Failed to create client', error);
    }
  };

  return (

    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t bg-gray-300 dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-500 dark:text-white">
              Add new Client
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
                  htmlFor="address"
                  className="block mb-2 text-sm font-medium text-gray-500 dark:text-white"
                >
                  Client Name:
                </label>
                <input
                  type="text"
                  name="name"
                  value={client.name}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:border-gray-800 focus:ring-gray-800 focus:bg-gray-100 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white focus:outline-none"
                  placeholder="Résidence Santa Clara"
                  required
                />

              </div>
              <div>
                <label
                  htmlFor="client"
                  className="block mb-2 text-sm font-medium text-gray-500 dark:text-white"
                >
                  Client CIN:
                </label>
                <input
                  type="text"
                  name="cin"
                  value={client.cin}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:border-gray-800 focus:ring-gray-800 focus:bg-gray-100 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white focus:outline-none"
                  placeholder="K12345"
                  required
                />
              </div>
              <div className='my-3'>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Add Client
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

export default ClientForm;
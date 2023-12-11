import React, { useState, useEffect } from 'react';
import axios from "axios";

function AppartementForm() {
    const [appartement, setAppartement] = useState({
        address: '',
        client: '',
    });

    const [clients, setClients] = useState([]);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/client/get-client');
                setClients(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchClients();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
      
        if (name === 'client') {
          setAppartement(prevFormData => ({
            ...prevFormData,
            client: value
          }));
        } else {
          setAppartement(prevFormData => ({
            ...prevFormData,
            [name]: value
          }));
        }
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(appartement)
        try {
            const response = await axios.post('http://localhost:3000/api/appartement/create-appartement',
            {
                address: appartement.address,
                clientId: appartement.client, 
              });

            if (response.status === 201) {
                console.log('Appartement created successfully');
                setAppartement({
                    address: '',
                    client: '',
                });
            } else {
                console.error('Failed to create appartement');
            }
        } catch (error) {
            console.error('Failed to create appartment', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Appartement Address:
                <input
                    type="text"
                    name="address"
                    value={appartement.address}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Select Client:
                <select name='client' onChange={handleChange}>
                    <option value="">Select a client</option>
                    {clients.map(client => (
                        <option key={client._id} value={client._id}>
                            {client.name}
                        </option>
                    ))}
                </select>
            </label>
            <br />
            <button type="submit">Submit</button>
        </form>
    );
}

export default AppartementForm;
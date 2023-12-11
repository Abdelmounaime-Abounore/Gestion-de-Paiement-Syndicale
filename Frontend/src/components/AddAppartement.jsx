import React, { useState } from 'react';
import axios from "axios";

function ClientForm() {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/client/create-client', client);
      
      if (response.status === 201) {
        // The apartment was created successfully
        console.log('Client created successfully');
        // Reset the form fields
        setClient({
          name: '',
          cin: '',
        });
      } else {
        // There was an error creating the apartment
        console.error('Failed to create client');
      }
    } catch (error) {
      console.error('Failed to create client', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Client Name:
        <input
          type="text"
          name="name"
          value={client.name}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Client CIN:
        <input
          type="text"
          name="cin"
          value={client.cin}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default ClientForm;
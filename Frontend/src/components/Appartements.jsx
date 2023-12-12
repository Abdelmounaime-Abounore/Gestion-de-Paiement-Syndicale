import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateModal from './updateModal';

function Appartement() {
    const [appartements, setAppartements] = useState([]);
    const [selectedAppartement, setSelectedAppartement] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3000/api/appartement/delete-appartement/${id}`);

            if (response.status === 200) {
                console.log('Appartement deleted successfully');
                // Remove the deleted appartement from the state
                setAppartements(prevAppartements => prevAppartements.filter(appartement => appartement._id !== id));
            } else {
                console.error('Failed to delete appartement');
            }
        } catch (error) {
            console.error('Failed to delete appartement', error);
        }
    };

    const handleUpdate = (appartement) => {
        setSelectedAppartement(appartement);
        setIsModalOpen(true);
    };

    return (
        <div>
            <h1>Appartements</h1>
            <table>
                <thead>
                    <tr>
                        <th>Address</th>
                        <th>Client</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {appartements.map(appartement => (
                        <tr key={appartement._id}>
                            <td>{appartement.address}</td>
                            <td>{appartement.client.name}</td>
                            <td>
                                <button onClick={() => handleDelete(appartement._id)}>Delete</button>
                                <button onClick={() => handleUpdate(appartement)}>Update</button>
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
        </div>
    );
}

export default Appartement
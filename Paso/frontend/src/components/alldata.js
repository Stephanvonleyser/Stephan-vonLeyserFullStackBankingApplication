import React, { useState, useEffect, useContext } from 'react';
import { useAuth } from '../context/AuthProvider';
import { Card as BootstrapCard, Alert } from 'react-bootstrap';
import clientAxios, { config } from '../server/clientAxios';

function AllData(){
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                if(user && user.role === 'admin') {
                    const { data } = await clientAxios.get('/admin/alldata', config);
                    setUsers(data.users);
                } else {
                    setError('You do not have access to this data.');
                }
            } catch (error) {
                setError('Error fetching data: ' + error.response.data.message);
            }
        };
        fetchAllUsers();
    }, [user]);

    return (
        <>
            <h5>All Data in Store</h5>
            {error && <Alert variant="danger">{error}</Alert>}
            {users.map((user, index) => (
                <BootstrapCard key={index} bg="light" style={{ width: '18rem' }} className="mb-2">
                    <BootstrapCard.Header>{user.name}</BootstrapCard.Header>
                    <BootstrapCard.Body>
                        <BootstrapCard.Text>Name: {user.name}</BootstrapCard.Text>
                        <BootstrapCard.Text>Email: {user.email}</BootstrapCard.Text>
                        {user.accounts.map((account, idx) => (
                            <React.Fragment key={idx}>
                                <BootstrapCard.Text>Account: {account.accountNumber}</BootstrapCard.Text>
                                <BootstrapCard.Text>Balance: ${account.balance}</BootstrapCard.Text>
                            </React.Fragment>
                        ))}
                    </BootstrapCard.Body>
                </BootstrapCard>
            ))}
        </>
    );
}

export default AllData;
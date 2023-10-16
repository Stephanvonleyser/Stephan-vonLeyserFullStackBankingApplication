import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { useAuth } from '../context/AuthProvider';

function Balance() {
    const { user } = useAuth();  

    const [error, setError] = React.useState(null);

    if (error) {
        return <p>Error loading data: {error.message}</p>;
    }
    if (!user) {
        return <p>Loading...</p>;  
    }

    return (
        <Card style={{ width: '18rem' }} className="mx-auto mt-5 balance-card">
            <Card.Body>
                <Card.Title>{user.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{user.email}</Card.Subtitle>
                <Card.Text>
                    <strong>Accounts:</strong>
                </Card.Text>
                <ListGroup variant="flush">
                    {user.accounts && user.accounts.length > 0 ? (
                        user.accounts.map((account) => (
                            <ListGroup.Item key={account.accountNumber}>
                                <strong>Account:</strong> {account.accountNumber} <br />
                                <strong>Balance:</strong> ${account.balance.toFixed(2)}
                            </ListGroup.Item>
                        ))
                    ) : (
                        <p>No accounts available.</p>
                    )}
                </ListGroup>
            </Card.Body>
        </Card>
    );
}

export default Balance;
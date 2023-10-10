import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { useUser } from '../context/AuthProvider';  // Ensure path is correct

function Balance() {
    const user = useUser();  // Retrieving user data from context

    if (!user) {
        return <p>Loading...</p>;  
    }

    return (
        <Card style={{ width: '18rem' }} className="mx-auto mt-5">
            <Card.Body>
                <Card.Title>{user.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{user.email}</Card.Subtitle>
                <Card.Text>
                    <strong>Accounts:</strong>
                </Card.Text>
                <ListGroup variant="flush">
                    {user.accounts.map((account, index) => (
                        <ListGroup.Item key={index}>
                            <strong>Account:</strong> {account.accountNumber} <br />
                            <strong>Balance:</strong> ${account.balance.toFixed(2)}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card.Body>
        </Card>
    );
}

export default Balance;

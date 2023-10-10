import React, { useState } from 'react';
import { Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { useUser, useAuth } from '../context/AuthProvider';

function Transfer() {
    const [originAmount, setOriginAmount] = useState('');
    const [originAccount, setOriginAccount] = useState('');
    const [destinationEmail, setDestinationEmail] = useState('');
    const [destinationAccount, setDestinationAccount] = useState('');
    const [status, setStatus] = useState('');
    const [error, setError] = useState('');
    const user = useUser();
    const { transferMoney } = useAuth(); 

    const validateForm = () => {
        if (originAccount === '') {
            setError('Please select an origin account');
            return false;
        }
        const accountBalance = user.accounts.find(acc => acc.accountNumber === originAccount).balance;
        if (originAmount > accountBalance) {
            setError('Error: can’t transfer more than account balance');
            return false;
        }
        if (!destinationEmail || !destinationAccount) {
            setError('Destination email and account number are required');
            return false;
        }
        setError('');
        return originAmount > 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { success, message } = await transferMoney(originAmount, originAccount, destinationEmail, destinationAccount);
        setStatus(message);
        setTimeout(() => setStatus(''), 3000);
    };

    return (
        <Row className="mb-4">
            <Col>
                {/* Origin Card */}
                <Card bg="primary" text="white" style={{ width: '18rem' }}>
                    <Card.Header>Origin</Card.Header>
                    <Card.Body>
                        {user ? (
                            <>
                                <p>Hello, {user.name}</p>
                                <p>Balance: ${originAccount ? user.accounts.find(acc => acc.accountNumber === originAccount).balance : 'Select an account'}</p>
                                <Form.Group controlId="account">
                                    <Form.Label>Account</Form.Label>
                                    <Form.Control as="select" value={originAccount} onChange={e => setOriginAccount(e.target.value)}>
                                        <option value="" disabled>Select account</option>
                                        {user.accounts.map((account, idx) => (
                                            <option key={idx} value={account.accountNumber}>
                                                {account.accountNumber}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </>
                        ) : (
                            <p>Please login</p>
                        )}
                        <Form.Group size="lg" controlId="amount">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control
                                type="number"
                                value={originAmount}
                                onChange={(e) => setOriginAmount(e.target.value)}
                            />
                        </Form.Group>
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                {/* Destination Card */}
                <Card bg="danger" text="white" style={{ width: '18rem' }}>
                    <Card.Header>Destination</Card.Header>
                    <Card.Body>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={destinationEmail}
                                onChange={(e) => setDestinationEmail(e.target.value)}
                                placeholder="user@example.com"
                            />
                        </Form.Group>
                        <Form.Group controlId="account">
                            <Form.Label>Account Number</Form.Label>
                            <Form.Control
                                type="text"
                                value={destinationAccount}
                                onChange={(e) => setDestinationAccount(e.target.value)}
                                placeholder="1234567890"
                            />
                        </Form.Group>
                    </Card.Body>
                </Card>
            </Col>
            <Col xs={12} className="mt-3">
                {status && (
                    <Alert variant="success" onClose={() => setStatus('')} dismissible>
                        <p>{status}</p>
                    </Alert>
                )}
                {error && (
                    <Alert variant="danger" onClose={() => setError('')} dismissible>
                        <p>{error}</p>
                    </Alert>
                )}
                <Button block size="lg" type="button" onClick={handleSubmit} disabled={!validateForm()}>
                    Transfer
                </Button>
            </Col>
        </Row>
    );
}

export default Transfer;

import React, { useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { useUser, useAuth } from '../context/AuthProvider';  

function Deposit() {
    const [amount, setAmount] = useState('');
    const [selectedAccount, setSelectedAccount] = useState('');
    const [status, setStatus] = useState('');
    const user = useUser();  
    const { depositMoney } = useAuth(); 

    const validateForm = () => amount > 0 && selectedAccount !== '';


    const [timeoutId, setTimeoutId] = useState(null);

    useEffect(() => {
        // Cleanup: clear timeout if component is unmounted before timeout finishes
        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [timeoutId]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm() && user) {
            const { success, message } = await depositMoney(amount, selectedAccount);
            setStatus(message);
            if (success) {
                // Resetting the form on a successful deposit
                setAmount('');
                setSelectedAccount('');
            }
            setTimeoutId(setTimeout(() => setStatus(''), 3000));
        } else {
            setStatus('Error: Invalid input or unable to find user');
            setTimeoutId(setTimeout(() => setStatus(''), 3000));
        }
    };

    return (
        <Card bg="primary" text="white" style={{ width: '18rem' }} className="mb-2">
            <Card.Header>Deposit</Card.Header>
            <Card.Body>
            {user ? (
                <>
                    <p>Hello, {user.name}</p>
                    <p>Balance: ${selectedAccount ? user.accounts.find(acc => acc.accountNumber === selectedAccount).balance : 'Select an account'}</p>
                    <Form.Group controlId="account">
                        <Form.Label>Account</Form.Label>
                        <Form.Control as="select" value={selectedAccount} onChange={e => setSelectedAccount(e.target.value)}>
                            <option value="" disabled>Select account</option>
                            {user.accounts.map((account) => (
                                <option key={account.accountNumber} value={account.accountNumber}>
                                    {account.accountNumber}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </>
            ) : (
                <p>Please login</p>
            )}
                {status && (
                    <Alert variant="success" onClose={() => setStatus('')} dismissible>
                        <p>{status}</p>
                    </Alert>
                )}
                <Form onSubmit={handleSubmit}>
                    <Form.Group size="lg" controlId="amount">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(Math.abs(Number(e.target.value)))} 
                            placeholder="Amount"
                            required 
                    />
                    </Form.Group>
                    <Button block size="lg" type="submit" disabled={!validateForm()}>
                        Deposit
                    </Button>
                </Form>
                {status && <Alert variant="info">{status}</Alert>}
            </Card.Body>
        </Card>
    );
}

export default Deposit;

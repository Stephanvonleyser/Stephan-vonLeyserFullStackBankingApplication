import React, { useState } from 'react';
import { Card, Form, Button, Alert, ListGroup } from 'react-bootstrap';

function CreateAccount() {
    const [status, setStatus] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    function validatePassword(password) {
        const lowerCaseRegex = /[a-z]/g;
        const upperCaseRegex = /[A-Z]/g;
        const digitRegex = /[0-9]/g;
        return (
            password.length >= 8 &&
            lowerCaseRegex.test(password) &&
            upperCaseRegex.test(password) &&
            digitRegex.test(password)
        );
    }

    function handleCreate(e) {
        e.preventDefault();

        // Validation checks
        if (!name || !email || !password || !confirmPassword) {
            setStatus('All fields are required.');
            return;
        }

        if (!validatePassword(password)) {
            setStatus('Password does not meet the policy.');
            return;
        }

        if (password !== confirmPassword) {
            setStatus('Passwords do not match.');
            return;
        }

        // Send a request to create the account
        // (...)

        // Clear the form
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setStatus('Account created successfully!');
    }

    return (
        <Card bg="primary" text="white" style={{ width: '18rem' }} className="mb-2">
            <Card.Header>Create Account</Card.Header>
            <Card.Body>
                {status && (
                    <Alert variant={status === 'Account created successfully!' ? "success" : "danger"} onClose={() => setStatus('')} dismissible>
                        <p>{status}</p>
                    </Alert>
                )}
                <Form onSubmit={handleCreate}>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            isValid={password && validatePassword(password)}
                        />
                    </Form.Group>
                    <Form.Group controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            isValid={confirmPassword && password === confirmPassword}
                        />
                    </Form.Group>
                    <ListGroup variant="flush">
                        <ListGroup.Item variant={validatePassword(password) ? "success" : "danger"}>
                            Password meets policy
                        </ListGroup.Item>
                        <ListGroup.Item variant={password === confirmPassword ? "success" : "danger"}>
                            Passwords match
                        </ListGroup.Item>
                    </ListGroup>
                    <Button variant="light" type="submit" className="mt-3">
                        Create Account
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default CreateAccount;

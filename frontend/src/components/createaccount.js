import React, { useState } from 'react';
import { Card, Form, Button, Alert, ListGroup } from 'react-bootstrap';
import clientAxios from '../server/clientAxios';
import { useNavigate } from 'react-router-dom';

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

    async function handleCreate(e) {
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

        try {
            const checkEmailResponse = await clientAxios.get(`/check-email?email=${email}`);
            if (checkEmailResponse.data.exists) {
                setStatus('Error: Email already in use');
                setTimeout(() => setStatus(''), 3000);
                return;
            }
        } catch (error) {
            setStatus('An error occurred while checking the email. Please try again later.');
            setTimeout(() => setStatus(''), 3000);
            return;
        }
    
        // Send a request to create the account
        try {
            const response = await clientAxios.post('/createaccount', { 
                name, 
                email, 
                password 
            });
            
            if (response.data.success) {
                // If the account was created successfully...
                setStatus('Account created successfully!');
                setTimeout(() => {
                    navigate('/login');
                }, 1500);
                // Additional logic (e.g., redirecting) can be added here.
            } else {
                // If there was a problem creating the account
                setStatus(response.data.message || 'An error occurred while creating the account.');
            }
        } catch (error) {
            // If an error occurred while sending the request...
            setStatus('An error occurred. Please try again later.');
            console.error('An error occurred while sending the request: ', error);
        }

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

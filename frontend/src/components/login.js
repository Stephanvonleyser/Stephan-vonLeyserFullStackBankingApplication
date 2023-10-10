import React, { useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import clientAxios from './path-to-clientAxios';  // Adjust the path accordingly

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        
        try {
            const response = await clientAxios.post('/login', { email, password });
            if (response.data.success) {
                setStatus('Login Successful');
                // Perform additional actions on successful login
                // such as redirecting or saving user data/token.
                setTimeout(() => setStatus(''), 3000);
            } else {
                setStatus('Invalid email or password');
            }
        } catch (error) {
            setStatus('An error occurred. Please try again later.');
        }
    }

    return (
        <Card bg="primary" text="white" style={{ width: '18rem' }} className="mb-2">
            <Card.Header>Login</Card.Header>
            <Card.Body>
                {status && (
                    <Alert variant={status === 'Login Successful' ? "success" : "danger"} onClose={() => setStatus('')} dismissible>
                        <p>{status}</p>
                    </Alert>
                )}
                <Form onSubmit={handleSubmit}>
                    <Form.Group size="lg" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            autoFocus
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button block size="lg" type="submit" disabled={!validateForm()}>
                        Login
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default Login;

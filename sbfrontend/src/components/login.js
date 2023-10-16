import React, { useState, useContext } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import clientAxios from '../server/clientAxios';  
import { useAuth } from '../context/AuthProvider'; 
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');
    const { login, setUser } = useAuth();
    const navigate = useNavigate(); // To navigate to other pages upon successful login
    

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        
        try {
            const response = await login(email, password);
            if (response.data.success) {
                // Save the token and user data in the context
                setUser({
                    token: response.data.token, 
                    user: response.data.user
                });

                // Store the token in localStorage for persistence
                localStorage.setItem('token', response.data.token);

                // Display a success message
                setStatus('Login Successful');

                // Redirect to the balance page after 3 seconds
                setTimeout(() => {
                    setStatus('');
                    navigate('/balance');
                }, 3000);
            } else {
                setStatus(response.message);
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

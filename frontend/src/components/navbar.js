import React from 'react';
import { useAuth } from '../context/AuthProvider';
import { Navbar, Nav, Button } from 'react-bootstrap'; 

function NavBar(){
    const { user, logout } = useAuth();

    return(
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#">Stephan Bank</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#/CreateAccount/">Create Account</Nav.Link>
                    {!user && <Nav.Link href="#/login/">Login</Nav.Link>}
                    {user && (
                        <>
                            <Nav.Link href="#/deposit/">Deposit</Nav.Link>
                            <Nav.Link href="#/withdraw/">Withdraw</Nav.Link>
                            <Nav.Link href="#/transfer/">Transfer</Nav.Link>
                            <Nav.Link href="#/balance/">Balance</Nav.Link>
                            {user.role === 'admin' && <Nav.Link href="#/alldata/">AllData</Nav.Link>}
                        </>
                    )}
                </Nav>
                {user && (
                    <Nav className="ml-auto">
                        <Navbar.Text className="mr-3">
                            Signed in as: <strong>{user.name}</strong>
                        </Navbar.Text>
                        <Button variant="outline-primary" onClick={logout}>Logout</Button>
                    </Nav>
                )}
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBar;

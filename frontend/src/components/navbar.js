import React from 'react';
import { useAuth } from '../context/AuthProvider';
import { Navbar, Nav } from 'react-bootstrap'; 

function NavBar(){
    const { currentUser } = useAuth();

    return(
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#">Stephan Bank</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#/CreateAccount/">Create Account</Nav.Link>
                    <Nav.Link href="#/login/">Login</Nav.Link>
                    {currentUser && (
                        <>
                            <Nav.Link href="#/deposit/">Deposit</Nav.Link>
                            <Nav.Link href="#/withdraw/">Withdraw</Nav.Link>
                            <Nav.Link href="#/transfer/">Transfer</Nav.Link>
                            <Nav.Link href="#/balance/">Balance</Nav.Link>
                            <Nav.Link href="#/alldata/">AllData</Nav.Link>
                        </>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBar;
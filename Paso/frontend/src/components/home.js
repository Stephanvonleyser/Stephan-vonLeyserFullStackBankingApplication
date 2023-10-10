import React from 'react';
import { Container } from 'react-bootstrap';
import bankImage from './public/Bank.jpg'; 

function Home() {
    return (
        <Container fluid className="text-center p-5" style={{backgroundImage: `url(${bankImage})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
            <Container className="p-5 mb-2 bg-transparent text-dark">
                <h1 className="display-4 fw-bold text-body">Stephan Bank</h1>
                <h3 className="display-6">Your Future, Secured and Amplified</h3>
                <Container className="col-lg-6 mx-auto bg-light p-3 rounded mt-3">
                    <p className="lead mb-4">Unlock a world of opportunities with our global banking network. Whether it's international trading, global investments, or overseas education, our expansive presence ensures that your banking needs are met, no matter where life takes you.</p>
                </Container>
            </Container>
        </Container>
    );
}

export default Home;

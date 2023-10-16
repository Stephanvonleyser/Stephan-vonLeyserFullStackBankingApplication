import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NavBar from './components/navbar';
import CreateUser from './components/createuser';
import Home from './components/home';
import Balance from './components/balance';
import Deposit from './components/deposit';
import Withdraw from './components/withdraw';
import Transfer from './components/transfer';
import AllData from './components/alldata';
import Login from './components/login';
import NotFound from './components/notfound';
// Import other components as needed...

function App() {
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/createuser" element={<CreateUser />} />
                <Route path="/balance" element={<Balance />} />
                <Route path="/deposit" element={<Deposit />} />
                <Route path="/withdraw" element={<Withdraw />} />
                <Route path="/transfer" element={<Transfer />} />
                <Route path="/alldata" element={<AllData />} />
                
                {/* Add other routes as needed */}

                {/* 404 - Not Found route */}
                <Route path="*" element={<NotFound />} />
            </Switch>
        </Router>
    );
}

export default App;
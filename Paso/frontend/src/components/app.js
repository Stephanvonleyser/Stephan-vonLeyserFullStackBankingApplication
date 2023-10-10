import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/navbar';
import CreateAccount from './components/createaccount';
import Home from './Components/home';
import Balance from './Components/balance';
import Deposit from './Components/deposit';
import Withdraw from './Components/withdraw';
import Transfer from './Components/transfer';
import AllData from './Components/alldata';
import Login from './Components/login';
// Import other components as needed...

function App() {
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route path="/home/" element={Home} />
                <Route path="/login" element={Login} />
                <Route path="/createaccount/" element={CreateAccount} />
                <Route path="/balance" element={Balance} />
                <Route path="/deposit" element={Deposit} />
                <Route path="/withdraw" element={Withdraw} />
                <Route path="/transfer" element={Transfer} />
                <Route path="/alldata" element={AllData} />
                
                {/* Add other routes as needed */}
            </Switch>
        </Router>
    );
}

export default App;
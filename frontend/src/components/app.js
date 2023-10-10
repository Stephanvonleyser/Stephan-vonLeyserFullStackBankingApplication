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
                <Route path="/Home/" component={Home} />
                <Route path="/Login" element={Login} />
                <Route path="/CreateAccount/" component={CreateAccount} />
                <Route path="/Balance" element={Balance} />
                <Route path="/Deposit" element={Deposit} />
                <Route path="/Withdraw" element={Withdraw} />
                <Route path="/Transfer" element={Transfer} />
                <Route path="/AllData" element={AllData} />
                
                {/* Add other routes as needed */}
            </Switch>
        </Router>
    );
}

export default App;
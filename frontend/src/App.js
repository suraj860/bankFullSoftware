
import React from "react";
import {BrowserRouter , Switch , Route} from 'react-router-dom'
import Home from "./components/homePage";
import CreatNewAccount from "./components/createAccount";
import DepositAmount from "./components/deposit";
import TransferAmount from "./components/transfer";
import CheckBalance from "./components/checkBalance";

function App() {
  return (
   <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route  path="/newAccount" component={CreatNewAccount}/>
      <Route  path="/deposit" component={DepositAmount}/>
      <Route  path="/withdraw" component={DepositAmount}/>
      <Route path="/transfer" component={TransferAmount}/>
      <Route path="/balance" component={CheckBalance}/>
    </Switch>
   </BrowserRouter>
  );
}

export default App;

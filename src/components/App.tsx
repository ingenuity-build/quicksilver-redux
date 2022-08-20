import React from 'react';
import logo from './logo.svg';
import { Routes, Route, useLocation} from "react-router-dom";
import Navbar from './navbar/Navbar';
import Delegate from './staking-interface/delegate/Delegate';
import Assets from './assets-interface/Assets';
import Pools from './pools-interface/Pools';
import Airdrop from './airdrops-interface/Airdrops';
import Landing from './landing-screen/Landing';
import ConnectWallet from './staking-interface/delegate/ConnectWallet';

import './App.css';
import Undelegate from './staking-interface/undelegate/Undelegate';
import Redelegate from './staking-interface/redelegate/Relegate';
import NetworkSelection from './staking-interface/delegate/NetworkSelection';

function App() {
  let activeStep = 4;
  return (
    <>
    <div className="img-logo text-center">

    </div>

  {location.pathname !== '/' && <Navbar />}
   <Routes>
                      <Route path="/" element={<Landing/>}/>
                
                      <Route path="/stake" element={<Delegate />}>
          {activeStep === 1 && <Route path="delegate" element={<ConnectWallet/>} />}
          {activeStep > 1 && <Route path="delegate" element={<NetworkSelection/>} />}
          <Route path="undelegate" element={<Undelegate />} />
          <Route path="redelegate" element={<Redelegate />} /> 
        </Route>
                      <Route path="/pools" element={<Pools  />}/>
                      <Route path="/airdrop" element={<Airdrop  />}/>
                      <Route path="/claims" element={<Assets  />}/>
                    
   </Routes>

   </>
  )
}

export default App;

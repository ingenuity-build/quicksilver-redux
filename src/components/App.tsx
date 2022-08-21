import React from 'react';

import { Routes, Route, useLocation} from "react-router-dom";
import Navbar from './navbar/Navbar';
import Stake from './staking-interface/delegate/Stake';
import Assets from './assets-interface/Assets';
import Pools from './pools-interface/Pools';
import Airdrop from './airdrops-interface/Airdrops';
import Landing from './landing-screen/Landing';
import ConnectWallet from './staking-interface/delegate/ConnectWallet';

import './App.css';
import Undelegate from './staking-interface/undelegate/Undelegate';
import Redelegate from './staking-interface/redelegate/Relegate';
import NetworkSelection from './staking-interface/delegate/NetworkSelection';
import LogoStroke from '../assets/quicksilver-logo-stroke.svg';


function App() {

  const location = useLocation();

  return (
    <>
    {/* <div className="img-logo text-center">
    <img className="logo-stroke" src={LogoStroke} alt="Quicksilver Logo"/>
    </div> */}
  {location.pathname !== '/' && <Navbar />}
   <Routes>
                      <Route path="/" element={<Landing/>}/>
                
                      <Route path="/stake" element={<Stake/>} >
          {/* <Route path="delegate" element={<ConnectWallet/>} />
          <Route path="undelegate" element={<Undelegate />} />
          <Route path="redelegate" element={<Redelegate />} />  */}
        </Route>
                      <Route path="/pools" element={<Pools  />}/>
                      <Route path="/airdrop" element={<Airdrop  />}/>
                      <Route path="/claims" element={<Assets  />}/>
                    
   </Routes>

   </>
  )
}

export default App;

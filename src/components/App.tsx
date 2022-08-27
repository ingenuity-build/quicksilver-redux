import React, {useEffect} from 'react';

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
import LogoStroke from '../assets/quicksilver-logo-stroke.svg';
import Delegate from './staking-interface/delegate/Delegate';
import { initKeplrWithQuickSilver} from '../utils/chains';
import { SigningStargateClient } from "@cosmjs/stargate"
import { getKeplrFromWindow } from '@keplr-wallet/stores';
import { setQSWallet,setQSWalletConnected, setQSBalance,  quicksilverSelector } from '../slices/quicksilver';
import { useDispatch, useSelector } from 'react-redux'
import {  setModalClose } from '../slices/connectWalletModal';
import { increaseStakingStep } from "../slices/stakingActiveStep";


function App() {
  const dispatch = useDispatch();
  const balances = useSelector(quicksilverSelector);
  const location = useLocation();
  // const isWalletConnected = useSelector(isQSWalletConnectedSelector);

  useEffect(() => {
    let QCKBalance;

}, [balances])

  const handleClickOpen = () => {
    // @ts-expect-error
  if (window &&  !window.keplr) {
    alert("Please install keplr extension");
}  else {
connectKeplr();
}
};


const connectKeplr = async () => {

  initKeplrWithQuickSilver(async(key: string, val: SigningStargateClient) => {
    // @ts-expect-error
    dispatch(setQSWallet(key, val));
     // @ts-expect-error
    dispatch(setQSWalletConnected())
    // setWallets(new Map<string, SigningStargateClient>(wallets.set(key, val)));
    // setWalletConnection(true);
    let keplr = await getKeplrFromWindow();
    let chainId = await val.getChainId();
    let pubkey = await keplr?.getKey(chainId);
    let bech32 = pubkey?.bech32Address;
    console.log(bech32);
    if (bech32) {
      let roBalance = await val.getAllBalances(bech32);
     
            // @ts-expect-error
        dispatch(setQSBalance(roBalance));
    }
    // console.log('isWalletConnected', isWalletConnected);
        // @ts-expect-error
  dispatch(setModalClose());
         // @ts-expect-error
  dispatch(increaseStakingStep());

  });

}

  return (
    <>
    <div className="img-logo text-center">
    <img className="logo-stroke" src={LogoStroke} alt="Quicksilver Logo"/>
    </div>
  {location.pathname !== '/' && <Navbar handleClickOpen={handleClickOpen} />}
   <Routes>
                      <Route path="/" element={<Landing/>}/>
                
                      <Route path="/stake" element={<Stake/>} >
          <Route path="delegate" element={<Delegate/>} />
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

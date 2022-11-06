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
import Redelegate from './staking-interface/redelegate/Redelegate';
import LogoStroke from '../assets/quicksilver-logo-stroke.svg';
import Delegate from './staking-interface/delegate/Delegate';
import { initKeplrWithQuickSilver} from '../utils/chains';
import { SigningStargateClient } from "@cosmjs/stargate";
import { getKeplrFromWindow } from '@keplr-wallet/stores';
import { setQSWallet,setQSWalletConnected, setQSBalance,  quicksilverSelector, setClient, setQuicksilverAddress } from '../slices/quicksilver';
import { useDispatch, useSelector } from 'react-redux'
import {  setModalClose } from '../slices/connectWalletModal';
import { increaseStakingStep } from "../slices/stakingActiveStep";
// @ts-ignore
import createActivityDetector from 'activity-detector';


function useIdle(options: any) {
  const [isIdle, setIsIdle] = React.useState(false)
  React.useEffect(() => {
    const activityDetector = createActivityDetector(options)
    activityDetector.on('idle', () => setIsIdle(true) )
    activityDetector.on('active', () => {setIsIdle(false); 
   } )
    return () => activityDetector.stop()
  }, [])
  return isIdle
}

function App() {
  const dispatch = useDispatch();
  const {balances, isQSWalletConnected} = useSelector(quicksilverSelector);
  const location = useLocation();
  // const isWalletConnected = useSelector(isQSWalletConnectedSelector);
  const isIdle = useIdle({timeToIdle: 1800000});
  const [loading, setLoading] = React.useState(false);
  const [val, setVal] = React.useState<SigningStargateClient>();



  React.useEffect(() => {
    let timer: any;
    if(!isIdle) {
      timer = setInterval( () => {
        if(isQSWalletConnected) {
          //connectKeplr();
          fetchKeplrDetails(val);
          console.log('hey');
         // setBalances(new Map<string, Map<string, number>>(balances.set(chainId, new Map<string, number>(networkBalances.set(bal.denom, parseInt(bal.amount))))));
        }
    }, 6000)
    } 
    return () => clearInterval(timer);
  }, [isIdle])

  const handleClickOpen = () => {
    // @ts-expect-error
  if (window &&  !window.keplr) {
    alert("Please install keplr extension");
}  else {
connectKeplr();
}
};


const connectKeplr = async () => {
  setLoading(true);
  initKeplrWithQuickSilver(async(key: string, val: SigningStargateClient) => {
    // @ts-expect-error
    dispatch(setQSWallet(key, val));
        // @ts-expect-error
        dispatch(setClient(val));
     // @ts-expect-error
    dispatch(setQSWalletConnected())
       
    setVal(val);
        fetchKeplrDetails(val)
         // @ts-expect-error
  dispatch(setModalClose());
  setLoading(false);
         // @ts-expect-error
  dispatch(increaseStakingStep());

  });

}

const fetchKeplrDetails = async (val: any) => {
  let keplr = await getKeplrFromWindow();
    let chainId = await val.getChainId();
    let pubkey = await keplr?.getKey(chainId);
    let bech32 = pubkey?.bech32Address;
    console.log(bech32);
    if (bech32) {
      let roBalance = await val.getAllBalances(bech32);
     
            // @ts-expect-error
        dispatch(setQSBalance(roBalance));
                  // @ts-expect-error
    dispatch(setQuicksilverAddress(bech32));
    }
}

  return (
    <>
    {/* <div className="img-logo text-center">
    <img className="logo-stroke" src={LogoStroke} alt="Quicksilver Logo"/>
    </div> */}
  {location.pathname !== '/' && <Navbar loading={loading} setLoading={setLoading} handleClickOpen={handleClickOpen} />}
   <Routes>
                      <Route path="/" element={<Landing/>}/>
                
                      <Route path="/stake" element={<Stake/>} >
          <Route path="delegate" element={<Delegate/>} />
          <Route path="undelegate" element={<Undelegate />} />
          <Route path="redelegate" element={<Redelegate />} /> 
        </Route>
                      <Route path="/pools" element={<Pools  />}/>
                      <Route path="/airdrop" element={<Airdrop  />}/>
                      <Route path="/assets" element={<Assets />}/>
                      <Route path="/pools" element={<Pools />}/>
                    
   </Routes>

   </>
  )
}

export default App;

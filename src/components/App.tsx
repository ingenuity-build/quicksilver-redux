import React, {useEffect} from 'react';

import { Routes, Route, useLocation} from "react-router-dom";
import Navbar from './navbar/Navbar';
import Stake from './staking-interface/delegate/Stake';
import Assets from './assets-interface/Assets';
import Pools from './pools-interface/Pools';
import Airdrop from './airdrops-interface/Airdrops';
import Landing from './landing-screen/Landing';
import Governance from './governance-interface/Governance';
import ConnectWallet from './staking-interface/delegate/ConnectWallet';

import './App.css';
import Undelegate from './staking-interface/undelegate/Undelegate';
import Redelegate from './staking-interface/redelegate/Redelegate';
import LogoStroke from '../assets/quicksilver-logo-stroke.svg';
import Delegate from './staking-interface/delegate/Delegate';
import { initWalletWithQuickSilver} from '../utils/chains';
import { SigningStargateClient } from "@cosmjs/stargate";
import { getKeplrFromWindow } from '@keplr-wallet/stores';
import { setQSWallet,setQSWalletConnected, setQSBalance,  quicksilverSelector, setClient, setQuicksilverAddress } from '../slices/quicksilver';
import { useDispatch, useSelector } from 'react-redux'
import {  setModalClose } from '../slices/connectWalletModal';
import { increaseStakingStep } from "../slices/stakingActiveStep";
import { increaseRedelegateStep } from '../slices/relegateActiveStep';
// @ts-ignore
import createActivityDetector from 'activity-detector';
import { Keplr } from '@keplr-wallet/types';


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
  const [walletType, setWalletType] = React.useState<Keplr>();



  React.useEffect(() => {
    let timer: any;
    if(!isIdle) {
      timer = setInterval( () => {
        if(isQSWalletConnected) {
          //connectKeplr();
          fetchDetails(walletType, val);
          console.log('hey');
         // setBalances(new Map<string, Map<string, number>>(balances.set(chainId, new Map<string, number>(networkBalances.set(bal.denom, parseInt(bal.amount))))));
        }
    }, 6000)
    } 
    return () => clearInterval(timer);
  }, [isIdle])

  const handleClickOpen = (wallet: String) => {
    console.log(wallet)
    if (wallet == "keplr") {
      // @ts-expect-error
      if (window &&  !window.keplr) {
        alert("Please install keplr extension");
      }  else {
          // @ts-expect-error
        setWalletType(window.keplr)
        console.log(walletType)
        connectWallet(walletType);
      }
    } else if (wallet == "cosmostation") {
      // @ts-expect-error
      if (window &&  !window.cosmostation) {
        alert("Please install keplr extension");
      }  else {
          // @ts-expect-error
          setWalletType(window.cosmostation.providers.keplr);
          console.log(walletType)
          connectWallet(walletType)
      }
    } else {
      console.log("Unknown type", wallet)
    }
};


const connectWallet = async (wallet: Keplr|undefined) => {
  setLoading(true);
  initWalletWithQuickSilver(async(key: string, val: SigningStargateClient) => {
    console.log("debug5")
    fetchDetails(wallet, val)
    console.log("debug6")

      // @ts-expect-error
    dispatch(setQSWallet(key, val));

    console.log("debug7")
    // @ts-expect-error
        dispatch(setClient(val));
     console.log("debug8")
     // @ts-expect-error
     dispatch(setQSWalletConnected())
       
     console.log("debug9")
    setVal(val);
         // @ts-expect-error
  dispatch(setModalClose());
  console.log("debug10")
  setLoading(false);
         // @ts-expect-error
  dispatch(increaseStakingStep());
// @ts-expect-error
dispatch(increaseRedelegateStep())
  },
  wallet
);
}

const fetchDetails = async (provider: Keplr|undefined, val: any) => {

    let chainId = await val.getChainId();
    provider?.getKey(chainId).then(async () => {
      
    let pubkey = await provider?.getKey(chainId);
     let bech32 = pubkey?.bech32Address;
    if (bech32) {
      let roBalance = await val.getAllBalances(bech32);
     
            // @ts-expect-error
        dispatch(setQSBalance(roBalance));
                  // @ts-expect-error
    dispatch(setQuicksilverAddress(bech32));

    }
 
    }).catch((e) =>{ console.log('err', e.message);
    alert('Please add account');
   

    

  });
  
  
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
                      <Route path="/governance" element={<Governance/>}/>
                    
   </Routes>

   </>
  )
}

export default App;

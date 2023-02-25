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
import { initKeplrWithQuickSilver} from '../utils/chains';
import { SigningStargateClient } from "@cosmjs/stargate";
import { getKeplrFromWindow } from '@keplr-wallet/stores';
import { setQSWallet,setQSWalletConnected, setQSBalance,  quicksilverSelector, setQSClient, setQuicksilverAddress, setWalletType } from '../slices/quicksilver';
import { useDispatch, useSelector } from 'react-redux'
import {  setModalClose } from '../slices/connectWalletModal';
import { increaseStakingStep } from "../slices/stakingActiveStep";
import { increaseRedelegateStep } from '../slices/relegateActiveStep';
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
  const {balances, isQSWalletConnected, walletType} = useSelector(quicksilverSelector);
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
         // setBalances(new Map<string, Map<string, number>>(balances.set(chainId, new Map<string, number>(networkBalances.set(bal.denom, parseInt(bal.amount))))));
        }
    }, 6000)
    } 
    return () => clearInterval(timer);
  }, [isIdle])

  const fetchKeplrDetails = async (val: any) => {
    if(walletType === '') {
      // @ts-expect-error
  setWalletType(JSON.parse(localStorage.getItem('WalletType')))
  }

      let chainId = await val.getChainId();
      if(walletType === 'keplr') {
        let keplr = await getKeplrFromWindow();
      keplr?.getKey(chainId).then(async () => {
      let pubkey = await keplr?.getKey(chainId);
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
    
  } else if(walletType === 'leap') {


    // @ts-expect-error
window.leap?.getKey(chainId).then(async () => {

    // @ts-expect-error
let pubkey = await window.leap?.getKey(chainId);
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

}


);


}
  }


  useEffect(() => {
    if(walletType !== '') {
  handleClickOpen()
    }
  }, [walletType])

  let key;
  useEffect(() => {
     // @ts-expect-error
     if(JSON.parse(localStorage.getItem('ChainId'))) {
         // @ts-expect-error
       key = JSON.parse(localStorage.getItem('ChainId'))
      connectKeplr();
     }
  }, [key])


  const connectKeplr = async () => {
    setLoading(true);
    if(walletType === '') {
      //@ts-expect-error
            dispatch(setWalletType(localStorage.getItem('WalletType')))
      }
    initKeplrWithQuickSilver(async(key: string, val: SigningStargateClient) => {
      fetchKeplrDetails(val)
        // @ts-expect-error
      dispatch(setQSWallet(key, val));
          // @ts-expect-error
          dispatch(setQSClient(val));
       // @ts-expect-error
      dispatch(setQSWalletConnected())
         
      setVal(val);
           // @ts-expect-error
    dispatch(setModalClose());
    setLoading(false);
           // @ts-expect-error
    dispatch(increaseStakingStep());
  // @ts-expect-error
  dispatch(increaseRedelegateStep())
    }, walletType
  );
  }

  const handleClickOpen = () => {
    if(walletType === 'keplr') {
    // @ts-expect-error
  if (window &&  !window.keplr) {
    alert("Please install keplr extension");
}  else {
connectKeplr();
} 
    } else if(walletType === 'leap') {
      // @ts-expect-error
      if (window &&  !window.leap) {
       alert("Please install Leap extension");
   }  else {
   connectKeplr();
   }
};
  }




React.useEffect(() => {
  if(walletType === 'keplr') {
  window.addEventListener("keplr_keystorechange", () => {
             // @ts-expect-error
             dispatch(setQSBalance([]));
    connectToQS();
  })
} else if(walletType === 'leap') {
  window.addEventListener('leap_keystorechange', () => {
             // @ts-expect-error
             dispatch(setQSBalance([]));
    connectToQS();
  })
}
}, [walletType]);

const connectToQS = () => {
  initKeplrWithQuickSilver(async(key: string, val: SigningStargateClient) => {
    fetchKeplrDetails(val)
    // @ts-expect-error
  dispatch(setQSWallet(key, val));
      // @ts-expect-error
      dispatch(setQSClient(val));
   // @ts-expect-error
  dispatch(setQSWalletConnected())
  setVal(val);
  }, walletType
);
}



  return (
    <>
    <div className="img-logo text-center">
    <img className="logo-stroke" src={LogoStroke} alt="Quicksilver Logo"/>
    </div>

  {location.pathname !== '/' && <Navbar loading={loading} setLoading={setLoading} handleClickOpen={handleClickOpen} />}
      <div className={location.pathname !== '/' ? 'mobile-message p-3' : 'mobile-message-landing p-3'}> 
    <h4>The current display window is too small. Minimum supported resolution is 1280 pixels wide.</h4> 
    </div>
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

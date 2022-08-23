import React from 'react';
import { Link } from "react-router-dom";
import { useLocation} from "react-router-dom";
import { initKeplrWithQuickSilver } from "../../utils/chains";
import { SigningStargateClient } from "@cosmjs/stargate"
import { getKeplrFromWindow } from '@keplr-wallet/stores';
import { setQSWallet, walletQSSelector,setQSWalletConnected, setQSBalance, balancesQSSelector , isQSWalletConnectedSelector } from '../../slices/quicksilver';

import { useDispatch, useSelector } from 'react-redux'

import Logo from '../../assets/quicksilver-logo.png';
import './Navbar.css';
import Wallet from '../../assets/icons/wallet.svg';
import Pools from '../../assets/icons/pools.svg';
import Parachute from '../../assets/icons/parachute.svg';
import Stakes from '../../assets/icons/stakes.svg';


export default function Navbar() {
  const dispatch = useDispatch()
  const location = useLocation()
  const balances = useSelector(balancesQSSelector);
  const isWalletConnected = useSelector(isQSWalletConnectedSelector);

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
      console.log('isWalletConnected', isWalletConnected);
    });
 
  }

    return (



   <nav className="navbar navbar-expand-lg d-flex py-0">
          <div className="col-2 navbar-logo">
               <Link to="/">    <img className="logo mt-2" alt="Quicksilver Logo" src={Logo}/></Link> 
  </div>


  <div className="collapse navbar-collapse justify-content-around col-10" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
    
      <li className="nav-item mx-4">
      <img className="nav-icon-stake" alt="Stakes" src={Stakes}/>
      <Link className={`${location.pathname === '/stake/delegate'  ? 'active-link' : ''}`} to="/stake/delegate">STAKE</Link> 
      </li>
   
      <li className="nav-item mx-4 d-flex align-items-center">
      <img className="nav-icon-pools" alt="Pools" src={Pools}/>
               <Link  className={`${location.pathname === '/pools'  ? 'active-link' : ''}`} to="/pools" >POOLS</Link> 
      </li>
  
      <li className="nav-item mx-4 d-flex align-items-center">
      <img className="nav-icon-airdrop" alt="Parachute" src={Parachute}/>
      <Link  className={`pl-2 ${location.pathname === '/claims'  ? 'active-link' : ''}`} to="/claims" onClick={ (event) => event.preventDefault() }>AIRDROP</Link> 
      
      </li>
      {/* <li className="nav-item mx-4">
      <Link  className={`${location.pathname === '/gov'  ? 'active-link' : ''}`} to="/gov" onClick={ (event) => event.preventDefault() }>GOVERNANCE</Link> 
      </li> */}

    </ul>
     
{!isWalletConnected && <button onClick={connectKeplr} className="btn connect-wallet-button px-3 my-2 my-sm-0"> Connect Wallet
      </button>}
      {isWalletConnected && <h5>HEY</h5> }
      {isWalletConnected}
 
  </div>
</nav>
        )

      
    
}
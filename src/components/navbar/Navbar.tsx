import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import { useLocation} from "react-router-dom";


import Select from "react-select";


import { useDispatch, useSelector } from 'react-redux'

import Logo from '../../assets/quicksilver-logo.png';
import './Navbar.css';
import Wallet from '../../assets/icons/wallet.svg';
import Pools from '../../assets/icons/pools.svg';
import Parachute from '../../assets/icons/parachute.svg';
import Stakes from '../../assets/icons/stakes.svg';
import ConnectWalletModal from '../connect-wallet-modal/ConnectWalletModal';
import { connectWalletModalSelector, setModalOpen } from '../../slices/connectWalletModal';
import Backdrop from '../../components/backdrop/Backdrop';
import {quicksilverSelector} from '../../slices/quicksilver';
import { networksSelector, fetchNetworks } from '../../slices/networks'	;
import { selectedNetworkSelector, setSelectedNetwork, setSelectedNetworkFunc } from "../../slices/selectedNetwork";
import { setNetworkAddress,  setNetworkWallet, setNetworkBalance, selectedNetworkWalletSelector, setClient } from "../../slices/selectedNetworkWallet";
import { _loadValsAsync } from "../../slices/validatorList";
import { initKeplrWithNetwork } from "../../utils/chains";
import { SigningStargateClient } from "@cosmjs/stargate";
import { getKeplrFromWindow } from '@keplr-wallet/stores';
import { setStakingStep} from "../../slices/stakingActiveStep";
import {  setSelectedValidatorList } from "../../slices/validatorList";

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


interface PropComponent {
  handleClickOpen? : { (): void};
  loading: boolean;
  setLoading: any
}

export default function Navbar(props: PropComponent) {
  const isIdle = useIdle({timeToIdle: 1800000});
  const [val, setVal] = React.useState<SigningStargateClient>();

  const { networks, loading, hasErrors } = useSelector(networksSelector);
  const {selectedNetwork} = useSelector(selectedNetworkSelector);
 const {networkAddress} = useSelector(selectedNetworkWalletSelector);

  const dispatch = useDispatch()
  const location = useLocation()
  const {balances, isQSWalletConnected} = useSelector(quicksilverSelector);
  // const { isWalletConnected }= useSelector(isQSWalletConnectedSelector);
  const {isModalOpen} = useSelector(connectWalletModalSelector)

  const [QCKBalance, setQCKBalance] = useState(0);


  useEffect(() => {
    if(balances !== []) {
         let balance = balances.find((bal: any) => bal.denom === 'uqck');
         if(balance) {
          setQCKBalance((balance.amount)/1000000);
         }
     
    }

}, [balances])

  const onButtonClick = () => {
      // @ts-expect-error
    dispatch(setModalOpen());


  }

  useEffect(() => {

    // @ts-expect-error
      dispatch(fetchNetworks())
      // // @ts-expect-error
      // dispatch(setSelectedNetworkFunc('Apple'));

    }, [dispatch])

    useEffect(() => {
      if (selectedNetwork !== "Select a network") {
        connectNetwork(selectedNetwork.chain_id);
  
      // dispatch(_loadValsAsync(selectedNetwork.chain_id));
      }
    }, [selectedNetwork])

    const fetchNetworkDetails = async (val: any) => {
             // @ts-expect-error
             dispatch(setNetworkBalance([]));
      let keplr = await getKeplrFromWindow();
      let chainId = await val.getChainId();
      let pubkey = await keplr?.getKey(chainId);
      let bech32 = pubkey?.bech32Address;
      // props.setNetworkAddress(bech32);
 // @ts-expect-error
      dispatch(setNetworkAddress(bech32))
      if (bech32) {
        let roBalance = await val.getAllBalances(bech32);
              // @ts-expect-error
          dispatch(setNetworkBalance(roBalance));
          console.log('roBalance',roBalance);
      }
    }
   
  const connectNetwork =  async (network: string) => {

    initKeplrWithNetwork(async (key: string, val: SigningStargateClient) => {
     // @ts-expect-error
     dispatch(setNetworkWallet(key, val))

      // @ts-expect-error
      dispatch(setClient(val));
      setVal(val);
      fetchNetworkDetails(val)
     
    }, network);
  }



  React.useEffect(() => {
    let timer: any;
    if(!isIdle) {
      timer = setInterval( () => {
        if(isQSWalletConnected) {
          //connectKeplr();
          fetchNetworkDetails(val);
          console.log('hey from navbar');
         // setBalances(new Map<string, Map<string, number>>(balances.set(chainId, new Map<string, number>(networkBalances.set(bal.denom, parseInt(bal.amount))))));
        }
    }, 30000)
    } 
    return () => clearInterval(timer);
  }, [isIdle])


  let handleNetworkChange = (selected: any) => {
    console.log(selected);
    // @ts-expect-error
        dispatch(setSelectedNetworkFunc(selected));
        // @ts-expect-error
        dispatch(setStakingStep(2));
                        //    @ts-expect-error
    dispatch(setSelectedValidatorList([]))
  }
    return (



   <nav className="navbar navbar-expand-lg d-flex py-0">
          <div className={`${location.pathname.includes('stake') ? 'col-2 navbar-logo ' : 'col-2'}`} >
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
               <Link  className={`${location.pathname === '/assets'  ? 'active-link' : ''}`} to="/assets" >ASSETS</Link> 
      </li>
  
      <li className="nav-item mx-4 d-flex align-items-center">
      <img className="nav-icon-airdrop" alt="Parachute" src={Parachute}/>
      <Link  className={`pl-2 ${location.pathname === '/airdrop'  ? 'active-link' : ''}`} to="/airdrop" >AIRDROP</Link> 
      
      </li>
      <li className="nav-item mx-4">
      <Link  className={`${location.pathname === '/pools'  ? 'active-link' : ''}`} to="/pools" >POOLS</Link> 
      </li>

    </ul>
{!isQSWalletConnected && <button onClick={onButtonClick} className="btn connect-wallet-button px-3 my-2 my-sm-0"> Connect Wallet
      </button>}
      {isQSWalletConnected &&   <Select className="custom-class mb-3 mt-2 "
        //   defaultValue={{ label: selectedNetwork.account_prefix ? selectedNetwork.account_prefix?.charAt(0).toUpperCase() + selectedNetwork.account_prefix?.slice(1) : '' }}
          options={networks}
          onChange={handleNetworkChange}

        />}
        {isModalOpen && <ConnectWalletModal loading={props.loading} setLoading={props.setLoading} handleClickOpen={props.handleClickOpen}/>}
      
        {isQSWalletConnected && <p className="btn connect-wallet px-3 my-2 my-sm-0">  <img alt="Wallet icon" src={Wallet}/> {QCKBalance ? QCKBalance : 0} QCK</p>}
      
      { isModalOpen && <Backdrop />}
 
  </div>
</nav>
        )

      
    
}
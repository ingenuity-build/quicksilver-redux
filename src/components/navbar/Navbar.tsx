import React, {useEffect, useState, useRef} from 'react';
import { Link } from "react-router-dom";
import { useLocation} from "react-router-dom";


import Select from "react-select";


import { useDispatch, useSelector } from 'react-redux'

import Logo from '../../assets/quicksilverlogo.svg';
import Logout from '../../assets/logout.svg'
import './Navbar.css';
import Wallet from '../../assets/icons/wallet.svg';
import Pools from '../../assets/icons/pools.svg';
import Parachute from '../../assets/icons/parachute.svg';
import Stakes from '../../assets/icons/stakes.svg';
import Asset from '../../assets/icons/asset.svg';
import Governance from '../../assets/icons/Governance.svg';
import ConnectWalletModal from '../connect-wallet-modal/ConnectWalletModal';
import { connectWalletModalSelector, setModalOpen } from '../../slices/connectWalletModal';
import Backdrop from '../../components/backdrop/Backdrop';
import {quicksilverSelector, setWalletType} from '../../slices/quicksilver';
import { networksSelector, fetchNetworks } from '../../slices/networks'	;
import { selectedNetworkSelector, setSelectedNetwork, setSelectedNetworkFunc } from "../../slices/selectedNetwork";
import { setNetworkAddress,  setNetworkWallet, setNetworkBalance, selectedNetworkWalletSelector, setClient } from "../../slices/selectedNetworkWallet";
import { _loadValsAsync } from "../../slices/validatorList";
import { initKeplrWithNetwork } from "../../utils/chains";
import { SigningStargateClient } from "@cosmjs/stargate";
import { getKeplrFromWindow } from '@keplr-wallet/stores';
import { setStakingStep} from "../../slices/stakingActiveStep";
import { setRedelegateStep } from '../../slices/relegateActiveStep';
import {  setSelectedValidatorList, setRedelegateValidatorList } from "../../slices/validatorList";
import { setStakingAllocationProp, setStakingAmount } from '../../slices/allocation';
import { setQSWallet, setQSWalletConnected, setQSBalance, setQSClient, setQSWalletDisconnected, setQuicksilverAddress } from '../../slices/quicksilver';

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
  const selectInputRef = useRef() as any;
  const isIdle = useIdle({timeToIdle: 1800000});
  const [val, setVal] = React.useState<SigningStargateClient>();

  const { networks, loading, hasErrors } = useSelector(networksSelector);
  const {selectedNetwork} = useSelector(selectedNetworkSelector);
 const {networkAddress} = useSelector(selectedNetworkWalletSelector);

  const dispatch = useDispatch()
  const location = useLocation()
  const {balances, isQSWalletConnected, walletType} = useSelector(quicksilverSelector);
  // const { isWalletConnected }= useSelector(isQSWalletConnectedSelector);
  const {isModalOpen} = useSelector(connectWalletModalSelector)

  const [QCKBalance, setQCKBalance] = useState(0);
  const [network, setNetwork] = useState();


  useEffect(() => {
    if(balances.length > 0) {
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

  const colourStyles = {
    control: styles => ({ ...styles, backgroundColor: 'black' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: 'white',
        color: '#1A1A1A',
        cursor: isDisabled ? 'not-allowed' : 'default',
      };
    },

  };

  useEffect(() => {

    // @ts-expect-error
      dispatch(fetchNetworks())
      // // @ts-expect-error
      // dispatch(setSelectedNetworkFunc('Apple'));

    }, [dispatch])

    useEffect(() => {
      if (selectedNetwork !== "Select a network") {
             // @ts-expect-error
        dispatch(setNetworkAddress(''))
        connectNetwork(selectedNetwork.chain_id);
  
      // dispatch(_loadValsAsync(selectedNetwork.chain_id));
      }
    }, [selectedNetwork])

    const fetchNetworkDetails = async (val: any) => {
             // @ts-expect-error
             dispatch(setNetworkBalance([]));
             if(walletType === 'keplr') {
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
      }
    } else if(walletType === 'leap') {
      let chainId = await val.getChainId();
           // @ts-expect-error
      let pubkey = await window.leap?.getKey(chainId);
      let bech32 = pubkey?.bech32Address;
      // props.setNetworkAddress(bech32);
 // @ts-expect-error
      dispatch(setNetworkAddress(bech32))

      if (bech32) {
        let roBalance = await val.getAllBalances(bech32);
              // @ts-expect-error
          dispatch(setNetworkBalance(roBalance));
      }
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
     
    }, walletType, network);
  }

  useEffect(() => {
    window.addEventListener("keplr_keystorechange", () => {
      // @ts-expect-error
      dispatch(setNetworkBalance([]));
        connectNetwork(selectedNetwork.chain_id);
    })
  }, []);

  React.useEffect(() => {
    let timer: any;
    if(!isIdle) {
      timer = setInterval( () => {
        if(isQSWalletConnected) {
          //connectKeplr();
          fetchNetworkDetails(val);
         // setBalances(new Map<string, Map<string, number>>(balances.set(chainId, new Map<string, number>(networkBalances.set(bal.denom, parseInt(bal.amount))))));
        }
    }, 10000)
    } 
    return () => clearInterval(timer);
  }, [isIdle, val])


  let handleNetworkChange = (selected: any) => {
    console.log(selected);
    // @ts-expect-error
        dispatch(setSelectedNetworkFunc(selected));
        // @ts-expect-error
        dispatch(setStakingStep(2));
           // @ts-expect-error
           dispatch(setRedelegateStep(2));
                        //    @ts-expect-error
    dispatch(setSelectedValidatorList([]))
    // @ts-expect-error
    dispatch(setRedelegateValidatorList([]))
  }

  const logout = () => {
    selectInputRef.current.clearValue();
               // @ts-expect-error
               dispatch(setWalletType(''));
                     // @ts-expect-error
                     dispatch(setSelectedNetworkFunc(null));
   localStorage.removeItem("ChainId");
   localStorage.removeItem("WalletType");
       // @ts-expect-error
       dispatch(setStakingAmount(1));
       // @ts-expect-error
       dispatch(setStakingAllocationProp({}));
       // @ts-expect-error
       dispatch(fetchNetworks())
               // @ts-expect-error
       dispatch(setStakingStep(1));
                    // @ts-expect-error
                    dispatch(setSelectedNetworkFunc("Select a network"));
         // @ts-expect-error
         dispatch(setQSWalletDisconnected())
 }
    return (



   <nav className="navbar navbar-expand-lg d-flex py-0">
          <div className={`${location.pathname.includes('stake') ? 'col-2 navbar-logo d-flex ' : 'col-2 d-flex'}`} >
               <Link to="/">    <img className="logo ml-2" alt="Quicksilver Logo" src={Logo}/></Link> 
  </div>


  <div className="collapse navbar-width navbar-collapse justify-content-around col-10" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
    
      <li className="nav-item mx-4">
      <img className={`${location.pathname.includes('stake')  ? 'nav-icon-stake' : 'stake-white'}`} alt="Stakes" src={Stakes}/>
      <Link className={`${location.pathname.includes('stake')  ? 'active-link' : ''}`} to="/stake/delegate">STAKE</Link> 
      </li>
   
      <li className="nav-item mx-4 d-flex align-items-center">
      <img className={`${location.pathname === '/assets'  ? 'nav-icon-asset' : 'asset-white'}`} alt="Assets" src={Asset}/>
               <Link  className={`${location.pathname === '/assets'  ? 'active-link ml-2' : 'pl-2'}`} to="/assets" >ASSETS</Link> 
      </li>
  
      <li className="nav-item mx-4 d-flex align-items-center">
      <img className={`${location.pathname === '/airdrop'  ? 'nav-icon-airdrop' : 'airdrop-white'}`} alt="Parachute" src={Parachute}/>
      <Link  className={`pl-2 ${location.pathname === '/airdrop'  ? 'active-link' : ''}`} to="/airdrop">AIRDROP</Link> 
      
      </li>
      <li className="nav-item mx-4 d-flex align-items-center">
      <img className={`${location.pathname === '/governance'  ? 'nav-icon-airdrop governance' : 'airdrop-white governance'}`} alt="Parachute" src={Governance}/>
      <Link  className={`pl-2 ${location.pathname === '/governance'  ? 'active-link' : ''}`} to="/governance">GOVERNANCE</Link> 
      
      </li>
      {/* <li className="nav-item mx-4">
      <Link  className={`${location.pathname === '/pools'  ? 'active-link' : ''}`} to="/pools" >POOLS</Link> 
      </li> */}

    </ul>
{!isQSWalletConnected && <button onClick={onButtonClick} className="btn connect-wallet-button px-3 my-2 my-sm-0"> Connect Wallet
      </button>}
      <Select className={"custom-class mb-3 mt-2 "  + (isQSWalletConnected === true ? 'visible' : "invisible")}
        //   defaultValue={{ label: selectedNetwork.account_prefix ? selectedNetwork.account_prefix?.charAt(0).toUpperCase() + selectedNetwork.account_prefix?.slice(1) : '' }}
        ref={selectInputRef}  options={networks} styles={colourStyles}  formatOptionLabel={network => (
            <div className="network-option">
              <img className="network-logo px-2" src={network.image} alt="network-image" />
              <span>{network.label}</span>
            </div>
          )}
          onChange={handleNetworkChange}

        />
        {isModalOpen && <ConnectWalletModal loading={props.loading} setLoading={props.setLoading} handleClickOpen={props.handleClickOpen}/>}
            {/* <button onClick={logOut}> LOGOUT </button> */}
        {isQSWalletConnected && <p className="btn connect-wallet px-3 my-2 my-sm-0">  <img alt="Wallet icon" src={Wallet}/> {QCKBalance ? QCKBalance.toFixed(2) : 0}  QCK <img className="logout" onClick={logout} alt="Logout icon" src={Logout}/> </p>}
      
      { isModalOpen && <Backdrop />}
 
  </div>
</nav>
        )

      
    
}
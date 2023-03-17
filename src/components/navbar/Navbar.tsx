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
import { useParams } from 'react-router-dom';
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
 const [selectedOption, setSelectedOption] = useState({label:'Select..'});

  const dispatch = useDispatch()
  const location = useLocation()
  const {balances, isQSWalletConnected, walletType} = useSelector(quicksilverSelector);
  // const { isWalletConnected }= useSelector(isQSWalletConnectedSelector);
  const {isModalOpen} = useSelector(connectWalletModalSelector)

  const [QCKBalance, setQCKBalance] = useState(0);
  const [network, setNetwork] = useState();
  const params = useParams()


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
      if (isQSWalletConnected && selectedNetwork !== "Select a network") {
        console.log('wow')
             // @ts-expect-error
        dispatch(setNetworkAddress(''))
        console.log('id', selectedNetwork.chain_id)
        connectNetwork(selectedNetwork.chain_id);
  
      // dispatch(_loadValsAsync(selectedNetwork.chain_id));
      }
    }, [selectedNetwork, isQSWalletConnected])

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
      console.log('boww')
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
    }  else if(walletType === 'cosmostation') {
      let chainId = await val.getChainId();
           // @ts-expect-error
      let pubkey = await window.cosmostation.providers.keplr?.getKey(chainId);
      let bech32 = pubkey?.bech32Address;
      // props.setNetworkAddress(bech32);
 // @ts-expect-error
      dispatch(setNetworkAddress(bech32))
      console.log('bech32', bech32)
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
    if(walletType === 'keplr') {
      window.addEventListener("keplr_keystorechange", () => {
        // @ts-expect-error
        dispatch(setNetworkBalance([]));
          connectNetwork(selectedNetwork.chain_id);
      })
    } else if(walletType === 'leap') {
      window.addEventListener("leap_keystorechange", () => {
        // @ts-expect-error
        dispatch(setNetworkBalance([]));
          connectNetwork(selectedNetwork.chain_id);
      })
    } else if(walletType === 'cosmostation') {
      // @ts-expect-error
    window.cosmostation.cosmos.on("accountChanged", () => {
                // @ts-expect-error
                dispatch(setNetworkBalance([]));
                connectNetwork(selectedNetwork.chain_id);
    });
  }

  }, [walletType, selectedNetwork]);

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
    setSelectedOption(selected);  
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

  // React.useEffect(() => {

  //   let network = networks.find((y:any) => y.value.chain_id === 'elgafar-1'); 
  //   console.log('uni', network)
  //   handleNetworkChange(network)
  // }, [networks])



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
         // @ts-expect-error 
        dispatch(setQSBalance([]));
           // @ts-expect-error 
           dispatch(setQuicksilverAddress(''));
         
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
        ref={selectInputRef}  options={networks} 
         styles={colourStyles} 
         value={selectedOption}
         formatOptionLabel={network => (
            <div className="network-option">
              {/* <img className="network-logo px-2" src={network.image } alt="network-image" /> */}
              <span>{network?.label}</span>
            </div>
          )}
          onChange={handleNetworkChange}

        />
       
        {isModalOpen && <ConnectWalletModal loading={props.loading} setLoading={props.setLoading} handleClickOpen={props.handleClickOpen}/>}
            {/* <button onClick={logOut}> LOGOUT </button> */}
        {isQSWalletConnected && <p className="btn connect-wallet px-3 my-2 my-sm-0">  <img alt="Wallet icon" src={Wallet}/> {QCKBalance ? QCKBalance.toFixed(3) : 0}  QCK <img className="logout" onClick={logout} alt="Logout icon" src={Logout}/> </p>}
          <button onClick={() => handleNetworkChange({
  value: {
      "connection_id": "connection-2",
      "chain_id": "elgafar-1",
      "deposit_address": {
        "address": "stars1tfhahr56en80nrmdpd62g2daj43eyxwzmznc6m8996ky3kn57eyqsz5lkm",
        "balance": [
        ],
        "port_name": "icacontroller-elgafar-1.deposit",
        "withdrawal_address": "stars1am2jjvvrdg8lmv0len94355fdr9vvqlx8nzuwjtq78eayxp9753qk8ggs5",
        "balance_waitgroup": 0
      },
      "withdrawal_address": {
        "address": "stars1am2jjvvrdg8lmv0len94355fdr9vvqlx8nzuwjtq78eayxp9753qk8ggs5",
        "balance": [
        ],
        "port_name": "icacontroller-elgafar-1.withdrawal",
        "withdrawal_address": "stars1am2jjvvrdg8lmv0len94355fdr9vvqlx8nzuwjtq78eayxp9753qk8ggs5",
        "balance_waitgroup": 0
      },
      "performance_address": {
        "address": "stars1zp7a0dm68sn4ew8gu40l6yn8y97vyuwx7d60lcj0h0yk5env2g0qxurftj",
        "balance": [
        ],
        "port_name": "icacontroller-elgafar-1.performance",
        "withdrawal_address": "stars1am2jjvvrdg8lmv0len94355fdr9vvqlx8nzuwjtq78eayxp9753qk8ggs5",
        "balance_waitgroup": 0
      },
      "delegation_address": {
        "address": "stars1knp6fe9ffqpf0wg758yjlcx86rylr723m9s3cvy2qrcuascra83qtp7fmu",
        "balance": [
        ],
        "port_name": "icacontroller-elgafar-1.delegate",
        "withdrawal_address": "stars1am2jjvvrdg8lmv0len94355fdr9vvqlx8nzuwjtq78eayxp9753qk8ggs5",
        "balance_waitgroup": 0
      },
      "account_prefix": "stars",
      "local_denom": "uqstars",
      "base_denom": "ustars",
      "redemption_rate": "1.104101392925003344",
      "last_redemption_rate": "1.088365885763916520",
      "validators": [
        {
          "valoper_address": "starsvaloper1099l8kzz2k8fjycfvm7p9ufjedwtfks8fvqphk",
          "commission_rate": "1.000000000000000000",
          "delegator_shares": "10001000100.010001000100010001",
          "voting_power": "10000000000",
          "score": "0.000000000000000000",
          "status": "BOND_STATUS_BONDED",
          "jailed": false,
          "tombstoned": false,
          "jailed_since": "0001-01-01T00:00:00Z"
        },
        {
          "valoper_address": "starsvaloper10vdvkwt0ytsqmvldqgrjktnu4t3fmh05cjcjx7",
          "commission_rate": "0.100000000000000000",
          "delegator_shares": "115095593490.000000000000000000",
          "voting_power": "115095593490",
          "score": "0.000000000000000000",
          "status": "BOND_STATUS_BONDED",
          "jailed": false,
          "tombstoned": false,
          "jailed_since": "0001-01-01T00:00:00Z"
        },
        {
          "valoper_address": "starsvaloper129k0elyjzl3fnh05exnd438d35fkkatcnhln03",
          "commission_rate": "0.050000000000000000",
          "delegator_shares": "50116855888311.000000000000000000",
          "voting_power": "50116855888311",
          "score": "0.000000000000000000",
          "status": "BOND_STATUS_BONDED",
          "jailed": false,
          "tombstoned": false,
          "jailed_since": "0001-01-01T00:00:00Z"
        },
        {
          "valoper_address": "starsvaloper12g7yk2quzqu3vhg8uvgmwtyc85c8upj0s66y5x",
          "commission_rate": "0.050000000000000000",
          "delegator_shares": "50047784613657.000000000000000000",
          "voting_power": "50047784613657",
          "score": "0.000000000000000000",
          "status": "BOND_STATUS_BONDED",
          "jailed": false,
          "tombstoned": false,
          "jailed_since": "0001-01-01T00:00:00Z"
        },
        {
          "valoper_address": "starsvaloper12xlxetf292m9llh5y9gwv92wkqwwagxulwl5l0",
          "commission_rate": "0.100000000000000000",
          "delegator_shares": "33099023542.620462307301352752",
          "voting_power": "33095713670",
          "score": "0.000000000000000000",
          "status": "BOND_STATUS_BONDED",
          "jailed": false,
          "tombstoned": false,
          "jailed_since": "0001-01-01T00:00:00Z"
        },
        {
          "valoper_address": "starsvaloper19mrx78nd8kyghyhjet8ehlyayjhn4pd29jk4na",
          "commission_rate": "0.050000000000000000",
          "delegator_shares": "50055818115657.000000000000000000",
          "voting_power": "50055818115657",
          "score": "0.000000000000000000",
          "status": "BOND_STATUS_BONDED",
          "jailed": false,
          "tombstoned": false,
          "jailed_since": "0001-01-01T00:00:00Z"
        },
        {
          "valoper_address": "starsvaloper1c9w6knk8e6qmdncufc3a3uqpyff2zqcaes3g4c",
          "commission_rate": "0.050000000000000000",
          "delegator_shares": "178882567.751800874681942312",
          "voting_power": "178864768",
          "score": "0.000000000000000000",
          "status": "BOND_STATUS_UNBONDED",
          "jailed": true,
          "tombstoned": false,
          "jailed_since": "2023-01-18T21:13:19.433668955Z"
        },
        {
          "valoper_address": "starsvaloper1ck4n6fq2er7g7380pdzqhxjlk6tevyzp7389vm",
          "commission_rate": "0.050000000000000000",
          "delegator_shares": "26319861284.000000000000000000",
          "voting_power": "26319861284",
          "score": "0.000000000000000000",
          "status": "BOND_STATUS_BONDED",
          "jailed": false,
          "tombstoned": false,
          "jailed_since": "0001-01-01T00:00:00Z"
        },
        {
          "valoper_address": "starsvaloper1d4rllgn2ef50hqhxyv482m7ftp6sp02xdzv8xm",
          "commission_rate": "0.100000000000000000",
          "delegator_shares": "11168883310.310867607053881320",
          "voting_power": "11167766425",
          "score": "0.000000000000000000",
          "status": "BOND_STATUS_UNBONDED",
          "jailed": true,
          "tombstoned": false,
          "jailed_since": "2023-01-18T21:13:47.890665842Z"
        },
        {
          "valoper_address": "starsvaloper1j2kze4ak0dtkywa9zghreptvnyucg7ewqrnp45",
          "commission_rate": "0.100000000000000000",
          "delegator_shares": "10178833308.606132195306505104",
          "voting_power": "10177815525",
          "score": "0.000000000000000000",
          "status": "BOND_STATUS_UNBONDED",
          "jailed": true,
          "tombstoned": false,
          "jailed_since": "2023-01-18T21:13:47.890665842Z"
        },
        {
          "valoper_address": "starsvaloper1jsvf0xw69yuw57cwe5kyvuaadcntx8cwhmv9zr",
          "commission_rate": "0.050000000000000000",
          "delegator_shares": "310523760.000000000000000000",
          "voting_power": "310492760",
          "score": "0.000000000000000000",
          "status": "BOND_STATUS_UNBONDED",
          "jailed": true,
          "tombstoned": false,
          "jailed_since": "2023-01-18T21:13:47.890665842Z"
        },
        {
          "valoper_address": "starsvaloper1jt9w26mpxxjsk63mvd4m2ynj0af09cslura0ec",
          "commission_rate": "0.050000000000000000",
          "delegator_shares": "50040319291812.000000000000000000",
          "voting_power": "50040319291812",
          "score": "0.000000000000000000",
          "status": "BOND_STATUS_BONDED",
          "jailed": false,
          "tombstoned": false,
          "jailed_since": "0001-01-01T00:00:00Z"
        },
        {
          "valoper_address": "starsvaloper1p2sffxw9rl2w6zgf5p3n62jdd4lfps8er7trec",
          "commission_rate": "0.050000000000000000",
          "delegator_shares": "9908943333.390685610767116448",
          "voting_power": "9907952535",
          "score": "0.000000000000000000",
          "status": "BOND_STATUS_UNBONDED",
          "jailed": true,
          "tombstoned": false,
          "jailed_since": "2023-01-27T08:29:01.161699609Z"
        },
        {
          "valoper_address": "starsvaloper1p4tn8y546u0kvg52vmkewawmndkjmdg2dqknyj",
          "commission_rate": "0.100000000000000000",
          "delegator_shares": "12012869285.000000000000000000",
          "voting_power": "12012869285",
          "score": "0.000000000000000000",
          "status": "BOND_STATUS_BONDED",
          "jailed": false,
          "tombstoned": false,
          "jailed_since": "0001-01-01T00:00:00Z"
        },
        {
          "valoper_address": "starsvaloper1q48vyzzz82kh9sn2zsslna3mhujx70s7yg5jzf",
          "commission_rate": "0.050000000000000000",
          "delegator_shares": "50007922895823.000000000000000000",
          "voting_power": "50007922895823",
          "score": "0.000000000000000000",
          "status": "BOND_STATUS_BONDED",
          "jailed": false,
          "tombstoned": false,
          "jailed_since": "0001-01-01T00:00:00Z"
        },
        {
          "valoper_address": "starsvaloper1tmngt23kq392tyfahlret9qasqk0kn66y504lm",
          "commission_rate": "0.050000000000000000",
          "delegator_shares": "22022699657.000000000000000000",
          "voting_power": "22022699657",
          "score": "0.000000000000000000",
          "status": "BOND_STATUS_BONDED",
          "jailed": false,
          "tombstoned": false,
          "jailed_since": "0001-01-01T00:00:00Z"
        }
      ],
      "aggregate_intent": [
      ],
      "multi_send": false,
      "liquidity_module": false,
      "withdrawal_waitgroup": 10,
      "ibc_next_validators_hash": "sGt1GtCrlKCDMTIinv0lQ74WSKboDPnSzYND1/Rug1M=",
      "validator_selection_allocation": "0",
      "holdings_allocation": "0",
      "last_epoch_height": "0",
      "tvl": "0.000000000000000000",
      "unbonding_period": "1209600000000000",
      "decimals": "6",
      "unbonding_enabled": true,
      "deposits_enabled": true,
      "return_to_sender": false
    },
  label: 'STARS',
  image: ''
})} > Update Dropdown </button>
      { isModalOpen && <Backdrop />}
 
  </div>
</nav>
        )

      
    
}
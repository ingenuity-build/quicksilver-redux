import React , { useEffect } from "react"
// import the redux hook

import { useDispatch, useSelector } from 'react-redux'
import './NetworkSelection.css';

import {increaseStakingStep} from '../../../slices/stakingActiveStep';


import { networksSelector, fetchNetworks } from '../../../slices/networks'	;
import { selectedNetworkSelector, setSelectedNetwork, setSelectedNetworkFunc } from "../../../slices/selectedNetwork";
import { setNetworkAddress,  setNetworkWallet, setNetworkBalance, selectedNetworkWalletSelector, setClient } from "../../../slices/selectedNetworkWallet";
import { _loadValsAsync } from "../../../slices/validatorList";
import Select from "react-select";
import { initKeplrWithNetwork } from "../../../utils/chains";
import { SigningStargateClient } from "@cosmjs/stargate";
import { getKeplrFromWindow } from '@keplr-wallet/stores';


export default function NetworkSelection() {
    const dispatch = useDispatch()
    const { networks, loading, hasErrors } = useSelector(networksSelector);
    const {selectedNetwork} = useSelector(selectedNetworkSelector);
   const {networkAddress} = useSelector(selectedNetworkWalletSelector);


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

    
    
      const connectNetwork = async (network: string) => {

        initKeplrWithNetwork(async (key: string, val: SigningStargateClient) => {
         // @ts-expect-error
         dispatch(setNetworkWallet(key, val))

          // @ts-expect-error
          dispatch(setClient(val));
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
        }, network);
      }
    

   
    // console.log('Networks: ', networks);	


  let handleNetworkChange = (selected: any) => {
    console.log(selected);
    // @ts-expect-error
        dispatch(setSelectedNetworkFunc(selected));
        
  }

  let onNext = () => {
        // @ts-expect-error
    dispatch(increaseStakingStep());
  }

  let fetchValidators = (chainId: string) => {

    // @ts-expect-error
        dispatch(_loadValsAsync(chainId));
        
  }
    return (
        <>
    {/* <h1>Network Selection </h1> 
    <Select className="custom-class mb-3"
        //   defaultValue={{ label: selectedNetwork.account_prefix ? selectedNetwork.account_prefix?.charAt(0).toUpperCase() + selectedNetwork.account_prefix?.slice(1) : '' }}
          options={networks}
          onChange={handleNetworkChange}

        />
        <p>{selectedNetwork.local_denom}</p>
        <p>{selectedNetwork.base_denom}</p>
        <button onClick={() => fetchValidators(selectedNetwork.chain_id)}> LOAD VALIDATOR LIST </button> */}
        <div className="network-selection-pane d-flex flex-column align-items-center ">

{selectedNetwork !== "Select a network" &&  <div className="wallet-details d-flex flex-column mt-5">
  <h4> My Wallet</h4>
  {networkAddress && <h6>Network Address: {networkAddress}</h6>}
  <div className="row wallet-content mt-4">
    <div className="col-3 text-center">
      {/* <h5 className="font-bold">{networkBalance / 1000000}</h5> */}
      {/* <p> {props.selectedNetwork.base_denom.substring(1)} </p> */}
     {selectedNetwork.base_denom && <p> {selectedNetwork.base_denom.charAt(1).toUpperCase() + selectedNetwork.base_denom.slice(2)}</p>}
    </div>
    <div className="col-3 text-center">
      {/* <h5 className="font-bold">{networkQBalance / 1000000}</h5> */}
      {selectedNetwork.local_denom && <p> {selectedNetwork.local_denom[1] + selectedNetwork.local_denom.charAt(2).toUpperCase() + selectedNetwork.local_denom.slice(3)}</p>}
      {/* <p> {props.selectedNetwork.local_denom.substring(1)} </p>  */}
    </div>

  </div>
</div>}
<div className="text-center">
  <h2 className="mt-4">Choose your network </h2>



  <Select className="custom-class mb-3"
        //   defaultValue={{ label: selectedNetwork.account_prefix ? selectedNetwork.account_prefix?.charAt(0).toUpperCase() + selectedNetwork.account_prefix?.slice(1) : '' }}
          options={networks}
          onChange={handleNetworkChange}

        />
</div>

<div className="mt-5 button-container">

 {selectedNetwork?.base_denom && <button className={`stake-liquid-atoms-button mx-3 ${selectedNetwork === "Select a network" ? 'd-none' : ''}`} onClick={() => onNext()} > Stake {selectedNetwork?.base_denom?.substring(1).charAt(0).toUpperCase() + selectedNetwork?.base_denom?.slice(2)} </button>}
  {selectedNetwork.liquidity_module  && <button className={`stake-existing-delegations-button mx-3 ${selectedNetwork === "Select a network" ? 'd-none' : ''}`} > Stake Existing Delegations </button>}

</div>

{!selectedNetwork.liquidity_module && <p className={`mt-4 ${selectedNetwork === "Select a network" ? 'd-none' : ''}`}> Transfer of delegation isn't enabled on this network </p>}

</div>


    </>

    )
}
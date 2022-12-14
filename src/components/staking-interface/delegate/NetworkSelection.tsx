import React , { useEffect, useState } from "react"
// import the redux hook

import { useDispatch, useSelector } from 'react-redux'
import './NetworkSelection.css';

import {increaseStakingStep} from '../../../slices/stakingActiveStep';


import { networksSelector, fetchNetworks } from '../../../slices/networks'	;
import { selectedNetworkSelector, setSelectedNetwork, setSelectedNetworkFunc } from "../../../slices/selectedNetwork";
import { setNetworkAddress,  setNetworkWallet, setNetworkBalance, selectedNetworkWalletSelector, setClient } from "../../../slices/selectedNetworkWallet";
import {quicksilverSelector} from '../../../slices/quicksilver';
import { validatorListSelector } from "../../../slices/validatorList";


export default function NetworkSelection() {
    const dispatch = useDispatch()
    const { networks, hasErrors } = useSelector(networksSelector);
    const {selectedNetwork} = useSelector(selectedNetworkSelector);
   const {networkAddress, networkBalances} = useSelector(selectedNetworkWalletSelector);
   const {balances} = useSelector(quicksilverSelector);
  const {validatorList} = useSelector(validatorListSelector);
  const [QCKBalance, setQCKBalance] = useState(0);
  const [zoneBalance, setZoneBalance] = useState(0);
  const initialText = 'Copy';
  const [buttonText, setButtonText] = useState(initialText);
  const [loadingValidators, setLoadingValidators] = useState(true);
  function handleClick() {
   navigator.clipboard.writeText(networkAddress)
   setButtonText('Address copied');
   setTimeout(() => {
    setButtonText(initialText);
  }, 2000); // 👈️ change text back after 1 second
  }

  useEffect(() => {
    if(balances !== []) {
         let balance = balances.find((bal: any) => bal.denom === selectedNetwork.local_denom);
         if(balance) {
          console.log(balance)
          setQCKBalance((balance.amount)/1000000);
         } else 
          {
            setQCKBalance(0);
          }
          
    }

}, [balances, selectedNetwork])

useEffect(() => {
  if(validatorList.length > 0) {
    setLoadingValidators(false);
  }
}, [validatorList])

useEffect(() => {

  if(networkBalances !== []) {
    let balance = networkBalances.find((bal: any) => bal.denom === selectedNetwork.base_denom);
    if(balance) {
     setZoneBalance((balance.amount)/1000000);
    } 
 
}
}, [networkBalances, selectedNetwork])

  let onNext = () => {
        // @ts-expect-error
    dispatch(increaseStakingStep());
  }


    return (
        <>

        <div className="network-selection-pane d-flex flex-column align-items-center ">


        {selectedNetwork === "Select a network" && <div className="text-center">
  <h2 className="mt-4">Choose your network </h2>
      <p className="mt-2">Choose the network from the dropdown in the Navbar</p> 
</div>}
{hasErrors && <p> There's an issue with fetching the network list. Please try again.</p>}
{selectedNetwork !== "Select a network" && networkAddress !== '' && <div className="wallet-details d-flex flex-column mt-5">
  <h4> My Wallet</h4>
  {networkAddress && <h6> {networkAddress} <button className="mx-2 copy-button"
  onClick={handleClick}
  >
  {buttonText}
</button></h6>}
  <div className="row wallet-content mt-4">
    <div className="col-3 text-center">
    {zoneBalance && <h5 className="font-bold">{zoneBalance}</h5>}
     {selectedNetwork.base_denom && <p> {selectedNetwork.base_denom.slice(1).toUpperCase()}</p>}
    </div>
    <div className="col-3 text-center">
    <h5 className="font-bold">{QCKBalance}</h5>
     
      {selectedNetwork.local_denom && <p> {selectedNetwork.local_denom[1] + selectedNetwork.local_denom.slice(2).toUpperCase()}</p>}
      {}
    </div>

  </div>
</div>}


<div className="mt-5 button-container">
{selectedNetwork !== "Select a network" && networkAddress !== '' &&   <p className={loadingValidators ? 'visible text-center' : 'invisible'}> Loading Validators...</p>}
 {selectedNetwork?.base_denom && <button className={`stake-liquid-atoms-button mx-3 ${selectedNetwork === "Select a network" ? 'd-none' : ''}`} onClick={() => onNext()} > Stake {selectedNetwork?.base_denom?.slice(1).toUpperCase()} </button>}
  {selectedNetwork.liquidity_module  && <button className={`stake-existing-delegations-button mx-3 ${selectedNetwork === "Select a network" ? 'd-none' : ''}`} > Stake Existing Delegations </button>}

</div>
{/* {!selectedNetwork.liquidity_module && <p className={`mt-4 ${selectedNetwork === "Select a network" ? 'd-none' : ''}`}> Transfer of delegation isn't enabled on this network </p>} */}

</div>


    </>

    )
}
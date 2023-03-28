import React from 'react';
import './ConnectWallet.css';
import {  setModalOpen } from '../../../slices/connectWalletModal';
import { useDispatch, useSelector } from 'react-redux'

import { networksSelector, fetchNetworks } from '../../../slices/networks'	;
import { useEffect } from 'react';
import { selectedNetworkSelector, setSelectedNetwork, setSelectedNetworkFunc } from "../../../slices/selectedNetwork";
import { setQSWalletConnected} from '../../../slices/quicksilver';
import { increaseStakingStep } from "../../../slices/stakingActiveStep";
export default function ConnectWallet(props: any) {
  const dispatch = useDispatch()
  const { networks, loading, hasErrors } = useSelector(networksSelector);
  const onButtonClick = (network) => {
                   // @ts-expect-error
                   dispatch(increaseStakingStep());
      // @ts-expect-error
         if(!JSON.parse(localStorage.getItem('ChainId'))) {
    // @ts-expect-error
  dispatch(setModalOpen());
  // @ts-expect-error
  dispatch(setSelectedNetworkFunc(network));
         } else {
          props.connectKeplr()
            // @ts-expect-error
    dispatch(setSelectedNetworkFunc(network));
         }
  

}
useEffect(() => {
  // @ts-expect-error
  if(JSON.parse(localStorage.getItem('ChainId'))) {
    props.connectKeplr();

  }
  // @ts-expect-error
    dispatch(fetchNetworks())


  }, [])

  return ( 
    <>
        <div className="connect-wallet-pane d-flex flex-column align-items-center ">
                {/* <h1 className=" sub-heading"> Connect Your Wallet To Get Started. </h1> */}
            
                {networks.map((network: any) => 
                <>
                  <button  onClick={() => onButtonClick(network)} className="connect-wallet-button mt-5"><span><img src={network.image}/></span> {network.label} {parseFloat(network.value?.redemption_rate).toFixed(4)}</button> </>

                )}
              
                {/* <h4 className="sub-heading"> Deposits will be enabled soon. Stay tuned. </h4> */}
                </div>
    </>
  )
}
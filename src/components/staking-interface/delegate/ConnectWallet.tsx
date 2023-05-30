import React from 'react';
import './ConnectWallet.css';
import {  setModalOpen } from '../../../slices/connectWalletModal';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { networksSelector, fetchNetworks } from '../../../slices/networks'	;
import { useEffect } from 'react';
import { selectedNetworkSelector, setSelectedNetwork, setSelectedNetworkFunc } from "../../../slices/selectedNetwork";
import { setQSWalletConnected} from '../../../slices/quicksilver';
import { increaseStakingStep } from "../../../slices/stakingActiveStep";
import Question from '../../../assets/icons/question-mark.svg';
import { Tooltip as ReactTooltip} from "react-tooltip";
export default function ConnectWallet(props: any) {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { networks, loading, hasErrors } = useSelector(networksSelector);
  const onButtonClick = (network) => {
    navigate('/stake/delegate')
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
        <div className="connect-wallet-pane d-flex flex-column align-items-center">
                {/* <h3 className=" sub-heading"> Choose a Network </h3> */}
                <h5 className="sub-heading w-50 text-center">The Quicksilver chain is undergoing an upgrade at 1100 UTC. The front end will be disabled until the upgrade is completed.
</h5>
              
                {/* <h4 className="sub-heading"> Deposits will be enabled soon. Stay tuned. </h4> */}
                </div>
    </>
  )
}
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
                <h3 className=" sub-heading"> Choose a Network </h3>
                <div className="mt-3 mb-5 networks w-75">
                  <div className="row">
                {networks.map((network: any) => 
                <>
                  {/* <button  onClick={() => onButtonClick(network)} className="connect-wallet-button mt-5"><span><img src={network.image}/></span> {network.label} {parseFloat(network.value?.redemption_rate).toFixed(4)} {network?.apy * 100}</button> </> */}
                         <div className="col-6" onClick={ () => onButtonClick(network)}>
                          <div className="network-card m-3">
                         <div className="d-flex align-items-start"> 
                              {/* <img alt="Validator Icon" src={row.logo ? row.logo : Icon}/> */}
                        <div className="card-details  w-100 row d-flex align-items-center">
                          <div className="col-3 pl-1">  <img className="network-image" src={network.image} alt={'Logo'}></img></div>
                        <div className="col-9"> 
                        <h4 className="p-2 text-center font-bold"> {network.label} </h4>
                        <div className="row">
                          <div className="col-6">
                      
                      
                           <h5 className="text-center font-bold">{parseFloat(network.value?.redemption_rate).toFixed(4)}</h5>
                           <p className="text-center">Redemption Rate</p>
                          </div>
                  <div className="col-6">
                  <h5 className="text-center font-bold">{ (network.apy * 100).toFixed(2)} %</h5>
                           <p className="text-center">Quicksilver APY <span><img id={network.label}  className="question"  src={Question}/></span></p>
                           <ReactTooltip
        anchorId={network.label}
        place="bottom"
        content={`Quicksilver autocompounds staking rewards. APY is accrued by an increase in the value of ${network.value.local_denom[1] + network.value.local_denom.slice(2).toUpperCase()} relative to ${network.value.base_denom.slice(1).toUpperCase()} (redemption rate). Total ${network.value.local_denom[1] + network.value.local_denom.slice(2).toUpperCase()} in the wallet does not change.`}
      />
                  </div>
                     
                        
                        </div>
                           
                           </div>
                      
                        
            
                         {/* <h4 className="font-bold">  Reward </h4> */}
                         </div>
                         </div>
                         </div>
                     </div>
                  </>
                )}
                </div>
               </div>
              
                <h6 className="zone-message"> Cosmos Hub deposits will be enabled soon. Stay tuned. </h6>
                </div>
    </>
  )
}
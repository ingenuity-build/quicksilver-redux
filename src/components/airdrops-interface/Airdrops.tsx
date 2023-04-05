import { useEffect, useState } from "react";
import React from 'react';
import './Airdrops.css';
import { useSelector, useDispatch } from 'react-redux'
import {airdropsSelector, fetchStargazeAirdropAllocation} from '../../slices/airdrops';
import { networksSelector, fetchNetworks } from '../../slices/networks'

export default function Airdrop() {
  const [address, setAddress] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const handleChange = (e) => setAddress(e.target.value);
  const [unbondingSum, setUnbondingSum] = useState(0);
  const dispatch = useDispatch();
    const { amount, error } = useSelector(airdropsSelector);
    const { networks, loading, hasErrors } = useSelector(networksSelector);




  useEffect(() => {

    // @ts-expect-error
      dispatch(fetchNetworks())
  
  
    }, [])

    return (
        <>
 <div className="assets-interface row mx-0 w-100">
          <div className="mt-3 mb-5 networks w-75 justify-content-center m-auto">
                  <div className="row">
                    <h2 className="mt-5 text-center mb-4">Airdrops</h2>
                {networks.map((network: any) => 
                <>
                  {/* <button  onClick={() => onButtonClick(network)} className="connect-wallet-button mt-5"><span><img src={network.image}/></span> {network.label} {parseFloat(network.value?.redemption_rate).toFixed(4)} {network?.apy * 100}</button> </> */}
                         <div className={`col-6 ${network.value.local_denom === 'uqstars' ? 'order-1' : (network.value.local_denom === 'uqatom' ? 'order-2' :  network.value.local_denom === 'uqregen' ? 'order-3' : 'order-4')}`}>
                          <div className="network-card m-3">
                         <div className="d-flex align-items-start"> 
                              {/* <img alt="Validator Icon" src={row.logo ? row.logo : Icon}/> */}
                        <div className="card-details  w-100 row d-flex align-items-center">
                          <div className="col-4 pl-1">  <img className="network-image" src={network.image} alt={'Logo'}></img></div>
                        <div className="col-8"> 
                        <h4 className="p-2 text-center font-bold"> {network.label} </h4>
                        <div className="row">
                          <div className="col-12 text-center">
                      {network.value.local_denom !== 'uqstars' && <p> Coming Soon</p>}
                      {network.value.local_denom === 'uqstars' && <p> Airdrop delivered on <span className="font-bold">March 29, 2023 </span></p>}
                          
                          </div>
                  <div className="col-6">

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
      </div>
      </>
      )
}
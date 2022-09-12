import React from 'react';
import './Assets.css';
import {quicksilverSelector} from '../../slices/quicksilver';
import { useDispatch, useSelector } from 'react-redux'


export default function Assets() {
    const {balances, isQSWalletConnected} = useSelector(quicksilverSelector);
    return (
        <>
          <div className="assets-interface row mx-0">
        
<div className="col-8 mx-auto mt-5">
  <div className="participation-rewards">
    <div className="d-flex p-5 justify-content-around">
    <h3> Claim Participation Rewards </h3>
    <button > COMING SOON </button>
    </div>

  </div>
  <h3 className="mt-5">My Assets</h3> 
  <div className="mt-3 validators row w-100 justify-content-start">
  {balances.map((bal: any) =>
          <>
            <div className="asset-card col-3 m-3">
                <h4 className="font-bold"> {bal.amount/1000000}</h4>
                {bal.denom !== 'uqck' && <h6> {bal.denom[1] + bal.denom.charAt(2).toUpperCase() + bal.denom.slice(3)}</h6>}
                {bal.denom === 'uqck' && <h6> QCK</h6>}
            </div>
         
          </>
  
)}
</div>
</div>  

    </div>
    </>
    )

}



import React from 'react';
import './Assets.css';
import {quicksilverSelector} from '../../slices/quicksilver';
import { useDispatch, useSelector } from 'react-redux'
import QuicksilverLogo from '../../assets/quicksilver-logo.png';
import qStar from '../../assets/qStar.png';
import qAtom from '../../assets/qAtom.png';
import { Coin } from "@cosmjs/amino";

// const images = {
//   'uqck' : QuicksilverLogo,
//   'uqatom' : qAtom,
//   'uqstars' : qStar
// }

interface IImages {
  [index: string]: string;
}
var params = {} as IImages;

params['uqck'] = QuicksilverLogo; // okay
params['uqatom'] = qAtom;
params['uqstars'] = qStar
// var foo = params['heart']; // foo:string


export default function Assets() {
    const {balances, isQSWalletConnected} = useSelector(quicksilverSelector);
    return (
        <>
          <div className="assets-interface row mx-0">
        
<div className="col-8 mx-auto mt-5">
  <div className="participation-rewards">
    <div className="d-flex p-5 justify-content-between">
    <h3> Claim Participation Rewards </h3>
    <button > COMING SOON </button>
    </div>

  </div>
  <h3 className="mt-5">My Assets</h3> 
  {balances.length > 0 && <div className="mt-3 validators row w-100 justify-content-start">
  {balances.map((bal: Coin) =>
          <>
            <div className="asset-card col-3 m-3">
            <img className="d-block mx-auto" src={params[bal.denom]}/>
              <div className="d-flex mt-2 align-items-baseline justify-content-center">
        
                <h4 className="font-bold"> {+(bal.amount)/1000000}</h4>
                {bal.denom !== 'uqck' && <h6 className="text-center"> {bal.denom[1] + bal.denom.slice(2).toUpperCase()}</h6>}
                {bal.denom === 'uqck' && <h6 className="text-center"> QCK</h6>}
                </div>
               
            </div>

         
          </>
  
)}

</div>}
{balances.length === 0 && <div className="row w-100 justify-content-start">
  <h5 className="mt-5"> You currently do not have any assets on the quicksilver chain.</h5>
</div>}

</div>  

    </div>
    </>
    )

}



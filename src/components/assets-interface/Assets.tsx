import React, {useEffect, useState} from 'react';
import './Assets.css';
import {quicksilverSelector} from '../../slices/quicksilver';
import { useDispatch, useSelector } from 'react-redux'
import QuicksilverLogo from '../../assets/quicksilver-logo.png';
import qStar from '../../assets/qStar.png';
import qAtom from '../../assets/qAtom.png';
import { Coin } from "@cosmjs/amino";
import { QuickSilverChainInfo } from '../../utils/chains';
import { networksSelector } from '../../slices/networks';
import { quicksilver } from "quicksilverjs"
import { claimsSelector, fetchClaims } from '../../slices/claims';
import  {  claimRewardModalSelector, setModalOpen } from '../../slices/claimRewardModal';
import ClaimRewardModal from './ClaimRewardModal';
import { current } from '@reduxjs/toolkit';


const {
    submitClaim
} = quicksilver.participationrewards.v1.MessageComposer.withTypeUrl

interface IImages {
  [index: string]: string;
}
var params = {} as IImages;

params['uqck'] = QuicksilverLogo; // okay
params['uqatom'] = qAtom;
params['uqstars'] = qStar
// var foo = params['heart']; // foo:string

  let messages = []
 

export default function Assets() {
  const [sum, setsum] = useState<number>(0);
  const [claimsArray, setClaimsArray] = useState([]);
  const [claims, setClaims] = useState({})
  const [showAssets, setShowAssets] = useState(true);
  const dispatch = useDispatch();
  const {balances, isQSWalletConnected, quicksilverClient, quicksilverAddress} = useSelector(quicksilverSelector);
  const { networks } = useSelector(networksSelector);
  const {previousEpochMessages, existingClaims, previousEpochAssets, currentEpochAssets} = useSelector(claimsSelector)
  const {isModalOpen} = useSelector(claimRewardModalSelector)
        let obj = {};
      

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchClaims(quicksilverAddress))
    if(!sum) {
  fetchSum();
    }


  }, [balances, networks])


  useEffect(() => {
    if(existingClaims !== []) {
  
existingClaims.forEach((claim) => {
  // obj[claim.chain_id] = (obj[claim.chain_id]['total'] || obj[claim.chain_id]['total']) + parseInt(claim.amount);
if(obj[claim.chain_id]) {
  obj[claim.chain_id]['total'] = obj[claim.chain_id]['total'] + parseInt(claim.amount)
} else {
  obj[claim.chain_id] = { total : parseInt(claim.amount)}
}
    })
    displayClaims(obj)
  }



}, [existingClaims])

useEffect(() => {
    if(currentEpochAssets) {
    let obj = {}
    let values = Object.values(currentEpochAssets);
    values.forEach((asset:any) => {

      asset.forEach((asset1: any) => {
        asset1["Amount"].forEach((asset2: any) => {
        obj[asset2.denom] = (obj[asset2.denom] || 0 ) + parseInt(asset2.amount)
        })
       
      })
    })
    console.log('Current Assets', obj);
    }
}, [currentEpochAssets])

const displayClaims =  (obj: any) => {
 // {"quickgaia-1": "1234", "quickstar-1": "5645"}
  let obj1 = {...obj}
  Object.keys(obj).map((x: any) => {
    let network = networks.find((network: any) => network.value.chain_id === x).value;
      obj1 = {...obj1, [x]: {...obj1[x], "denom": network?.local_denom, "prefix": network?.account_prefix}}
  })
  for (const key in obj1) {
    if (obj1.hasOwnProperty(key)) {
      // console.log(`${key}: ${population[key]}`);
    }
  }
  // @ts-ignore
  setClaimsArray(Object.keys(obj1));
  setClaims(obj1);



}





  const fetchSum =  () => {

    QuickSilverChainInfo.currencies.forEach(async (curr) => {
      
      try {

      let amount;
      const res = await fetch(`https://api.coingecko.com/api/v3/coins/${curr.coinGeckoId}?tickers=false`);
      const data = await res.json();
      amount = data.market_data.current_price.usd;
      if(amount === undefined && curr.coinGeckoId === 'quicksilver') {
         amount = 0.5;
      }
      // console.log(amount);
      fetchData(curr.coinMinimalDenom, amount);
  
    
      } 
      catch(err) {
        console.log(err)
      }
    }
    )
  }



  const onClaimsClick = async (e: any) => {

        // @ts-expect-error
  dispatch(setModalOpen());
  
}




  const fetchData = (id: any, amount: number) => {
    // console.log(id, amount)
    let balance: number = +(balances.find((bal: any) => bal.denom === id)?.amount)/1000000;
          if(id !== 'uqck') {
           let network  = networks.find((y:any) => y.value.local_denom === id); 
           let redemptionRate : number = +(network?.value.redemption_rate);

            if(network && redemptionRate && balance && amount) {
           setsum((prev) => +prev + (amount * balance * redemptionRate))
            }
          }
          if(id === 'uqck' && amount && balance) {
            setsum((prev) => +prev + (amount * balance))
            
          }
      }

    return (
        <>
              {!isQSWalletConnected && <div>
          <div className="connect-wallet-pane d-flex flex-column align-items-center ">
                <h4 className="sub-heading"> Hey there! </h4>
                <h1 className="mt-3"> Connect your wallet to get started! </h1>
                <button  className="connect-wallet-button mt-5"> Connect Wallet </button>
                </div>
        </div>}
         {isQSWalletConnected && <div className="assets-interface row mx-0">
          {showAssets && <div className="col-8 mx-auto mt-5">
<div className="participation-rewards">
    <div className="d-flex p-5 justify-content-between">
    <h3> Claim Participation Rewards </h3>
    <button onClick={onClaimsClick}> Claim </button>
    {isModalOpen && <ClaimRewardModal/>}
    </div>
  
  </div>
  <h3 className="mt-5">My Assets</h3> 
  {sum === 0 && <h5 className="mt-4">Calculating...</h5>}
   {sum !==0 && <h5 className="mt-4"><span className="amount">$ {sum.toFixed(4)} </span>in {balances.length} assets across quicksilver chain</h5>}
  {balances.length > 0 && <div className="mt-3 validators row w-100 justify-content-start">
  {balances.map((bal: Coin, i: number) =>
       
            <div className="asset-card col-3 m-3" key={i}>
     
            <img className="d-block mx-auto" src={params[bal.denom]}/>
              <div className="d-flex mt-2 align-items-baseline justify-content-center">
        
                <h4 className="font-bold"> {(+(bal.amount)/1000000).toFixed(2)}</h4>
                {bal.denom !== 'uqck' && <h6 className="text-center mx-2"> {bal.denom[1] + bal.denom.slice(2).toUpperCase()}</h6>}
                {bal.denom === 'uqck' && <h6 className="text-center mx-2"> QCK</h6>}
                </div>
      
            </div>

         
    


)}

</div>}
{balances.length === 0 && <div className="row w-100 justify-content-start">
  <h5 className="mt-5"> You currently do not have any assets on the quicksilver chain.</h5>
</div>}
{existingClaims.length === 0 &&  <h5>You do not have any existing claims yet</h5>}
{existingClaims.length !==0 &&  <div>
   <h3 className="mt-4">Existing Claims</h3>
   {/* {claimsArray.forEach((claim) => {
    return<p>There are {${claims[claim]} ${claim}`}</p>
})} */}
  <div className="mt-3 claims row w-100 justify-content-startr">
  {claimsArray.map((claim) => 
  <>
                <div  className={`claim-card col-3 m-3`}>
                <div className="d-flex align-items-start"> 
               <div className="card-details">
               <img className="d-block mx-auto" src={params[claims[claim]['denom']]}/>
                <h5> {+(claims[claim]['total']/1000000).toFixed(2)} <span>{claims[claim]['denom']} </span> </h5>
                <h5>  {claims[claim]['prefix']}</h5>
                </div>
                </div>
            </div>
         
          </>
     )}
</div>

      <h6> Something missing? Try claiming again...</h6>
      <button className="mb-4" onClick={onClaimsClick}> Claim</button>
    </div>}
</div>  }
{!showAssets && <div className="col-12 max-auto mt-5">
  <div className="mt-5 d-flex justify-content-center align-items-center">
    <h4 className="text-center"> Coming Soon!</h4>
    </div>
  </div>}
 
    </div>}
    </>
    )

}



import React, {useEffect, useState} from 'react';
import './Assets.css';
import {quicksilverSelector} from '../../slices/quicksilver';
import { useDispatch, useSelector } from 'react-redux'
import QuicksilverLogo from '../../assets/quicksilver-logo.png';
import qStar from '../../assets/qStar.png';
import qAtom from '../../assets/qAtom.svg';
import qOsmo from '../../assets/qOsmo.svg';
import qJuno from '../../assets/qJuno.svg';
import { Coin } from "@cosmjs/amino";
import { QuickSilverChainInfo } from '../../utils/chains';
import { networksSelector } from '../../slices/networks';
import { quicksilver } from "quicksilverjs"
import env from "react-dotenv";
import {  setModalOpen } from '../../slices/connectWalletModal';

const {
    submitClaim
} = quicksilver.participationrewards.v1.MessageComposer.withTypeUrl

interface IImages {
  [index: string]: string;
}
var params = {} as IImages;

params['uqck'] = QuicksilverLogo; // okay
params['uqatom'] = qAtom;
params['uqstars'] = qStar;
params['uqjunox'] = qJuno;
params['uqjuno'] = qJuno;
params['uqosmo'] = qOsmo;


  let messages = []


export default function Assets() {
  const dispatch = useDispatch();
  const [sum, setsum] = useState<number>(0);
  const [showAssets, setShowAssets] = useState(true);

  const {balances, isQSWalletConnected, quicksilverClient, quicksilverAddress} = useSelector(quicksilverSelector);
  const { networks, hasErrors } = useSelector(networksSelector);
  const [denomArray, setDenomArray] = useState<Array<string>>([])

  // useEffect(() => {
  //   if(isQSWalletConnected && networks) {
  //   let denomArray : Array<string> = [];
  //   networks.forEach((network: any) => denomArray.push(network.value.local_denom));
  //   denomArray.push('uqck');
  //   setDenomArray(denomArray);
  //   if(!sum) {
  // fetchSum();
  //   }
  // }
  //   // if(messages.length == 0) {
  //   //   queryXccLookup();
  //   // }

  // }, [balances])

  const onButtonClick = () => {
    // @ts-expect-error
  dispatch(setModalOpen());
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

  const queryXccLookup = async () => {

      try {

      const res = await fetch(`https://claim.${env.NODE_ENV}.quicksilver.zone/${quicksilverAddress}/epoch`);
      const data = await res.json();
        messages = data.messages;
        // update assets
      } 
      catch(err) {
        console.log(err)
      }
  }

 
  // const maps : any = { 
  //   'cosmos': 'uqatom', 'stargaze': 'uqstars', 'quicksilver': 'uqck'
  // }
  const onClaimsClick = async (e: any) => {

    if (messages.length == 0) {
      alert("nope!")
      return
    }

    let msg = [];
    // @ts-ignore
      // msg = messages.map((message: any) => { return {
      //   typeUrl: "/quicksilver.participationrewards.v1.MsgSubmitClaim",
      //   value: message}
      // });

      //msg = messages.map((message: quicksilver.participationrewards.v1.MsgSubmitClaim) => { return submitClaim({claimType: message.claim_type, Proofs: message.proofs, SrcZone: message.src_zone, UserAddres: message.user_address, Zone: message.zone}) })
      msg = messages.map((message: quicksilver.participationrewards.v1.MsgSubmitClaim) => { return {
      typeUrl: "/quicksilver.participationrewards.v1.MsgSubmitClaim",
      value: {
        userAddress: message.user_address,
        zone: message.zone,
        srcZone: message.src_zone,
        claimType: message.claim_type,
        proofs: message.proofs.map((proof: any) => {
          return {
              key: proof.key,
              data: proof.data,
              proofOps: proof.proof_ops,
              proofType: proof.proof_type,
              height: proof.height,
          }
        })
              }}
            });

    
    // const msgAny = {
    //     typeUrl: "/quicksilver.participationrewards.v1.MsgSubmitClaim",
    //   value: messages.map((e: any) => 
    // }
    
    try {

   const broadcastResult = await quicksilverClient.signAndBroadcast(
    quicksilverAddress,
      [...msg],
     {
        "gas": "400000",
        "amount": [
          {
            "denom": "umuon",
            "amount": "300"
          }
        ]
      },
      'Claims Transaction'
    );  
    console.log(broadcastResult);
    if(broadcastResult.code === 0 ) {

    }
} catch(err: any) {

  console.log(err);

}
}

  const fetchData = (id: any, amount: number) => {
    console.log(id, amount)
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
          // if(x.denom !== 'uqck') {
          //     network = networks.find((y:any) => y.value.local_denom == x.denom); 
          //     // @ts-expect-error
          //     calc = +(x.amount)/1000000 * +(network?.value.redemption_rate);
              
          //     // id = cosmos, uqatom , stargaze: uqstars
          // } else if (x.denom === 'uqck' && id === 'quicksilver') {
          //   console.log('bye')
          //   setsum((prevSum) => prevSum + (amount * (+(x.amount)/1000000)))
          // } 
      }

    return (
       <>
        {!isQSWalletConnected && <div>
          <div className="assets-interface row mx-0">
          <div className="connect-wallet-pane d-flex flex-column align-items-center ">
                {/* <h4 className="sub-heading"> Hey there! </h4>
                <h1 className="mt-3"> Connect your wallet to get started! </h1>
                <button  onClick={onButtonClick}  className="connect-wallet-button mt-5"> Connect Wallet </button>  */}
                       <h4 className="sub-heading"> Assets screen will be enabled soon. Stay tuned.</h4>
                </div>
            </div>
           
        </div>}
       {isQSWalletConnected && <div>
          <div className="assets-interface row mx-0">
          {showAssets && <div className="col-8 mx-auto mt-5">
<div className="participation-rewards">
    <div className="d-flex p-3 justify-content-center flex-column">
    <h3> Claim Participation Rewards </h3>
    <p className="coming-soon"> Coming soon</p>
    {/* <button onClick={onClaimsClick}> Claim </button> */}
    <p>
    Participation Rewards are QCK token emissions that will reward Protocol users for delegating to decentralized, performant validators that are active in governance.
<br/> <br/>
These rewards will be distributed on an epochly basis (every 3 days).
    </p>
    <button> Claim</button>
    </div>

  </div>
  <h3 className="mt-5">My Assets</h3> 
  {/* {sum === 0 && <h5 className="mt-4">Calculating...</h5>} */}
  {hasErrors && <p> There's an issue with fetching the network list. Please try again.</p>}
   {/* {sum !==0 && <h5 className="mt-4"><span className="amount">$ {sum.toFixed(4)} </span>in {balances.length} assets across Quicksilver chain</h5>} */}
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
  <h5 className="mt-5"> You currently do not have any assets on the Quicksilver chain.</h5>
</div>}

</div>  }
{!showAssets && <div className="col-12 max-auto mt-5">
  <div className="mt-5 d-flex justify-content-center align-items-center">
    <h4 className="text-center"> Coming Soon!</h4>
    </div>
  </div>}

      </div>
      </div>}
    </>

    )

}



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
  const [showAssets, setShowAssets] = useState(true);
  const dispatch = useDispatch();
  const {balances, isQSWalletConnected, quicksilverClient, quicksilverAddress} = useSelector(quicksilverSelector);
  const { networks } = useSelector(networksSelector);
  const {previousEpochMessages, existingClaims, previousEpochAssets} = useSelector(claimsSelector)
  const {isModalOpen} = useSelector(claimRewardModalSelector)
        let obj = {};
      

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchClaims(quicksilverAddress))
    if(!sum) {
  fetchSum();
    }

    // if(messages.length == 0) {
    // queryXccLookup();
    // }

  }, [balances, networks])


  useEffect(() => {
    if(existingClaims !== []) {
  
existingClaims.forEach((claim) => {
  // obj[claim.chain_id] = (obj[claim.chain_id]['total'] || obj[claim.chain_id]['total']) + parseInt(claim.amount);
if(obj[claim.chain_id]) {
  obj[claim.chain_id]['total'] = obj[claim.chain_id]['total'] + parseInt(claim.amount)
} else {
  obj[claim.chain_id] = { total : 0}
}
    })
    console.log(obj)
    displayClaims(obj)
  // @ts-ignore
    // setClaimsArray(Object.entries(obj));
    // console.log('claimsarray', claimsArray)
    
  }
}, [existingClaims])

const displayClaims =  (obj: any) => {
 // {"quickgaia-1": "1234", "quickstar-1": "5645"}
  let obj1 = {...obj}
  Object.keys(obj).map((x: any) => {
    let network = networks.find((network: any) => network.value.chain_id === x).value;
      obj1 = {...obj1, [x]: {...obj1[x], "denom": network?.local_denom, "prefix": network?.account_prefix}}
  })
  console.log(obj1);
  return 'hey';
}

//   let obj = {};
// existingClaims.forEach((claim) => {
//   obj[claim.chain_id] = (obj[claim.chain_id] || 0) + parseInt(claim.amount);
// });
// console.log(obj);


// let assets = previousEpochAssets["quickosmo-1"];
let assets = {"quickosmo-1": [{"Type": "osmosispool",
"Amount": [{"denom": "uqatom",
"amount": "72000"
},
{"denom": "uqstars",
"amount": "170570"
}
]
},
{"Type": "liquid",
"Amount": [{"denom": "uqatom",
"amount": "243999"
},
{"denom": "uqstars",
"amount": "165731"
}
]
}
],
"quickgaia-1": [{"Type": "osmosispool",
"Amount": [{"denom": "uqatom",
"amount": "72000"
},
{"denom": "uqstars",
"amount": "170570"
}
]
},
{"Type": "liquid",
"Amount": [{"denom": "uqatom",
"amount": "243999"
},
{"denom": "uqstars",
"amount": "165731"
}
]
}
]
}
// console.log(Object.keys(assets))
// Object.keys(assets).forEach((asset) => {
//   asset["Amount"].forEach((asset) => { 
//     obj[asset.denom] = (obj[asset.denom] || 0 ) + parseInt(asset.amount)
//   })
// })
// console.log(obj)



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

  // const queryXccLookup = async () => {

  //     try {

  //     const res = await fetch(`https://claim.dev.quicksilver.zone/${quicksilverAddress}/epoch`);
  //     const data = await res.json();
  //       messages = data.messages;
  //       // update assets
  //     } 
  //     catch(err) {
  //       console.log(err)
  //     }
  // }

 
  // const maps : any = { 
  //   'cosmos': 'uqatom', 'stargaze': 'uqstars', 'quicksilver': 'uqck'
  // }
  const onClaimsClick = async (e: any) => {

        // @ts-expect-error
  dispatch(setModalOpen());
    // if (previousEpochMessages.length == 0) {
    //   alert("nope!")
    //   return
    // }

    // let msg = [];
    // // @ts-ignore
    //   // msg = messages.map((message: any) => { return {
    //   //   typeUrl: "/quicksilver.participationrewards.v1.MsgSubmitClaim",
    //   //   value: message}
    //   // });

    //   //msg = messages.map((message: quicksilver.participationrewards.v1.MsgSubmitClaim) => { return submitClaim({claimType: message.claim_type, Proofs: message.proofs, SrcZone: message.src_zone, UserAddres: message.user_address, Zone: message.zone}) })
    //   msg = previousEpochMessages.map((message: quicksilver.participationrewards.v1.MsgSubmitClaim) => { return {
    //   typeUrl: "/quicksilver.participationrewards.v1.MsgSubmitClaim",
    //   value: {
    //     userAddress: message.user_address,
    //     zone: message.zone,
    //     srcZone: message.src_zone,
    //     claimType: message.claim_type,
    //     proofs: message.proofs.map((proof: any) => {
    //       return {
    //           key: proof.key,
    //           data: proof.data,
    //           proofOps: proof.proof_ops,
    //           proofType: proof.proof_type,
    //           height: proof.height,
    //       }
    //     })
    //           }}
    //         });

    

    
//     try {

//    const broadcastResult = await quicksilverClient.signAndBroadcast(
//     quicksilverAddress,
//       [...msg],
//      {
//         "gas": "200000",
//         "amount": [
//           {
//             "denom": "umuon",
//             "amount": "300"
//           }
//         ]
//       },
//       'Claims Transaction'
//     );  
//     console.log(broadcastResult);
//     if(broadcastResult.code === 0 ) {

//     }
// } catch(err: any) {

//   console.log(err);

// }
}

const renderClaims = () => {
    const claims = claimsArray.map((claim: any) => {
    let network = networks.find((network: any) => network.value.chain_id === claim[0]).value;
    claim.push(network?.local_denom);
    claim.push(network?.account_prefix)

    return (
      <>
        <p className="mt-3">{ claim[3].toUpperCase()} {+(claim[1]/1000000)} {claim[2][1]  + claim[2].slice(2).toUpperCase()}  </p>
        <img className="d-block mx-auto" src={params[claim[2]]}/>
      </>

    )
    
  })

  return claims
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
          <div className="assets-interface row mx-0">
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
   <h5 className="mt-4">Existing Claims</h5>
      {/* {renderClaims()} */}
      {displayClaims(obj)}
      <h6> Something missing? Try claiming again...</h6>
      <button onClick={onClaimsClick}> Claim</button>
    </div>}
</div>  }
{!showAssets && <div className="col-12 max-auto mt-5">
  <div className="mt-5 d-flex justify-content-center align-items-center">
    <h4 className="text-center"> Coming Soon!</h4>
    </div>
  </div>}
 
    </div>
    </>
    )

}



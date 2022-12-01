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
import env from "@ludovicm67/react-dotenv";

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
  //   {
  //     "user_address": "quick1kv4ez0rgrd679m6da96apnqxkcamh28cyphd64",
  //     "zone": "quickgaia-1",
  //     "src_zone": "quickosmo-1",
  //     "claim_type": 2,
  //     "proofs": [
  //       {
  //         "key": "Av8AAAAAAAAAAQ==",
  //         "data": "CAESK29zbW8xanN3Y2w0aGd1bjd5dnNkODBjOGtweDB0ZTQwNWwwcTI4NmZobjYaBAiA9SQiCwiAkrjDmP7///8BKioKC2dhbW0vcG9vbC8xEhs2MDAwMDAyOTk5OTk5OTk5OTk5OTk5OTk5MDA=",
  //         "proof_ops": {
  //           "ops": [
  //             {
  //               "type": "ics23:iavl",
  //               "key": "Av8AAAAAAAAAAQ==",
  //               "data": "CpYCCgoC/wAAAAAAAAABEm4IARIrb3NtbzFqc3djbDRoZ3VuN3l2c2Q4MGM4a3B4MHRlNDA1bDBxMjg2ZmhuNhoECID1JCILCICSuMOY/v///wEqKgoLZ2FtbS9wb29sLzESGzYwMDAwMDI5OTk5OTk5OTk5OTk5OTk5OTkwMBoNCAEYASABKgUAAtaPVyIrCAESJwIE1o9XINLPcAjN7eKi4nJdt8WLXO9EbKvIQ27uh86JOl3bNNf/ICItCAESBgQI1o9XIBohIOcCdmHreWW5E3u4b5kYNxjCvAJf/RQY9719+9JuKNUXIi0IARIGCBLWj1cgGiEgINv25aYKdcSRVkpiG5UVGCTuoqQWGNLTbKtsTZ+lBi0="
  //             },
  //             {
  //               "type": "ics23:simple",
  //               "key": "bG9ja3Vw",
  //               "data": "Cv4BCgZsb2NrdXASIBExRKDB3fSRM56B4LOgRKIP05t0eo3lAepeesW6vCG6GgkIARgBIAEqAQAiJwgBEgEBGiD5Vt5/BBmvQQnMGXTh8TcjCr0rjLn1J3de7MoaiBcPIiInCAESAQEaIIV93pFvflxZWT6xKXEZXId8fEEGbG+rO3bui3xe8AkBIiUIARIhAS7v60tTpICm3JSOpIeNNarn11avC4ubFJS/qecg07zUIiUIARIhAXuFuxEr9UR9XvXGTNtxcyIxNKk3gg+1yRdguGtz2Bw3IicIARIBARogIp0vA44ek/iIjxCjTjCSGys1+XqEBj/uwQ8zCQhFJrs="
  //             }
  //           ]
  //         },
  //         "height": 761806,
  //         "proof_type": "lockup/\u0002�\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0001"
  //       }
  //     ]
  //   },
  //   {
  //     "user_address": "quick1kv4ez0rgrd679m6da96apnqxkcamh28cyphd64",
  //     "zone": "quickgaia-1",
  //     "src_zone": "quickosmo-1",
  //     "claim_type": 1,
  //     "proofs": [
  //       {
  //         "key": "AhSUHY/W6OT8RkGnfg9gmevNX0+8CmliYy8zMDIwOTIyQjc1NzZGQzc1QkJFMDU3QTAyOTBBOUFFRUZGNDg5QkIxMTEzRTZFMzY1Q0U0NzJENEJGQjdGRkEz",
  //         "data": "CkRpYmMvMzAyMDkyMkI3NTc2RkM3NUJCRTA1N0EwMjkwQTlBRUVGRjQ4OUJCMTExM0U2RTM2NUNFNDcyRDRCRkI3RkZBMxIHOTk5OTk5OA==",
  //         "proof_ops": {
  //           "ops": [
  //             {
  //               "type": "ics23:iavl",
  //               "key": "AhSUHY/W6OT8RkGnfg9gmevNX0+8CmliYy8zMDIwOTIyQjc1NzZGQzc1QkJFMDU3QTAyOTBBOUFFRUZGNDg5QkIxMTEzRTZFMzY1Q0U0NzJENEJGQjdGRkEz",
  //               "data": "CqEDCloCFJQdj9bo5PxGQad+D2CZ681fT7wKaWJjLzMwMjA5MjJCNzU3NkZDNzVCQkUwNTdBMDI5MEE5QUVFRkY0ODlCQjExMTNFNkUzNjVDRTQ3MkQ0QkZCN0ZGQTMSTwpEaWJjLzMwMjA5MjJCNzU3NkZDNzVCQkUwNTdBMDI5MEE5QUVFRkY0ODlCQjExMTNFNkUzNjVDRTQ3MkQ0QkZCN0ZGQTMSBzk5OTk5OTgaDQgBGAEgASoFAAK61AQiKwgBEicCBLrUBCAup5nGbv96/QJrM5WEdwshew9BpjNJ/E/7lZvdyvX6RiAiLQgBEgYEBrrUBCAaISAu8wdUQ/yQs2WM7qdwKjrurRW6H4aa1VDfDk9AD6wl3SIrCAESJwYO1o9XIBFQmoai/fnqGyRj2Y6ALjIjH0DU5xSETD08lbkr5qVFICItCAESBgoe1o9XIBohIHHvA7th2ErqSALeeN4qTwLZvigABQz/FDD10CqLDcBvIisIARInDC7Wj1cg9mXIFqE08mhA6f/04Ps2LJ5AUsFq8/C5NiOK+n4rR6Ig"
  //             },
  //             {
  //               "type": "ics23:simple",
  //               "key": "YmFuaw==",
  //               "data": "Cv4BCgRiYW5rEiBQ3D4uJpPHmXI7hCt0xs7G2wOmucTxsMIwqMg5XO7pZRoJCAEYASABKgEAIicIARIBARogZKYF+s8f0j824Zwni4r7U8nl3sKkV1fBh3nE0/a0mjwiJQgBEiEBC0BZcpAVqgx7Ponxxm3lGDE5dixYwlgZyGuAqhhJ+tkiJwgBEgEBGiCCRkIic5RGnUnEjk3PDIOcndUI0sueiVJijVX/xaY4MiInCAESAQEaIItc08xd5RnpeOv43VUrIS3vPZ+vAC1thmyRwszX52l7IicIARIBARogIp0vA44ek/iIjxCjTjCSGys1+XqEBj/uwQ8zCQhFJrs="
  //             }
  //           ]
  //         },
  //         "height": 761806,
  //         "proof_type": "bank/\u0002\u0014�\u001d�����FA�~\u000f`���_O�\nibc/3020922B7576FC75BBE057A0290A9AEEFF489BB1113E6E365CE472D4BFB7FFA3"
  //       }
  //     ]
  //   }
  // ]

export default function Assets() {
  const [sum, setsum] = useState<number>(0);
  const [showAssets, setShowAssets] = useState(true);

  const {balances, isQSWalletConnected, quicksilverClient, quicksilverAddress} = useSelector(quicksilverSelector);
  const { networks } = useSelector(networksSelector);

  useEffect(() => {
    if(!sum) {
  fetchSum();
    }

    if(messages.length == 0) {
      queryXccLookup();
    }

  }, [balances, networks])

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
          <div className="assets-interface row mx-0">
          {showAssets && <div className="col-8 mx-auto mt-5">
<div className="participation-rewards">
    <div className="d-flex p-5 justify-content-between">
    <h3> Claim Participation Rewards </h3>
    <button onClick={onClaimsClick}> Claim </button>
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



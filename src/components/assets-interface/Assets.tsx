import React, {useEffect, useState} from 'react';
import './Assets.css';
import {quicksilverSelector} from '../../slices/quicksilver';
import { useDispatch, useSelector } from 'react-redux'
import QuicksilverLogo from '../../assets/quicksilver-logo.png';
import qStar from '../../assets/qSTAR.svg';
import qAtom from '../../assets/qAtom.svg';
import qOsmo from '../../assets/qOsmo.svg';
import qJuno from '../../assets/qJuno.svg';
import qRegen from '../../assets/qRegen.svg';
import Question from '../../assets/icons/question-mark.svg';
import ExternalLink from '../../assets/external-link.svg';
import { Coin } from "@cosmjs/amino";
import { QuickSilverChainInfo } from '../../utils/chains';
import { networksSelector } from '../../slices/networks';
import { quicksilver } from "quicksilverjs"
import env from "react-dotenv";
import {  poolModalSelector, setPoolModalOpen } from '../../slices/poolsWarningModal'
import {  setModalOpen } from '../../slices/connectWalletModal';
import PoolsMessage from './PoolsMessageModal';
import { Tooltip as ReactTooltip} from "react-tooltip";


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
params['uqregen'] = qRegen;


  let messages = []


export default function Assets() {
  const dispatch = useDispatch();
  const [sum, setsum] = useState<number>(0);
  const [showAssets, setShowAssets] = useState(true);

  const {balances, isQSWalletConnected, quicksilverClient, quicksilverAddress, walletType} = useSelector(quicksilverSelector);
  const { networks, hasErrors } = useSelector(networksSelector);
  const [denomArray, setDenomArray] = useState<Array<string>>([])
  const {isPoolModalOpen} = useSelector(poolModalSelector)
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
  //   if(messages.length == 0) {
  //     queryXccLookup();
  //   }

  // }, [balances])

  

  const onButtonClick = () => {
    // @ts-expect-error
  dispatch(setModalOpen());
}

const onPoolButtonClick = () => {
  console.log('hey')
  // @ts-expect-error
dispatch(setPoolModalOpen());
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
             <div className="assets-interface row mx-0">
          <div className="connect-wallet-pane d-flex flex-column align-items-center ">
          <h5 className="sub-heading w-50 text-center">The Quicksilver chain is undergoing an upgrade at 1100 UTC. The front end will be disabled until the upgrade is completed.
</h5>

                </div>
            </div>
    </>

    )

}



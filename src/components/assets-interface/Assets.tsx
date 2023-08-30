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
import { SpinnerCircular } from 'spinners-react';


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
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const {balances, isQSWalletConnected, quicksilverClient, quicksilverAddress} = useSelector(quicksilverSelector);
  const { networks, hasErrors } = useSelector(networksSelector);
  const [denomArray, setDenomArray] = useState<Array<string>>([])
  const {isPoolModalOpen} = useSelector(poolModalSelector)
  const [noAssets, setNoAssets] = useState(false);
  useEffect(() => {
    if(isQSWalletConnected && networks) {
    let denomArray : Array<string> = [];
    networks.forEach((network: any) => denomArray.push(network.value.local_denom));
    denomArray.push('uqck');
    setDenomArray(denomArray);
    if(!sum) {
  fetchSum();
    }
  }

      queryXccLookup();
      setError('');

  }, [balances, quicksilverAddress])

  

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
        if(messages.length === 0) {
          setNoAssets(true);
        } 
        else {
          setNoAssets(false);
        }
      } 
      
      catch(err) {
        console.log(err)
      }
  }

 
  // const maps : any = { 
  //   'cosmos': 'uqatom', 'stargaze': 'uqstars', 'quicksilver': 'uqck'
  // }
  const onClaimsClick = async (e: any) => {

    // if (messages.length == 0) {
    //   alert("nope!")
    //   return
    // }

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
      setLoading(true);
   const broadcastResult = await quicksilverClient.signAndBroadcast(
    quicksilverAddress,
      [...msg],
     {
        "gas": (100000 + ((messages.length) * 50000)).toString(),
        "amount": [
          {
            "denom": "uqck",
            "amount": "300"
          }
        ]
      },
      'Claims Transaction'
    );  
    console.log(broadcastResult);
    if(broadcastResult.code === 0 ) {

    }
    else {
      setLoading(false);
      console.log(broadcastResult);
    setError('The transaction failed! Please try again.');
  }
} catch(err: any) {
  setLoading(false);
  console.log(err);
  setError('The transaction failed! Please try again.');
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
                <h1 className="sub-heading"> Connect Your Wallet To Get Started. </h1>
                <button  onClick={onButtonClick}  className="connect-wallet-button mt-5"> Connect Wallet </button> 
                {isPoolModalOpen && <PoolsMessage/>}
                       {/* <h4 className="sub-heading"> Assets screen will be enabled soon. Stay tuned.</h4> */}
                </div>
            </div>
           
        </div>}
       {isQSWalletConnected && <div>
          <div className="assets-interface row mx-0">
          {showAssets && <div className="col-8 mx-auto mt-5">
<div className="participation-rewards">
    <div className="d-flex p-3 justify-content-center flex-column">
    <h3 className="text-center"> Claim Participation Rewards </h3>
    {process.env.REACT_APP_ENABLE_CLAIMS === 'false' && <p className="coming-soon text-center"> Coming Soon</p>}
    {/* <button onClick={onClaimsClick}> Claim </button> */}
    <p className="text-center p-3" >
    Participation Rewards are QCK token emissions that will reward Protocol users for delegating to decentralized, performant validators that are active in governance.
<br/> <br/>
These rewards will be distributed on an epochly basis (every 3 days).
    </p>
    {process.env.REACT_APP_ENABLE_CLAIMS === 'true' && <button disabled={noAssets} onClick={onClaimsClick} className="claim-button"> Claim</button>}
    {process.env.REACT_APP_ENABLE_CLAIMS === 'true' && noAssets && <p className="text-center mt-2"> You do not have any assets in the previous epoch to claim against.</p>}

    {process.env.REACT_APP_ENABLE_CLAIMS === 'false' && <button className="claim-button"> Claim</button>}
    <div className="text-center mt-2">
    <div className="spinner">
        {loading && <SpinnerCircular />}
        </div>
        {loading && <p className="mt-3"> Transaction in progress... </p>}
        {error !== '' && !loading && <p className="mt-3"> {error}</p>}
      </div>
    </div>
  

  </div>
  <h3 className="mt-5 text-center">My Assets</h3> 
  {/* {sum === 0 && <h5 className="mt-4">Calculating...</h5>} */}
  {hasErrors && <p className="text-center"> There's an issue with fetching the network list. Please try again.</p>}
   {/* {sum !==0 && <h5 className="mt-4"><span className="amount">$ {sum.toFixed(4)} </span>in {balances.length} assets across Quicksilver chain</h5>} */}
  {balances.length > 0 && <div className="mt-3 validators row w-100 justify-content-start text-center">
  {balances.filter((bal: any) => (networks.find((y:any) => y.value.local_denom === bal.denom)) || bal.denom === 'uqck').map((bal: Coin, i: number) =>
       
            <div className={`asset-card col-3 m-3 ${bal.denom !== 'uqck' ? 'order-1' : ''}`} key={i}>
            <img className="d-block mx-auto" src={params[bal.denom]}/>
              <div className="d-flex mt-2 align-items-baseline justify-content-center">
        
                <h5 className="font-bold"> {(+(bal.amount)/1000000).toFixed(3)} {bal.denom !== 'uqck' && <span>{bal.denom[1] + bal.denom.slice(2).toUpperCase()}</span>}</h5>
              
                

                {bal.denom === 'uqck' && <h5 className="text-center mx-2"> QCK</h5>}

          
                </div>
                {bal.denom !== 'uqck' && <h6> ≈ {((networks.find((y:any) => y.value.local_denom === bal.denom).value.redemption_rate) * +(bal.amount)/1000000).toFixed(3)  } { bal.denom.slice(2).toUpperCase()}</h6>}
                {bal.denom !== 'uqck' && <p className="redemption-rate"> at current redemption rate <span><img id={i.toLocaleString()}  className="question"  src={Question}/></span></p>}
                {bal.denom !== 'uqck' &&  <ReactTooltip
        anchorId={i.toLocaleString()}
        place="bottom"
        content={`The current redemption rate is ${(+(networks.find((y:any) => y.value.local_denom === bal.denom).value.redemption_rate)).toFixed(4) } ${bal.denom[1] + bal.denom.slice(2).toUpperCase()} per ${bal.denom.slice(2).toUpperCase()} `}
      />}
{bal.denom === 'uqatom' && <a href="https://app.osmosis.zone/pool/944" target="_blank" className="pool-text">Pool on Osmosis <span><img className="pool"  src={ExternalLink}/></span></a>}
{bal.denom === 'uqregen' && <a href="https://app.osmosis.zone/pool/948" target="_blank" className="pool-text">Pool on Osmosis <span><img className="pool"  src={ExternalLink}/></span></a>}
{bal.denom === 'uqstars' && <a href="https://app.osmosis.zone/pool/903" target="_blank" className="pool-text">Pool on Osmosis <span><img className="pool"  src={ExternalLink}/></span></a>}
                {/* {bal.denom === 'uqstars' && <button onClick={onPoolButtonClick} className="w-100 prev-button"> Use {bal.denom[1] + bal.denom.slice(2).toUpperCase()} </button>} */}
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



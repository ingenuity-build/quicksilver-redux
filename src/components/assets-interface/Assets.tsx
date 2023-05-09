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
import { claimsSelector, fetchClaims } from '../../slices/claims';
import  {  claimRewardModalSelector, setClaimModalOpen } from '../../slices/claimRewardModal';
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
  const [claimsArray, setClaimsArray] = useState([]);
  const [claims, setClaims] = useState({})
  const [newBalances, setNewBalances] = useState([])
  const [balanceDetails, setBalanceDetails] = useState({})
  

  const {balances, isQSWalletConnected, quicksilverClient, quicksilverAddress} = useSelector(quicksilverSelector);
  const { networks, hasErrors } = useSelector(networksSelector);
  const [denomArray, setDenomArray] = useState<Array<string>>([])
  const {isPoolModalOpen} = useSelector(poolModalSelector)
  const {previousEpochMessages, existingClaims, previousEpochAssets, currentEpochAssets} = useSelector(claimsSelector)
  const {isClaimModalOpen} = useSelector(claimRewardModalSelector)
        let obj = {};

  useEffect(() => {
    if(isQSWalletConnected && quicksilverAddress && networks) {
          // @ts-ignore
    dispatch(fetchClaims(quicksilverAddress))
    let denomArray : Array<string> = [];
    networks.forEach((network: any) => denomArray.push(network.value.local_denom));
    denomArray.push('uqck');
    setDenomArray(denomArray);
    if(!sum) {
  fetchSum();
    }
  }
  

  }, [networks,quicksilverAddress,isQSWalletConnected])

//   useEffect(() => {
//     if(existingClaims.length !== 0) {

// existingClaims.forEach((claim) => {
//   // obj[claim.chain_id] = (obj[claim.chain_id]['total'] || obj[claim.chain_id]['total']) + parseInt(claim.amount);
// if(obj[claim.chain_id]) {
//   obj[claim.chain_id]['total'] = obj[claim.chain_id]['total'] + parseInt(claim.amount)
// } else {
//   obj[claim.chain_id] = { total : parseInt(claim.amount)}
// }
//     })
//     displayClaims(obj)
//   }



// }, [existingClaims])


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

 let newBalanceArray = {};
 useEffect(() => {
  // balances.forEach((balance) => {

  //   newBalanceArray[balance.denom] = { "quicksilver" : balance.amount}
  // })

       Object.keys(currentEpochAssets).forEach((key, i) => {
        currentEpochAssets[key].forEach((asset1: any) => {
          asset1["Amount"].forEach((asset2: any) => {
            if(newBalanceArray[asset2.denom]) {
              newBalanceArray[asset2.denom]= {...newBalanceArray[asset2.denom], [key]: asset2.amount}
            } else {
              newBalanceArray[asset2.denom] = { [key]: asset2.amount}
            }
            console.log('New Balance Array', newBalanceArray);

  });
})
})


setBalanceDetails(newBalanceArray)
let newObj = {};
Object.keys(newBalanceArray).forEach((key,i) => {

      console.log('OBj', newBalanceArray[key]);
    newObj[key] = Object.values(newBalanceArray[key]).reduce((a: any, b:any) => parseInt(a) + parseInt(b), 0);

  })


console.log('final',newObj);
const objArray : any = [];
Object.keys(newObj).forEach(key => objArray.push({
   "denom": key,
   "amount": newObj[key]
}));

console.log('array', objArray);

setNewBalances(objArray)

}, [currentEpochAssets])

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



 
  // const maps : any = { 
  //   'cosmos': 'uqatom', 'stargaze': 'uqstars', 'quicksilver': 'uqck'
  // }
  const onClaimsClick = async (e: any) => {
     // @ts-expect-error
     dispatch(setClaimModalOpen());
  
}

  const fetchData = (id: any, amount: number) => {

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
    <p className="coming-soon text-center"> Coming Soon</p>
    {/* <button onClick={onClaimsClick}> Claim </button> */}
    <p className="text-center p-3" >
    Participation Rewards are QCK token emissions that will reward Protocol users for delegating to decentralized, performant validators that are active in governance.
<br/> <br/>
These rewards will be distributed on an epochly basis (every 3 days).
    </p>
    <button onClick={onClaimsClick} className="claim-button"> Claim</button>
    {isClaimModalOpen && <ClaimRewardModal/>}
    </div>

  </div>
  <h3 className="mt-5 text-center">My Assets</h3> 
  {/* {sum === 0 && <h5 className="mt-4">Calculating...</h5>} */}
  {hasErrors && <p className="text-center"> There's an issue with fetching the network list. Please try again.</p>}
   {/* {sum !==0 && <h5 className="mt-4"><span className="amount">$ {sum.toFixed(4)} </span>in {balances.length} assets across Quicksilver chain</h5>} */}
  {/* {balances.length > 0 && <div className="mt-3 validators row w-100 justify-content-start text-center">
  {newBalances.filter((bal: any) => (networks.find((y:any) => y.value.local_denom === bal.denom)) || bal.denom === 'uqck').map((bal: Coin, i: number) =>
       
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
             </div>

         
    
         
  )}

</div>} */}
<div className="mt-3 validators row w-100 justify-content-start text-center">
  {/* <div className="col-6">
    <div className="asset-card">
    <div className="m-3 mt-2 d-flex justify-content-center align-items-center">
      <img src={QuicksilverLogo}/> 
      <h3 className='font-bold'> QCK</h3>
    </div>
    <div className="mt-4 d-flex flex-column  justify-content-center align-items-center">
      <h4>234234.4543 </h4>
      <h6> Quicksilver Balance</h6>
    </div>
    <p className="mt-2 invisible"> 1 qSTARS = 1.003 STARS at current redemption rate</p>
    <div className="mt-4 d-flex justify-content-center align-items-center">
    <a href="https://app.osmosis.zone/pool/944" target="_blank" className="pool-text">Stake QCK <span><img className="pool"  src={ExternalLink}/></span></a>
    <a href="https://app.osmosis.zone/pool/944" target="_blank" className="pool-text">Deposit <span><img className="pool"  src={ExternalLink}/></span></a>
    <a href="https://app.osmosis.zone/pool/944" target="_blank" className="pool-text">Withdraw <span><img className="pool"  src={ExternalLink}/></span></a>
    </div>
    </div>
  </div>
  <div className="col-6">
    <div className="asset-card"> 
    <div className="mt-2 d-flex justify-content-center align-items-center">
    
      <img src={QuicksilverLogo}/> 
      <h3 className='font-bold'> QCK</h3>
    </div>
    <div className="mt-4 d-flex justify-content-center align-items-center">
      <div>
      <h4>234234.4543 </h4>
      <h6> Quicksilver Balance</h6>
      </div>
      <div>
      <h4>234234.4543 </h4>
      <h6> Other chain Balance</h6>
      </div>
    </div>
    <p className="mt-2"> 1 qSTARS = 1.003 STARS at current redemption rate</p>
    <div className="mt-4 d-flex justify-content-center align-items-center">
    <a href="https://app.osmosis.zone/pool/944" target="_blank" className="pool-text">Stake QCK <span><img className="pool"  src={ExternalLink}/></span></a>
    <a href="https://app.osmosis.zone/pool/944" target="_blank" className="pool-text">Deposit <span><img className="pool"  src={ExternalLink}/></span></a>
    <a href="https://app.osmosis.zone/pool/944" target="_blank" className="pool-text">Withdraw <span><img className="pool"  src={ExternalLink}/></span></a>
    </div>
    </div>
  </div>
  <div className="asset-card col-5 m-3">
    <div className="mt-2 d-flex justify-content-center align-items-center">
      <img src={QuicksilverLogo}/> 
      <h3 className='font-bold'> QCK</h3>
    </div>
    <div className="mt-4 d-flex flex-column  justify-content-center align-items-center">
      <h3>234234.4543 </h3>
      <h6> Quicksilver Balance</h6>
    </div>
    <div className="mt-4 d-flex justify-content-center align-items-center">
    <a href="https://app.osmosis.zone/pool/944" target="_blank" className="pool-text">Stake QCK <span><img className="pool"  src={ExternalLink}/></span></a>
    <a href="https://app.osmosis.zone/pool/944" target="_blank" className="pool-text">Deposit <span><img className="pool"  src={ExternalLink}/></span></a>
    <a href="https://app.osmosis.zone/pool/944" target="_blank" className="pool-text">Withdraw <span><img className="pool"  src={ExternalLink}/></span></a>
    </div>
  </div> */}
{}
</div>
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



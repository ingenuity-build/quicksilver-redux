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
import { Zone } from '../../utils/protodefs/quicksilver/interchainstaking/v1/genesis';



interface IImages {
  [index: string]: string;
}
var params = {} as IImages;

params['uqck'] = QuicksilverLogo; // okay
params['uqatom'] = qAtom;
params['uqstars'] = qStar
// var foo = params['heart']; // foo:string



export default function Assets() {
  const [sum, setsum] = useState<number>(0);
  const [showAssets, setShowAssets] = useState(true);

  const {balances, isQSWalletConnected} = useSelector(quicksilverSelector);
  const { networks } = useSelector(networksSelector);

  useEffect(() => {

  fetchSum();
  console.log(sum);

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

 
  // const maps : any = { 
  //   'cosmos': 'uqatom', 'stargaze': 'uqstars', 'quicksilver': 'uqck'
  // }
  

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
    <button > COMING SOON </button>
    </div>

  </div>
  <h3 className="mt-5">My Assets</h3> 
   {sum && <h5 className="mt-4"><span className="amount">$ {sum.toFixed(4)} </span>in {balances.length} assets across quicksilver chain</h5>}
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



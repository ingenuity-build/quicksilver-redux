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
  const [sum, setsum] = useState(0);
  const [showAssets, setShowAssets] = useState(false);

  useEffect(() => {

  fetchSum()

  }, [])

  const fetchSum =  () => {

    let arr3: { id: string; amount: number }[] = [];
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
      fetchData(curr.coinGeckoId, amount)
    
      } 
      catch(err) {
        console.log(err)
      }
    }
    
      
    )


    
  }

  console.log('sum', sum)
  const fetchData = (id: any, amount: any) => {
    let network = {};
    let calc = 0;
    balances.forEach((x: any) => {
          if(x.denom !== 'uqck') {
              network = networks.find((y:any) => y.value.local_denom == x.denom); 
              // @ts-expect-error
              calc = +(x.amount)/1000000 * +(network?.value.redemption_rate);

              console.log('hey');
              setsum((prevSum) => prevSum + (amount * (+(x.amount)/1000000)))
              
              
          } else if (x.denom === 'uqck' && id === 'quicksilver') {
            console.log('bye')
            setsum((prevSum) => prevSum + (amount * (+(x.amount)/1000000)))
          } 
        })
      }

    const {balances, isQSWalletConnected} = useSelector(quicksilverSelector);
    const { networks } = useSelector(networksSelector);
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
    <h5 className="mt-4"><span className="amount">$ {sum.toFixed(4)} </span>in {balances.length} assets across quicksilver chain</h5>
  {balances.length > 0 && <div className="mt-3 validators row w-100 justify-content-start">
  {balances.map((bal: Coin) =>
          <>
            <div className="asset-card col-3 m-3">
            <img className="d-block mx-auto" src={params[bal.denom]}/>
              <div className="d-flex mt-2 align-items-baseline justify-content-center">
        
                <h4 className="font-bold"> {(+(bal.amount)/1000000).toFixed(2)}</h4>
                {bal.denom !== 'uqck' && <h6 className="text-center mx-2"> {bal.denom[1] + bal.denom.slice(2).toUpperCase()}</h6>}
                {bal.denom === 'uqck' && <h6 className="text-center mx-2"> QCK</h6>}
                </div>
               
            </div>

         
          </>
  
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



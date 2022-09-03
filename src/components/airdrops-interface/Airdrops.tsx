import React from 'react';
import './Airdrops.css';
import { useSelector} from 'react-redux'

import {quicksilverSelector} from '../../slices/quicksilver';
//ActionInitialClaim



export default function Airdrop() {

    const {quicksilverClient} = useSelector(quicksilverSelector);
    const Claim =  async (actionID: any) => {

        let msg =  {typeUrl: "/quicksilver.airdrop.v1.MsgClaim",
                  value: {
                  chainId: 'fauxgaia-1',
                  address: 'quick17v9kk34km3w6hdjs2sn5s5qjdu2zrm0m3rgtmq',
                  action: actionID,
                  proofs: []
                }
              }

        const broadcastResult = await quicksilverClient.signAndBroadcast(
           'quick17v9kk34km3w6hdjs2sn5s5qjdu2zrm0m3rgtmq',
            [msg],
           {
              "gas": "100000",
              "amount": [
                {
                  "denom": "uqck",
                  "amount": "1000"
                }
              ]
            },
            'MEMO'
          );
          console.log(broadcastResult);
      }
    return (
        <>
                   <div className="airdrops-interface row mx-0">
        <div className='col-2 stepper'></div>
        <div className="content col-10">
        <h2 className="mt-2"> My Missions </h2>
<div>
  <div className="mission">
    <h4> Mission 1 </h4>
    <div className="d-flex justify-content-between">
    <p> Initial claim action </p>
    <button onClick={() => Claim(0)}> CLAIM </button>
    </div>
  </div>
    <div className="mission">
    <h4> Mission 2 </h4>
    <div className="d-flex justify-content-between">
    <p> Deposit tier 1 (e.g. &gt; 5% of base_value) </p>
    <button> CLAIM </button>
    </div>
  </div>
    <div className="mission">
    <h4> Mission 3 </h4>
    <div className="d-flex justify-content-between">
    <p> Deposit tier 2 (e.g. &gt; 10% of base_value) </p>
    <button> CLAIM </button>
    </div>
  </div>
    <div className="mission">
    <h4> Mission 4 </h4>
    <div className="d-flex justify-content-between">
    <p>  Deposit tier 2 (e.g. &gt; 15% of base_value) </p>
    <button> CLAIM </button>
    </div>
    </div>
    <div className="mission">
    <h4> Mission 5 </h4>
    <div className="d-flex justify-content-between">
    <p> Deposit tier 3 (e.g. &gt; 22% of base_value) </p>
    <button> CLAIM </button>
    </div>
    </div>
    <div className="mission">
    <h4> Mission 6 </h4>
    <div className="d-flex justify-content-between">
    <p> Deposit tier 4 (e.g. &gt; 30% of base_value) </p>
    <button> CLAIM </button>
    </div>
    </div>
    <div className="mission">
    <h4> Mission 7 </h4>
    <div className="d-flex justify-content-between">
    <p> Active QCK delegation </p>
    <button> CLAIM </button>
    </div>
    </div>
    <div className="mission">
    <h4> Mission 8 </h4>
    <div className="d-flex justify-content-between">
    <p> Intent is set </p>
    <button> CLAIM </button>
    </div>
    </div>
    <div className="mission">
    <h4> Mission 9 </h4>
    <div className="d-flex justify-content-between">
    <p> Cast governance vote on QS </p>
    <button> CLAIM </button>
    </div>
    </div>
    <div className="mission">
    <h4> Mission 10</h4>
    <div className="d-flex justify-content-between">
    <p> Governance By Proxy (GbP): cast vote on remote zone </p>
    <button> CLAIM </button>
    </div>
    </div>
    <div className="mission">
    <h4> Mission 11</h4>
    <div className="d-flex justify-content-between">
    <p> Provide liquidity on Osmosis </p>
    <button> CLAIM </button>
    </div>
    </div>

     </div>
  </div>
</div>


</>


    )
}
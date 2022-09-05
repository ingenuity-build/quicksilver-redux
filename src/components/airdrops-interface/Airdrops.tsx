import React from 'react';
import './Airdrops.css';
import { useSelector, useDispatch} from 'react-redux'

import {quicksilverSelector} from '../../slices/quicksilver';
import { selectedNetworkSelector } from "../../slices/selectedNetwork";
import {  setModalOpen } from '../../slices/connectWalletModal';
//ActionInitialClaim



export default function Airdrop() {

    const {quicksilverClient, isQSWalletConnected, quicksilverAddress} = useSelector(quicksilverSelector);
    const {selectedNetwork} = useSelector(selectedNetworkSelector);
    const dispatch = useDispatch();
    const onButtonClick = () => {
      // @ts-expect-error
    dispatch(setModalOpen());
  
  }
    const Claim =  async (actionID: any) => {

        let msg =  {typeUrl: "/quicksilver.airdrop.v1.MsgClaim",
                  value: {
                  chainId: 'fauxgaia-1',
                  address: quicksilverAddress,
                  action: actionID,
                  proofs: []
                }
              }

        const broadcastResult = await quicksilverClient.signAndBroadcast(
          quicksilverAddress,
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
              {!isQSWalletConnected && <div>
          <div className="connect-wallet-pane d-flex flex-column align-items-center ">
                <h4 className="sub-heading"> Hey there! </h4>
                <h1 className="mt-3"> Connect your wallet to get started! </h1>
                <button  onClick={onButtonClick} className="connect-wallet-button mt-5"> Connect Wallet </button> 
                </div>
        </div>}
        {isQSWalletConnected && selectedNetwork === "Select a network" && <div className='text-center'>
        <h2 className="mt-4">Choose your network </h2>
        <p className="mt-2">Choose the network from the dropdown in the Navbar</p> 
          </div>}
          {isQSWalletConnected && selectedNetwork !== "Select a network" &&  <div className="airdrops-interface row mx-0">
        <div className='col-2 stepper'></div>
        <div className="content col-10">
        <h2 className="mt-2"> My Missions </h2>
<div>
  <div className="mission">
    <h4> Mission 1 </h4>
    <div className="d-flex justify-content-between">
    <p> Claim QCK</p>

    <button onClick={() => Claim(0)}> CLAIM </button>
    </div>
  </div>
    <div className="mission">
    <h4> Mission 2 </h4>
    <div className="d-flex justify-content-between">
    <button> Stake ATOM </button>
    <p> Stake 5% of base value </p>
    <button> CLAIM </button>
    </div>
  </div>
    <div className="mission">
    <h4> Mission 3 </h4>
    <div className="d-flex justify-content-between">
    <button> Stake ATOM </button>
    <p> Stake 10% of base value </p>
    <button> CLAIM </button>
    </div>
  </div>
    <div className="mission">
    <h4> Mission 4 </h4>
    <div className="d-flex justify-content-between">
    <p>  Stake 15% of base value </p>
    <button> CLAIM </button>
    </div>
    </div>
    <div className="mission">
    <h4> Mission 5 </h4>
    <div className="d-flex justify-content-between">
    <p> Stake 22% of base value </p>
    <button> CLAIM </button>
    </div>
    </div>
    <div className="mission">
    <h4> Mission 6 </h4>
    <div className="d-flex justify-content-between">
    <p> Stake 30% of base_value </p>
    <button> CLAIM </button>
    </div>
    </div>
    <div className="mission">
    <h4> Mission 7 </h4>
    <div className="d-flex justify-content-between">
    <p> Stake your QCK</p>
    <button> CLAIM </button>
    </div>
    </div>
    <div className="mission">
    <h4> Mission 8 </h4>
    <div className="d-flex justify-content-between">
    <p> Redelegate your ATOMS to different validators </p>
    <button> CLAIM </button>
    </div>
    </div>
    <div className="mission">
    <h4> Mission 9 </h4>
    <div className="d-flex justify-content-between">
    <p> Vote on a Quicksilver governance proposal </p>
    <button> CLAIM </button>
    </div>
    </div>
    <div className="mission">
    <h4> Mission 10</h4>
    <div className="d-flex justify-content-between">
    <p> Vote on a Cosmos Hub proposal (Coming soon)</p>
    <button> CLAIM </button>
    </div>
    </div>
    <div className="mission">
    <h4> Mission 11</h4>
    <div className="d-flex justify-content-between">
    <p> Provide liquidity to the qATOM : ATOM pool on Osmosis</p>
    <button> CLAIM </button>
    </div>
    </div>

     </div>
  </div>
</div>}


</>


    )
}
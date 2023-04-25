import React from 'react';
import {quicksilverSelector} from '../../../slices/quicksilver';
import { useSelector, useDispatch } from 'react-redux'
import { quicksilver } from "quicksilverjs"
import ConnectWallet from '../delegate/ConnectWallet';
import {redelegateActiveStep} from '../../../slices/relegateActiveStep';
import RedelegateNetworkSelection from './RedelegateNetworkSelection';
import RedelegateValidators from './RedelegateValidators';
import RedelegateAllocations from './RedelegateAllocations';


// const {
//   submitClaim
// } = quicksilver.interchainstaking.v1.MsgSignalIntent

export default function Redelegate(props: any) {
  const dispatch = useDispatch();
  const redelegateStep = useSelector(redelegateActiveStep);

    const {isQSWalletConnected, balances, quicksilverClient, quicksilverAddress} = useSelector(quicksilverSelector);
    // const Redelegate =  async () => {

    // let msg =  {
    //   typeUrl: "/quicksilver.interchainstaking.v1.MsgSignalIntent",
    //   value: {
    //     chainId: "quickgaia-1",
    //     fromAddress: quicksilverAddress,
    //     intents: "0.5cosmosvaloper1759teakrsvnx7rnur8ezc4qaq8669nhtgukm0x,0.5cosmosvaloper1jtjjyxtqk0fj85ud9cxk368gr8cjdsftvdt5jl"
    //   }
    // }
    // try {

    //     const broadcastResult = await quicksilverClient.signAndBroadcast(
    //       quicksilverAddress,
    //         [msg],
    //        {
    //           "gas": "200000",
    //           "amount": [
    //             {
    //               "denom": "uqck",
    //               "amount": "5000"
    //             }
    //           ]
    //         },
    //         'MEMO'
    //       );
    //       console.log(broadcastResult)
    // } catch(err: any) {
    //     console.log(err)
    // }
    //   }


    return  (
    // <div className="mt-5 d-flex justify-content-center align-items-center">
    //     <h3 className="mt-5">Redelegation </h3>
    //     <button onClick={ () => Redelegate()}>REDELEGATE!</button> 
    //     </div>
    <>       
        {redelegateStep === 1 && <ConnectWallet connectKeplr={props.connectKeplr}/>}
        {redelegateStep === 2 && <RedelegateNetworkSelection/>}
        {redelegateStep === 3 && <RedelegateValidators  />}
        {redelegateStep === 4 && <RedelegateAllocations/>}

    </>
    )
}
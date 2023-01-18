
import React from 'react';
import Long from 'long';
import {coins} from "@cosmjs/amino"
import './SummaryValidators.css';
import { selectedNetworkSelector} from "../../../slices/selectedNetwork";
import { useSelector, useDispatch } from 'react-redux'
import { setStakingStep } from "../../../slices/stakingActiveStep";
import { selectedNetworkWalletSelector } from '../../../slices/selectedNetworkWallet';
import { stakingAllocationSelector} from '../../../slices/allocation';

import { SpinnerCircular } from 'spinners-react';
import { createMessageSend } from '@evmos/transactions';
import { createTxRaw } from '@evmos/proto'
import { generateEndpointAccount } from '@evmos/provider'
import { getKeplrFromWindow } from '@keplr-wallet/stores';
import {
  generateEndpointBroadcast,
  generatePostBodyBroadcast,
} from '@evmos/provider';

let { bech32 } = require('bech32');





export default function SummaryValidators() {
 
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');


  const {selectedNetwork} = useSelector(selectedNetworkSelector);
  const {networkAddress, client} = useSelector(selectedNetworkWalletSelector);
  const {stakingAmount, stakingAllocationProp} = useSelector(stakingAllocationSelector)
    let out : string | Array<any> = [];
    
  

    function valToByte(val: any) {
      if (val > 1) { val = 1 }
      if (val < 0) { val = 0 }
      return Math.abs(val*200)
    }
    
    function addValidator(valAddr: any, weight: any) {
      let addr = bech32?.decode(valAddr)
       let  converted = bech32?.fromWords(addr.words);
      converted?.unshift(valToByte(weight));
      return converted;
    }


  const renderValidators = () => {
      const validators = Object.values(stakingAllocationProp).map((obj : any) => {
        out = out.concat(addValidator(obj.address, obj.value/100));
   
          return (
              <>
                <h6>{obj.name} : <span className="font-bold"> {obj.value.toFixed(2)} % </span></h6> 
              </> 
          )
      }
      )
      out = Buffer.from(out).toString('base64');
      console.log(out);
      return validators;
  }

  const uint8ToBase64 = (arr: Uint8Array): string =>
    btoa(
        Array(arr.length)
            .fill('')
            .map((_, i) => String.fromCharCode(arr[i]))
            .join('')
    );

  const onStakeClick = async (e: any) => {
    const options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }
    
  
      let addrRawData = await fetch(
        `https://lcd.evmos-9000-1.dev.quicksilver.zone${generateEndpointAccount(networkAddress)}`,
        options,
      )
    
    
    // NOTE: the node returns status code 400 if the wallet doesn't exist, catch that error
    
    let addrData = await addrRawData.json()
    let keplr = await getKeplrFromWindow();
    const walletAccount = await keplr?.getKey(
      'evmos_9000-1'
    );
// @ts-ignore
      console.log('key',  Buffer.from(walletAccount?.pubKey).toString('base64'),)
    const chain = {
      chainId: 9000,
      cosmosChainId: 'evmos_9000-1',
    }
    
    const sender = {
      accountAddress: networkAddress,
      sequence: addrData.account.base_account.sequence,
      accountNumber: addrData.account.base_account.account_number,
      // @ts-ignore
       pubkey: Buffer.from(walletAccount.pubKey).toString('base64'),
    }
    
    const fee = {
      amount: '20',
      denom: 'aevmos',
      gas: '200000',
    }
    
    const memo: any = out;
    
    const params = {
      destinationAddress: selectedNetwork.deposit_address.address,
      amount: '100000000000000000',
      denom: 'aevmos',
    }
    
    const msg = createMessageSend(chain, sender, fee, memo, params)
          // @ts-expect-error 
    let sign = await window?.keplr?.signDirect(
      chain.cosmosChainId,
      sender.accountAddress,
      {
        bodyBytes: msg.signDirect.body.serializeBinary(),
        authInfoBytes: msg.signDirect.authInfo.serializeBinary(),
        chainId: chain.cosmosChainId,
        accountNumber: new Long(sender.accountNumber),
      },
      { isEthereum: true },
    )
    
    if (sign !== undefined) {
      let rawTx = createTxRaw(sign.signed.bodyBytes, sign.signed.authInfoBytes, [
        new Uint8Array(Buffer.from(sign.signature.signature, 'base64')),
      ])
    
      // Broadcast it
      const postOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: generatePostBodyBroadcast(rawTx),
      }
    
      let broadcastPost = await fetch(
        `https://lcd.evmos-9000-1.dev.quicksilver.zone${generateEndpointBroadcast()}`,
        postOptions,
      )
      let response = await broadcastPost.json()
      console.log(response);
    }

  //     const msgSend = {
  //       fromAddress: networkAddress,
  //       toAddress: selectedNetwork.deposit_address.address,
  //       amount: coins((stakingAmount * 1000000), selectedNetwork.base_denom),
  //     };
      
  //     const msgAny = {
  //         typeUrl: "/cosmos.bank.v1beta1.MsgSend",
  //       value: msgSend,
  //     };
      
  //     try {
  //       setLoading(true);
  //    const broadcastResult = await client.signAndBroadcast(
  //       networkAddress,
  //       [msgAny],
  //      {
  //         "gas": "200000",
  //         "amount": [
  //           {
  //             "denom": "umuon",
  //             "amount": "300"
  //           }
  //         ]
  //       },
  //       out,
  //     );
  //     console.log(broadcastResult);
  //     if(broadcastResult.code === 0 ) {
  //           // @ts-expect-error
  //       dispatch(setStakingStep(8));
       
  //     } else {
  //       setLoading(false);
  //       console.log(broadcastResult);
  //     setError('The transaction failed! Please try again.');
  //   }
  // } catch(err: any) {
  //   setLoading(false);
  //   console.log(err);
  //   setError('The transaction failed! Please try again.');
  // }
  }


    return (
        <>
        <div className="summary-validator-pane d-flex mt-4 justify-content-center align-items-center flex-column">
            <h2 className="mt-4"> Summary </h2> 
            <h5 className="mt-4"> Total Stake: <span className="font-bold">{stakingAmount} {selectedNetwork.base_denom.slice(1).toUpperCase()}</span></h5>
            <h5>Redemption Rate:  <span className="font-bold">1 {selectedNetwork.local_denom[1] + selectedNetwork.local_denom.slice(2).toUpperCase()} =  {parseFloat(selectedNetwork?.redemption_rate).toFixed(4)} {selectedNetwork.base_denom.slice(1).toUpperCase()} </span></h5>
            <h5> {selectedNetwork.local_denom[1] + selectedNetwork.local_denom.slice(2).toUpperCase()} Received:  <span className="font-bold">{(stakingAmount/(selectedNetwork?.redemption_rate)).toFixed(6)}</span></h5>
            <h6 className="mt-4"> Validator List: </h6>
        {renderValidators()}
        
        <button  className="stake-button mt-3 mb-2" onClick={onStakeClick}> STAKE  </button>
        <div className="spinner">
        {loading && <SpinnerCircular />}
        </div>
        {loading && <p> Transaction in progress... </p>}
        {error !== '' && !loading && <p className="mt-3"> {error}</p>}
        </div>
        </>
    );
}
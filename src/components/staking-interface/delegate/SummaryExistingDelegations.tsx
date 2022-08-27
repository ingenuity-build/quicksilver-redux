
import React, {useEffect} from 'react';

import { parseCoins } from "@cosmjs/stargate";
import { selectedNetworkSelector} from "../../../slices/selectedNetwork";
import { useSelector, useDispatch } from 'react-redux'
import { selectedNetworkWalletSelector } from '../../../slices/selectedNetworkWallet';
import {existingDelegationsSelector, setSelectedExistingDelegations} from "../../../slices/existingDelegations";



export default function SummaryExistingDelegations() {
    const {selectedNetwork} = useSelector(selectedNetworkSelector);
    const {selectedExistingDelegations } = useSelector(existingDelegationsSelector);
    const {networkAddress, client} = useSelector(selectedNetworkWalletSelector);

    
    useEffect(() => {
        let sum = 0;
        selectedExistingDelegations.forEach((x: any) => {
            sum = sum + +(x.coins[0].amount);
        })
        sum = Math.abs(sum / selectedNetwork.redemption_rate)*selectedNetwork.redemption_rate
        setTotalStake(sum);
    }, [])
    const [totalStake, setTotalStake] = React.useState(0);
    
    const stakeExistingDelegations = async (e: any) => {

        console.log('Stake existing');
        let msg = [];
        msg = selectedExistingDelegations.map((x: any) => { return {
          typeUrl: "/cosmos.staking.v1beta1.MsgTokenizeShares",
          value: {
                
                    delegatorAddress: networkAddress,
                    validatorAddress: x.validator_address,
                    amount: {
                       "amount": x.coins[0].amount,
                       "denom": x.coins[0].denom
                    },
                    tokenizedShareOwner: networkAddress,
                  }}
                });
                let coinstring = '';
                try {
                 
          const broadcastResult = await client.signAndBroadcast(
            networkAddress,
              [...msg],
             {
                "gas": "1000000",
                "amount": [
                  {
                    "denom": "umuon",
                    "amount": "300"
                  }
                ]
              },
              'Existing Delegations Transaction'
            );
  
            
            JSON.parse(unescape(broadcastResult.rawLog)).forEach((x: any) => x.events.forEach((y: any) => {if(y.type === "coinbase"){ 
              return y.attributes.forEach((attr: any, index: any) => {
                   if(attr.key === "amount") {
                       coinstring +=  `${attr.value},`;
                   }
               })
            }} ));
            if(broadcastResult.code === 0) {
  
            const msgSend = {
              fromAddress: networkAddress,
              toAddress: selectedNetwork.deposit_address.address,
              amount: parseCoins(coinstring.slice(0, -1)),
            };
            
            const msgAny = {
                typeUrl: "/cosmos.bank.v1beta1.MsgSend",
              value: msgSend,
            };
              try {
               const broadcastResult2 = await client.signAndBroadcast(
                 networkAddress,
                 [msgAny],
                {
                   "gas": "200000",
                   "amount": [
                     {
                       "denom": "umuon",
                       "amount": "300"
                     }
                   ]
                 },
                 "Staking existing transaction - 2 ",
               );
     
               console.log(broadcastResult2);
               if(broadcastResult2.code === 0 ) {
                
             }
           } catch(err: any) {
  
         }
       }
          }  catch(err: any) {
           
        }
        
  
  
           
        }
  
      
  
  
      return (
  
          <div className="summary-existing-delegations-pane d-flex mt-4 justify-content-center align-items-center flex-column">
              <h2 className="mt-4"> Summary</h2>
              <h5 className="mt-4"> Total Stake: <span className="font-bold">{totalStake/1000000} {selectedNetwork.base_denom.charAt(1).toUpperCase() + selectedNetwork.base_denom.slice(2)} </span></h5>
              <h5>Redemption Rate:  <span className="font-bold">1 {selectedNetwork.local_denom[1] + selectedNetwork.local_denom.charAt(2).toUpperCase() + selectedNetwork.local_denom.slice(3)} =  {parseFloat(selectedNetwork?.redemption_rate).toFixed(4)} {selectedNetwork.base_denom.charAt(1).toUpperCase() + selectedNetwork.base_denom.slice(2)} </span></h5>
              <h5>qTokens Received:  <span className="font-bold">{(totalStake/1000000)/selectedNetwork?.redemption_rate}</span></h5>
              <h6 className="mt-4"> Existing Delegations: </h6>
              {selectedExistingDelegations.map((x: any) => <>
                   <h6> {x['name']} :  <span className="font-bold">{x.coins[0].amount/1000000} {x.coins[0].denom.charAt(1).toUpperCase() + x.coins[0].denom.slice(2)} </span></h6></> )}
                   <button   className="stake-button mt-3 mb-2" onClick={stakeExistingDelegations} > STAKE EXISTING DELEGATIONS </button>
              
 
          </div>
   
      
      
  )
  
  
}
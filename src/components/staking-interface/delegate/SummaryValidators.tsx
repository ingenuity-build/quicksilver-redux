
import React, {useEffect} from 'react';
import {coins} from "@cosmjs/amino"
import './SummaryValidators.css';
import { selectedNetworkSelector} from "../../../slices/selectedNetwork";
import { useSelector, useDispatch } from 'react-redux'
import { setStakingStep } from "../../../slices/stakingActiveStep";
import { selectedNetworkWalletSelector } from '../../../slices/selectedNetworkWallet';
import { stakingAllocationSelector} from '../../../slices/allocation';
import { decreaseStakingStep } from "../../../slices/stakingActiveStep";
import Moment from 'moment';
import { SpinnerCircular } from 'spinners-react';
let { bech32 } = require('bech32');




export default function SummaryValidators() {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [showOsmoMessage, setShowOsmoMessage] = React.useState(false);


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

    useEffect(() => {
      if(selectedNetwork.base_denom === "uosmo") {
      let format = 'HH:mm';

    let time = Moment.utc().format(format);
    let beforeTime = Moment('17:00', format);
      let afterTime = Moment('17:30', format);
    if (Moment(time, 'HH:mm').isBetween(beforeTime, afterTime)) {
      console.log('heyy');
      setShowOsmoMessage(true);
    
    } else {
      setShowOsmoMessage(false);
    }
  }
     
  }, [])

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

  const onStakeClick = async (e: any) => {


      const msgSend = {
        fromAddress: networkAddress,
        toAddress: selectedNetwork.deposit_address.address,
        amount: coins((stakingAmount * 1000000), selectedNetwork.base_denom),
      };
      
      const msgAny = {
          typeUrl: "/cosmos.bank.v1beta1.MsgSend",
        value: msgSend,
      };
      
      try {
        setLoading(true);
     const broadcastResult = await client.signAndBroadcast(
        networkAddress,
        [msgAny],
       {
          "gas": "200000",
          "amount": [
            {
              "denom": selectedNetwork.base_denom,
              "amount": "2000"
            }
          ]
        },
        out,
      );
      console.log(broadcastResult);
      if(broadcastResult.code === 0 ) {
            // @ts-expect-error
        dispatch(setStakingStep(8));
       
      } else {
        setLoading(false);
        console.log(broadcastResult);
      setError('The transaction failed! Please try again.');
    }
  } catch(err: any) {
    setLoading(false);
    console.log(err);
    setError('The transaction failed! Please try again.');
  }
  }


    return (
        <>
        <div className="summary-validator-pane d-flex mt-4 justify-content-center align-items-center flex-column">
            <h2 className="mt-4"> Summary </h2> 
            <p className="mt-2 mb-1"> Total Stake: <span className="font-bold">{stakingAmount} {selectedNetwork.base_denom.slice(1).toUpperCase()}</span></p>
            <p className="mb-1">Redemption Rate:  <span className="font-bold">1 {selectedNetwork.local_denom[1] + selectedNetwork.local_denom.slice(2).toUpperCase()} =  {parseFloat(selectedNetwork?.redemption_rate).toFixed(4)} {selectedNetwork.base_denom.slice(1).toUpperCase()} </span></p>
            <p className="mb-2"> {selectedNetwork.local_denom[1] + selectedNetwork.local_denom.slice(2).toUpperCase()} Received:  <span className="font-bold">{(stakingAmount/(selectedNetwork?.redemption_rate)).toFixed(6)}</span></p>
            <hr className="line"/>
            <h4 className="mt-2 mb-3"> Validator List: </h4>
        {renderValidators()}
      
        <button  className="stake-button mt-3 mb-2" onClick={onStakeClick}> Stake  </button>
 
         {showOsmoMessage && <p className="mt-3">Due to congestion on the Osmosis chain, the minting of qOSMO can take longer than usual.</p>}
         <div className="spinner">
        {loading && <SpinnerCircular />}
        </div>
        {loading && <p className="mt-3"> Transaction in progress... </p>}
        {error !== '' && !loading && <p className="mt-3"> {error}</p>}
       
        </div>
        </>
    );
}
import React, {useEffect} from 'react'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import './CongratulationsPane.css';
import { setStakingStep } from "../../../slices/stakingActiveStep";
import { useSelector, useDispatch } from 'react-redux'
import {  setSelectedValidatorList } from "../../../slices/validatorList";
import Moment from 'moment';

import { selectedNetworkSelector} from "../../../slices/selectedNetwork";


export default function CongratulationsPane() {
  const dispatch = useDispatch();

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

  const {selectedNetwork} = useSelector(selectedNetworkSelector);
      const { width, height } = useWindowSize()
      const [showOsmoMessage, setShowOsmoMessage] = React.useState(false);

      const stakeAnotherNetwork = () => {
            // @ts-expect-error
        dispatch(setStakingStep(2));
                //    @ts-expect-error
    dispatch(setSelectedValidatorList([]))


      }
    return (
        <>
        <div className="congratulations-pane d-flex mt-5 justify-content-center align-items-center flex-column">
    <h2 className="mt-5">Thanks for Staking.
</h2> 
{showOsmoMessage && <h5 className="mt-2">   Due to congestion on the Osmosis chain, the minting of qOSMO can take longer than usual.</h5>}
    <h5 className="mt-2">Your {selectedNetwork.local_denom[1] + selectedNetwork.local_denom.slice(2).toUpperCase()} will arrive in your Quicksilver wallet shortly.</h5>
    <div className="button-container mt-4">
        <button onClick={stakeAnotherNetwork} className="stake mx-2"> Stake Another </button>
        </div>
    </div>
    </>
    );
}
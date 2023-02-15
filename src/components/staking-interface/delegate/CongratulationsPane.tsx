import React from 'react'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import './CongratulationsPane.css';
import { setStakingStep } from "../../../slices/stakingActiveStep";
import { useSelector, useDispatch } from 'react-redux'
import {  setSelectedValidatorList } from "../../../slices/validatorList";

import { selectedNetworkSelector} from "../../../slices/selectedNetwork";

export default function CongratulationsPane() {
  const dispatch = useDispatch();

  const {selectedNetwork} = useSelector(selectedNetworkSelector);
      const { width, height } = useWindowSize()

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
    <h5 className="mt-2">Your {selectedNetwork.local_denom[1] + selectedNetwork.local_denom.slice(2).toUpperCase()} will arrive in your Quicksilver wallet shortly.</h5>
    <div className="button-container mt-4">
        <button onClick={stakeAnotherNetwork} className="stake mx-2"> Stake Another </button>
        </div>
    </div>
    </>
    );
}
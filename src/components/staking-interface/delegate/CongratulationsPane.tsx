import React from 'react'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import './CongratulationsPane.css';
import { setStakingStep } from "../../../slices/stakingActiveStep";
import { useSelector, useDispatch } from 'react-redux'
import {  setSelectedValidatorList } from "../../../slices/validatorList";


export default function CongratulationsPane() {
  const dispatch = useDispatch();
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
    <h4 className="mt-5">Your assets have been successfully staked!</h4> 
    <div className="button-container mt-4">
        <button onClick={stakeAnotherNetwork} className="stake mx-2"> Stake again</button>
        </div>
    </div>
    </>
    );
}
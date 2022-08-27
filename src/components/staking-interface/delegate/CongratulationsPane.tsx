import React from 'react'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import './CongratulationsPane.css';
import { setStakingStep } from "../../../slices/stakingActiveStep";
import { useSelector, useDispatch } from 'react-redux'


export default function CongratulationsPane() {
  const dispatch = useDispatch();
      const { width, height } = useWindowSize()

      const stakeAnotherNetwork = () => {
            // @ts-expect-error
        dispatch(setStakingStep(2));
        //   props.setActiveStep(2);
        //  props.setIsStaked(false);
        //  props.setSelectedNetwork("Select a network");
        //  props.setShowAllocationsPane(false);
        //  props.setStateExistingDelegations([]);
        //  props.setSelectedValidators([]);

      }
    return (
        <>
        <div className="congratulations-pane d-flex mt-5 justify-content-center align-items-center flex-column">
    <h4 className="mt-5">Congratulations! You've successfully staked the tokens!</h4> 
    <div className="button-container mt-4">
        <button onClick={stakeAnotherNetwork} className="stake mx-2"> Stake on another network </button>
        </div>
    </div>
    <Confetti recycle={false}
      width={width}
      height={height}
    />
    </>
    );
}
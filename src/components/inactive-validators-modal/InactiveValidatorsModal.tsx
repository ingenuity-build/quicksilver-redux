
import "./InactiveValidatorsModal.css";

import { useDispatch, useSelector} from 'react-redux';

import React, {useEffect} from 'react';
import { validatorListSelector} from "../../slices/validatorList";

import { increaseStakingStep } from "../../slices/stakingActiveStep";
import {  setModalClose } from '../../slices/inactiveValidatorsModal';

export default function InactiveValidatorsModal() {
    const {selectedValidatorList} = useSelector(validatorListSelector);
    const dispatch = useDispatch();

      
const onNext = () => {
   // @ts-expect-error
   dispatch(increaseStakingStep());
}
const onBack = () => {
    // @ts-expect-error
    dispatch(setModalClose());
 }
    return (
        <>
    <div className="connect-wallet-modal p-5">
        <h5> You are about to delegate to the following inactive validator(s)</h5>
        {selectedValidatorList.filter((val:any) => val.status !== 'BOND_STATUS_BONDED').map((val: any) => 
<>  
<h5> {val.name}</h5>

</>
        )}
<button onClick={onBack}>Go back</button>
<button onClick={onNext}>Proceed</button>
    </div> 
    </>
    );
    
}

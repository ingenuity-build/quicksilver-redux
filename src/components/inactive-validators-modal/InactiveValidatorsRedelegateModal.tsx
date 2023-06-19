      

import "./InactiveValidatorsModal.css";

import { useDispatch, useSelector} from 'react-redux';

import React, {useEffect} from 'react';
import { validatorListSelector} from "../../slices/validatorList";

import {  increaseRedelegateStep} from "../../slices/relegateActiveStep";
import {  setModalClose } from '../../slices/inactiveValidatorsRedelegateModal';

export default function InactiveValidatorsRedelegateModal() {
    const {redelegateValidatorList} = useSelector(validatorListSelector);
    const dispatch = useDispatch();

      
const onNext = () => {
   // @ts-expect-error
   dispatch(increaseRedelegateStep());
}
const onBack = () => {
    // @ts-expect-error
    dispatch(setModalClose());
 }
    return (
        <>
    <div className="inactive-validator-modal p-5">
        <h5 className="font-bold mb-3"> You are about to delegate to the following inactive validator(s):</h5>
        {redelegateValidatorList.filter((val:any) => val.status !== 'BOND_STATUS_BONDED').map((val: any) => 
<>  
<p className="validator-name"> {val.name}</p>

</>
        )}
        <div className="button-container text-center mt-5">
        <button  className="proceed-button mx-3" onClick={onNext}>Proceed</button>
<button className="back-button mx-3" onClick={onBack}>Go back and choose again</button>

</div>
    </div> 
    </>
    );
    
}

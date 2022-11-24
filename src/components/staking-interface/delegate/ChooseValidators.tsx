import React , { useEffect, useState } from "react";

import { useDispatch, useSelector } from 'react-redux'
import { selectedNetworkSelector} from "../../../slices/selectedNetwork";
import { _loadValsAsync , validatorListSelector, setSelectedValidatorList, getValidatorListSuccess, } from "../../../slices/validatorList";
import './ChooseValidators.css';
import { increaseStakingStep, decreaseStakingStep } from "../../../slices/stakingActiveStep";
import { listenerCancelled } from "@reduxjs/toolkit/dist/listenerMiddleware/exceptions";


export interface Data {
    voting_power: string;
    rank: number;
    commission: string;
    name: string;
    address: string;
    logo: string;
    active? : boolean;
  }


export default function ChooseValidators() {
   
    const [searchTerm, setSearchTerm] = React.useState('');

    const dispatch = useDispatch()
    const {selectedNetwork} = useSelector(selectedNetworkSelector);
    const {validatorList, selectedValidatorList} = useSelector(validatorListSelector);
   // const {selectedValidatorList} = useSelector(selectedValidatorListSelector);
    const [selectedValidators, setSelectedValidators] = React.useState<Array<Data>>(selectedValidatorList);
    const [validators, setValidators] = React.useState(validatorList);

    

      const filterData = () => {
        setValidators(validatorList.filter((val: any) => val.name.toLowerCase().includes(searchTerm.toLowerCase())));
     }
    
     React.useEffect(() => {
         if(searchTerm) {
         filterData();
         } else {
            
             setValidators(validatorList)
         }
     },[searchTerm])

     React.useEffect(() => {
        if(selectedValidatorList.length === 0 ) {
            // let newArray = [];
            // newArray = validators.map((val: any) => { val.active = false; return val});
            let newData = validators.map((val: any) => 
            Object.assign({}, val, {active:false})
            )       
            console.log(newData);
            setValidators(newData);
        }  else {
            let newData = validators.map((val: any) => {
                if(selectedValidatorList.find((x: any) => x.address === val.address)) {
                   return Object.assign({}, val, {active: true})
                } else {
                   return Object.assign({}, val, {active:false})
                }   
            }
            )   
            console.log(newData)
            setValidators(newData);
        }
           // validatorList.find((x: any) => x.address === row.validator_address )?.name
        
   
        
    }, [])

     const handleChange = (e: any) => {
        setSearchTerm(e.target.value);
   }

   const addValidator = (e: React.MouseEvent<HTMLElement>, validator: Data) => {
    let position = selectedValidators.findIndex((val) => validator.address === val.address);
    if(position === -1) {
         validator.active = true;
        setSelectedValidators([...selectedValidators, validator]);
           
            //   dispatch(getValidatorListSuccess([...validators, validator]));


    } else {
        let validatorArray = JSON.parse(JSON.stringify(selectedValidators));
        validatorArray.splice(position,1)
        setSelectedValidators(validatorArray);
         validator.active = false;

    }
}

const onNext = () => {
    if(selectedValidators) {
        //    @ts-expect-error
    dispatch(setSelectedValidatorList(selectedValidators))
        // @ts-expect-error
    dispatch(increaseStakingStep());
  }
   
    }

    const onPrevious = () => {
        if(selectedValidators) {
            //    @ts-expect-error
        dispatch(setSelectedValidatorList(selectedValidators))
            // @ts-expect-error
        dispatch(decreaseStakingStep());
      }
       
        }


    return (

   <div className="validator-selection-pane d-flex flex-column align-items-center">
        <h2 className="mt-3"> Choose validators </h2>
        
        {/* <input className="mt-2 px-2" type="text"  value={searchTerm} onChange={handleChange} placeholder="Search validators"/> */}

          <div className="mt-3 validators row w-100 justify-content-center">
          {validators.map((row: any) =>
          <>
                <div onClick={ (e) => addValidator(e,row)} className={`validator-card col-3 m-3 ${row?.active ? 'val-active' : ''}`}>
                <div className="d-flex align-items-start"> 
                     {/* <img alt="Validator Icon" src={row.logo ? row.logo : Icon}/> */}
               <div className="card-details">
                <h6> {row?.name} </h6>
                {/* <h4 className="font-bold">  Reward </h4> */}
                </div>
                </div>

            </div>
         
          </>
  
)}
              </div>
              {selectedValidators.length > 8 && <p className="mt-3"> A maximum of 8 validators can be selected</p>}

<div className="mt-5 button-container">
        <button onClick={onPrevious} className="prev-button mx-3" > Previous</button>
        <button disabled={selectedValidators.length > 8 || selectedValidators.length === 0 } className="next-button mx-3" onClick={onNext}  >Next</button>
    </div>
</div>
          
    


    );
}
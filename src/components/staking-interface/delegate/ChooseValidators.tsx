import React , { useEffect, useState } from "react";

import { useDispatch, useSelector } from 'react-redux'
import { selectedNetworkSelector} from "../../../slices/selectedNetwork";
import { _loadValsAsync , validatorListSelector, setSelectedValidatorList, getValidatorListSuccess, } from "../../../slices/validatorList";
import './ChooseValidators.css';
import { increaseStakingStep, decreaseStakingStep } from "../../../slices/stakingActiveStep";
import { listenerCancelled } from "@reduxjs/toolkit/dist/listenerMiddleware/exceptions";
// import osmosis from '../../../assets/osmosis';
// import qStar from '../../../assets/qStar.png';
import ValidatorImg from '../../../assets/validator.png';


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
    const {validatorList,hasErrors, selectedValidatorList} = useSelector(validatorListSelector);
   // const {selectedValidatorList} = useSelector(selectedValidatorListSelector);
    const [selectedValidators, setSelectedValidators] = React.useState<Array<Data>>(selectedValidatorList);
    const [validators, setValidators] = React.useState(validatorList);

    

      const filterData = () => {
        let newData = validatorList.map((val: any) => {
            if(selectedValidators.find((x: any) => x.address === val.address)) {
               return Object.assign({}, val, {active: true})
            } else {
               return Object.assign({}, val, {active:false})
            }   
        }
        )   
        setValidators(newData.filter((val: any) => val.name.toLowerCase().includes(searchTerm.toLowerCase())));
     }
    
     React.useEffect(() => {
         if(searchTerm) {
         filterData();
         } else {
            let newData = validatorList.map((val: any) => {
                if(selectedValidators.find((x: any) => x.address === val.address)) {
                   return Object.assign({}, val, {active: true})
                } else {
                   return Object.assign({}, val, {active:false})
                }   
            }
            )   
            setValidators(newData);
         }
     },[searchTerm])

     React.useEffect(() => {
        if(selectedValidatorList.length === 0 ) {
            // let newArray = [];
            // newArray = validators.map((val: any) => { val.active = false; return val});
            let newData = validators.map((val: any) => 
            Object.assign({}, val, {active:false})
            )       
            setValidators([...newData].sort(() => Math.random() - 0.5));
        }  else {
            let newData = validators.map((val: any) => {
                if(selectedValidatorList.find((x: any) => x.address === val.address)) {
                   return Object.assign({}, val, {active: true})
                } else {
                   return Object.assign({}, val, {active:false})
                }   
            }
            )   
            setValidators([...newData].sort(() => Math.random() - 0.5));
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
        <h2 className="mt-3 choose-heading"> Choose Validators </h2>
        
        <input className="mt-2 px-2 search" type="text"  value={searchTerm} onChange={handleChange} placeholder="Search Validators"/>

          <div className="mt-3 validators row justify-content-center">
          {validatorList.length === 0 && !hasErrors && <p className="text-center"> There's an issue with fetching validator list. Please try again</p>}
          {validators.map((row: any) =>
          <>
                <div onClick={ (e) => addValidator(e,row)} className={`validator-card col-3 m-3 ${row?.active ? 'val-active' : ''}`}>
                <div className="d-flex align-items-start"> 
                     {/* <img alt="Validator Icon" src={row.logo ? row.logo : Icon}/> */}
               <div className="card-details d-flex align-items-center">
                <img src={`/images/${selectedNetwork.account_prefix}/${row.address}.png`} onError={(e) => (e.currentTarget.src = ValidatorImg)} alt={'Logo'}></img>
                <h6 className="p-2"> {row?.name} </h6>
                {/* <h4 className="font-bold">  Reward </h4> */}
                </div>
                </div>
            </div>
         
          </>
  
)}
{hasErrors && <p className="text-center"> There's an issue with fetching the validators. Please try again</p>}

              </div>
              <p className="text-center mt-3">Showing {validators.length} validators... </p>
              {selectedValidators.length > 8 && <p className="mt-3"> A maximum of 8 validators can be selected</p>}

<div className="mt-2 button-container">
        <button onClick={onPrevious} className="prev-button mx-3" > Previous</button>
        <button disabled={selectedValidators.length > 8 || selectedValidators.length === 0 } className="next-button mx-3" onClick={onNext}  >Next</button>
    </div>
</div>
          
    


    );
}
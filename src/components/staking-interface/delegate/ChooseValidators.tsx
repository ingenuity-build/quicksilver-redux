import React , { useEffect, useState } from "react";

import { useDispatch, useSelector } from 'react-redux'
import { selectedNetworkSelector} from "../../../slices/selectedNetwork";
import { _loadValsAsync , validatorListSelector, selectedValidatorListSelector, setSelectedValidatorList} from "../../../slices/validatorList";
import './ChooseValidators.css';

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
    const {validatorList} = useSelector(validatorListSelector);
    // const {selectedValidatorList} = useSelector(selectedValidatorListSelector);
    const [selectedValidators, setSelectedValidators] = React.useState<Array<Data>>([]);
    const [validators, setValidators] = React.useState(validatorList);
    
    useEffect(() => {
        if (selectedNetwork !== "Select a network") {
                // @ts-expect-error
            dispatch(_loadValsAsync(selectedNetwork.chain_id));
        }
      }, [selectedNetwork])

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

            let newArray = [];
            newArray = validators.map((val: any) => { val.active = false; return val});
            console.log(newArray);
            setValidators(newArray);
        
    }, [])

     const handleChange = (e: any) => {
        setSearchTerm(e.target.value);
   }

   const addValidator = (e: React.MouseEvent<HTMLElement>, validator: Data) => {
    let position = selectedValidators.findIndex((val) => validator.name === val.name);
    if(position === -1) {
        // validator.active = true;
    setSelectedValidators([...selectedValidators, validator]);
    } else {
        let validatorArray = JSON.parse(JSON.stringify(selectedValidators));
        validatorArray.splice(position,1)
        setSelectedValidators(validatorArray);
        // validator.active = false;
    }
}

const onNext = () => {
    if(selectedValidators) {
        //    @ts-expect-error
    dispatch(setSelectedValidatorList(selectedValidators))
   
    }
}
    return (

   <div className="validator-selection-pane d-flex flex-column align-items-center">
        <h2 className="mt-3"> Choose validators </h2>
        <input className="mt-2 px-2" type="text"  value={searchTerm} onChange={handleChange} placeholder="Search validators"/>
        {validators.length}
          <div className="mt-3 validators row w-100 justify-content-center">
          {validators.map((row: any) =>
          <>
                <div onClick={ (e) => addValidator(e,row)} className={`validator-card col-3 m-3 ${row.active ? 'val-active' : ''}`}>
                <div className="d-flex align-items-start"> 
                     {/* <img alt="Validator Icon" src={row.logo ? row.logo : Icon}/> */}
               <div className="card-details">
                <h6> {row.name} </h6>
                {/* <h4 className="font-bold">  Reward </h4> */}
                </div>
                </div>

            </div>
         
          </>
  
)}
              </div>
              {selectedValidators.length > 8 && <p className="mt-3"> A maximum of 8 validators can be selected</p>}

<div className="mt-5 button-container">
        <button className="prev-button mx-3" > Previous</button>
        <button disabled={selectedValidators.length > 8 || selectedValidators.length === 0 } className="next-button mx-3" onClick={onNext}  >Next</button>
    </div>
</div>
          
    


    );
}
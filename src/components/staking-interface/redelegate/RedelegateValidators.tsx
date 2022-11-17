import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { _loadValsAsync , validatorListSelector, setSelectedValidatorList, getValidatorListSuccess, setRedelegateValidatorList, } from "../../../slices/validatorList";
import { increaseRedelegateStep } from '../../../slices/relegateActiveStep';
export interface Data {
    voting_power: string;
    rank: number;
    commission: string;
    name: string;
    address: string;
    logo: string;
    active? : boolean;
  }

export default function RedelegateValidators() {
    const dispatch = useDispatch()
    const {validatorList, selectedValidatorList} = useSelector(validatorListSelector);
    const [selectedValidators, setSelectedValidators] = React.useState<Array<Data>>(selectedValidatorList);
    const [validators, setValidators] = React.useState(validatorList);

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
             // @ts-expect-error
        dispatch(setRedelegateValidatorList(selectedValidators))
   
        // @ts-ignore
        dispatch(increaseRedelegateStep())

    }

    return  (
        <div className="validator-selection-pane d-flex flex-column align-items-center">
        <h2 className="mt-3"> Choose validators </h2>
        

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

<div className="mt-5 button-container">
<button onClick={onNext}> NEXT</button>
    </div>
</div>
          
 
    )
}

import React, {useEffect, useState} from 'react';
import {_loadExistingValsAsync} from '../../../slices/existingDelegations';
import { useSelector, useDispatch } from 'react-redux'
import { selectedNetworkWalletSelector } from '../../../slices/selectedNetworkWallet';
import { selectedNetworkSelector} from "../../../slices/selectedNetwork";
import { validatorListSelector} from "../../../slices/validatorList";
import {existingDelegationsSelector, setSelectedExistingDelegations} from "../../../slices/existingDelegations";
import { increaseStakingStep } from "../../../slices/stakingActiveStep";

export default function ChoosExistingDelegations() {
  const dispatch = useDispatch();
  const {selectedNetwork} = useSelector(selectedNetworkSelector);
  const {networkAddress} = useSelector(selectedNetworkWalletSelector);
  const {validatorList} = useSelector(validatorListSelector);
  const {existingDelegations, selectedExistingDelegations} = useSelector(existingDelegationsSelector);
  const [selectedLocalExistingDelegations, setSelectedLocalExistingDelegations] = useState<Array<any>>(selectedExistingDelegations);
  const [existingDelegationsLocal, setExistingDelegations] = React.useState(existingDelegations);
    useEffect(() => {
        console.log(networkAddress)
        if (selectedNetwork !== "Select a network" && networkAddress !== '') {


                 // @ts-expect-error
         dispatch(_loadExistingValsAsync(networkAddress, selectedNetwork.chain_id))
        }
      }, [selectedNetwork])

      React.useEffect(() => {
        if(existingDelegations){
        let newData = existingDelegations.map((val: any) => 
Object.assign({}, val, {active:false})
)
        console.log(newData);
        setExistingDelegations(newData);
        }
    
}, [existingDelegations])

      const addDelegation = (e: React.MouseEvent<HTMLElement>, delegation: any) => {
    //     let newData = validators.map((val: any) => 
    //     Object.assign({}, val, {active:false})
    // )
    //             console.log(newData);
    //             setValidators(newData);
        let position = selectedLocalExistingDelegations.findIndex((val: any) => delegation.validator_address === val.validator_address );
        if(position === -1) {
            delegation.active = true;
        setSelectedLocalExistingDelegations([...selectedLocalExistingDelegations, delegation]);
        } else {
            let validatorArray = JSON.parse(JSON.stringify(selectedLocalExistingDelegations));
            validatorArray.splice(position,1)
            setSelectedLocalExistingDelegations(validatorArray);
            delegation.active = false;
        }
    }


    const onNext = () => {

          selectedLocalExistingDelegations.forEach((x) => {
            x.name = validatorList.find((y: any) => y.address === x.validator_address )?.name
          })
             //   @ts-expect-error
       dispatch(setSelectedExistingDelegations(selectedLocalExistingDelegations));
               // @ts-expect-error
    dispatch(increaseStakingStep());

      
    }

      return (
      
        <div className="existing-delegations-pane d-flex flex-column align-items-center ">
        <h2 className="mt-3"> Choose existing delegations </h2>
               {existingDelegationsLocal.length > 0 && <div className="mt-3 delegations row w-100 justify-content-center">
                {existingDelegationsLocal.map((row: any) =>
          <>   
          <div onClick={ (e) => addDelegation(e,row)} className={`validator-card col-3 m-3 ${row.active ? 'val-active' : ''}`}>
               <div className="d-flex align-items-start"> 
                     {/* <img alt="Validator Icon" src={Icon}/> */}
                
               <div className="card-details">
                <h5> {validatorList.find((x: any) => x.address === row.validator_address )?.name }</h5>
                <h4 className="font-bold"> {row.coins[0].amount/(Math.pow(10, selectedNetwork.decimalPoint))} {row.coins[0].denom.charAt(1).toUpperCase() + row.coins[0].denom.slice(2)} </h4>
                </div>
              </div>
                </div>
              

          </>
          
   
  
)}

                        
        </div>}
        {/* {props.existingDelegations.length === 0 && <p> There are no existing delegations yet! </p>}
        <div className="mt-5 button-container">
                <button onClick={props.prev} className="prev-button mx-3"> Previous</button>
                <button disabled={ selectedLocalExistingDelegations.length === 0 ?  true: false} onClick={onNext} className="next-button mx-3" >Next</button>
            </div> */}
                            <button  onClick={onNext} className="next-button mx-3" >Next</button>
        </div>
    );

}
import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {increaseStakingStep} from '../../../slices/stakingActiveStep';
import { selectedNetworkSelector, setSelectedNetwork, setSelectedNetworkFunc } from "../../../slices/selectedNetwork";
import { fetchIntents, intentsSelector } from '../../../slices/intents';
import {quicksilverSelector} from '../../../slices/quicksilver';
import { increaseRedelegateStep } from '../../../slices/relegateActiveStep';
import { validatorListSelector} from "../../../slices/validatorList";
import './RedelegateNetworkSelection.css';

export default function RedelegateNetworkSelection() {
    const dispatch = useDispatch()
    const {selectedNetwork} = useSelector(selectedNetworkSelector);
    const {quicksilverAddress} = useSelector(quicksilverSelector);
    const {intents} = useSelector(intentsSelector)
    const {validatorList} = useSelector(validatorListSelector);
    const [intentArray, setIntentArray] = React.useState([]);
    const [showIntent, setShowIntent] = React.useState(false);
    useEffect(() => {

    if( selectedNetwork !== "Select a network" ) {
     // @ts-ignore
     dispatch(fetchIntents(selectedNetwork.chain_id, quicksilverAddress))
    }
    }, [ selectedNetwork])

    useEffect(() => {
        if( selectedNetwork !== "Select a network" ) {
        if(intents) {
            let intentArray = [];
            intents.forEach((intent: any) => {
                // @ts-ignore
                intentArray.push( { "name" : validatorList.find((x: any) => x.address === intent.valoper_address )?.name, "weight": intent.weight})
            })
           setIntentArray(intentArray);
           setShowIntent(true);

        }
        }
    }, [selectedNetwork, intentArray])

    const onNext = () => {
        // @ts-ignore
        dispatch(increaseRedelegateStep())

    }
    return  (
    <div className="mt-5 d-flex flex-column justify-content-center align-items-center">
        
<div className="text-center">
  <h2 className="mt-4">Choose your network </h2>
      <p className="mt-2">Choose the network from the dropdown in the Navbar</p> 
        </div>
       
       {selectedNetwork !== "Select a network" && intents.length > 0 &&  <div>
        <p> Your current intent is:</p>
        <div className="intents">
            {intentArray.map((intent: any) => 
            <>
                <p>{intent.name} : {+(100*intent.weight).toFixed(2) } %</p>
                </>
            )}
        </div>
        <button className="mt-4 reset-intent" onClick={onNext}> RESET INTENT</button>
        </div>}
        {selectedNetwork !== "Select a network" && intents.length === 0 &&  <div>
        <p> You have not set the intent yet. Please click on the button. </p>
        <button className="mt-4 reset-intent" onClick={onNext}> SET INTENT</button>
        </div>}
       
        </div>

       
    )
}
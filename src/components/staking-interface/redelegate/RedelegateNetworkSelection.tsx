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
    const [showIntent, setShowIntent] = React.useState(false);
    useEffect(() => {

    if( selectedNetwork !== "Select a network" ) {
     // @ts-ignore
     dispatch(fetchIntents(selectedNetwork.chain_id, quicksilverAddress))
    }
    }, [ selectedNetwork])



    const onNext = () => {
        console.log('byee')
        alert("bye")
        // @ts-ignore
        dispatch(increaseRedelegateStep())

    }
    return  (
    <div className="redelegate-network-selection  d-flex flex-column justify-content-center align-items-center">
        
        {selectedNetwork === "Select a network" && <div className="text-center">
  <h2 className="mt-4">Choose your network </h2>
      <p className="mt-2">Choose the network from the dropdown in the Navbar</p> 
        </div>}
       
       {selectedNetwork !== "Select a network" && intents.length > 0 &&  <div className="intent-plane">
        <h3 className="mt-5"> Your current intent is:</h3>
        <div className="intents mt-5">
            {intents.filter((intent:any) => intent.weight > 0).map((intent: any) => 
            <>
                <h6 className="mb-2">{validatorList.find((x: any) => x.address === intent.valoper_address ) ? validatorList.find((x: any) => x.address === intent.valoper_address ).name : ''} : {+(100*intent.weight).toFixed(2) } %</h6>
                </>
            )}
        </div>
   
        <button className="mt-4 reset-intent m-auto" onClick={onNext}> RESET INTENT</button>
      
        </div>}
        {selectedNetwork !== "Select a network" && intents.length === 0 &&  <div>
        <p> You have not set the intent yet. Please click on the button. </p>

        <button className="mt-4 reset-intent" onClick={onNext}> SET INTENT</button>
  
        </div>}
       
        </div>

       
    )
}
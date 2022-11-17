import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {increaseStakingStep} from '../../../slices/stakingActiveStep';
import { selectedNetworkSelector, setSelectedNetwork, setSelectedNetworkFunc } from "../../../slices/selectedNetwork";
import { fetchIntents, intentsSelector } from '../../../slices/intents';
import {quicksilverSelector} from '../../../slices/quicksilver';
import { increaseRedelegateStep } from '../../../slices/relegateActiveStep';

export default function RedelegateNetworkSelection() {
    const dispatch = useDispatch()
    const {selectedNetwork} = useSelector(selectedNetworkSelector);
    const {quicksilverAddress} = useSelector(quicksilverSelector);
    const {intents} = useSelector(intentsSelector)
    useEffect(() => {

    if( selectedNetwork !== "Select a network" ) {
     // @ts-ignore
     dispatch(fetchIntents(selectedNetwork.chain_id, quicksilverAddress))
    }
    }, [ selectedNetwork])

    const onNext = () => {
        // @ts-ignore
        dispatch(increaseRedelegateStep())

    }
    return  (
    <div className="mt-5 d-flex justify-content-center align-items-center">
        
<div className="text-center">
  <h2 className="mt-4">Choose your network </h2>
      <p className="mt-2">Choose the network from the dropdown in the Navbar</p> 
        </div>

        <div className="intents">
            {intents.map((intent: any) => 
            <>
                <p>{intent.valoper_address} : {intent.weight}</p>
                </>
            )}
        </div>
        <button onClick={onNext}> RESET INTENT</button>
        </div>

       
    )
}
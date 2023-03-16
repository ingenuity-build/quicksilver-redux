import React, {useEffect} from 'react';
import NetworkSelection from './NetworkSelection';
import ChooseValidators from './ChooseValidators';
import ChooseAllocations from './ChooseAllocations';
import ChoosExistingDelegations from './ChooseExistingDelegations';
import ConnectWallet from './ConnectWallet';
import { useSelector, useDispatch } from 'react-redux'
import {setStakingStep, stakingActiveStep} from '../../../slices/stakingActiveStep';
import { selectedNetworkSelector, setSelectedNetworkFunc} from "../../../slices/selectedNetwork";
import { _loadValsAsync , validatorListSelector, setSelectedValidatorList} from "../../../slices/validatorList";
import { selectedNetworkWalletSelector } from '../../../slices/selectedNetworkWallet';
import {_loadExistingValsAsync} from '../../../slices/existingDelegations';
import SummaryExistingDelegations from './SummaryExistingDelegations';
import SummaryValidators from './SummaryValidators';
import CongratulationsPane from './CongratulationsPane';
import { useParams } from 'react-router-dom';
import {quicksilverSelector} from '../../../slices/quicksilver';
import { networksSelector } from '../../../slices/networks'




export default function Delegate(props:any) {
    const dispatch = useDispatch();
    const {selectedNetwork} = useSelector(selectedNetworkSelector);
    const {networkAddress} = useSelector(selectedNetworkWalletSelector);
    const {validatorList, selectedValidatorList} = useSelector(validatorListSelector);
    const activeStep = useSelector(stakingActiveStep);
    const {balances, isQSWalletConnected} = useSelector(quicksilverSelector);
    const { networks } = useSelector(networksSelector);
    let params = useParams()


    useEffect(() => {
        console.log(params.chainid);
        if( !isQSWalletConnected) {
            props.connectKeplr();
            
        }
        if(selectedNetwork === "Select a network") {
        
            console.log('Networks', networks)
        let network = networks.find((y:any) => y.value.chain_id === params.chainid); 
        console.log(network);
             // @ts-expect-error 
             dispatch(setSelectedNetworkFunc(network))
             console.log('heyyy')
          
        
    }


        
      },[networks,isQSWalletConnected])
   

      useEffect(() => {
        
        if(activeStep > 1) {
           // @ts-expect-error
        dispatch(setStakingStep(2));
            // @ts-expect-error
        dispatch(setSelectedValidatorList([]))
        } else {
             // @ts-expect-error
            dispatch(setStakingStep(1))
        }

    }, [])

    
    return (
        <>
        {activeStep === 1 && <ConnectWallet/>}
        {activeStep === 2 && <NetworkSelection/>}
        {activeStep === 3 && <ChooseValidators  />}
        {activeStep === 4 && <ChooseAllocations/>}
        {activeStep === 5 && <SummaryValidators/>}
        {activeStep === 6 && <ChoosExistingDelegations/>}
        {activeStep === 7 && <SummaryExistingDelegations/>}
        {activeStep === 8 && <CongratulationsPane/>}
        </>
    )
}
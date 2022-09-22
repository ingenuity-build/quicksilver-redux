import React, {useEffect, useState} from 'react';
import NetworkSelection from './NetworkSelection';
import ChooseValidators from './ChooseValidators';
import ChooseAllocations from './ChooseAllocations';
import ChoosExistingDelegations from './ChooseExistingDelegations';
import ConnectWallet from './ConnectWallet';
import { useSelector, useDispatch } from 'react-redux'
import {setStakingStep, stakingActiveStep} from '../../../slices/stakingActiveStep';
import { selectedNetworkSelector, setSelectedNetwork, setSelectedNetworkFunc} from "../../../slices/selectedNetwork";
import { networksSelector } from '../../../slices/networks'	;
import { _loadValsAsync , validatorListSelector, setSelectedValidatorList} from "../../../slices/validatorList";
import { selectedNetworkWalletSelector } from '../../../slices/selectedNetworkWallet';
import {_loadExistingValsAsync} from '../../../slices/existingDelegations';
import {quicksilverSelector} from '../../../slices/quicksilver';
import SummaryExistingDelegations from './SummaryExistingDelegations';
import SummaryValidators from './SummaryValidators';
import CongratulationsPane from './CongratulationsPane';
import { useParams } from "react-router-dom";
import networks from '../../../slices/networks';
import { useNetworkState } from 'react-use';


export default function Delegate(props: any) {
    const dispatch = useDispatch();
    let params = useParams()

    const {selectedNetwork} = useSelector(selectedNetworkSelector);
    const {networkAddress} = useSelector(selectedNetworkWalletSelector);
    const {validatorList, selectedValidatorList} = useSelector(validatorListSelector);
    const {balances, isQSWalletConnected} = useSelector(quicksilverSelector);
    const { networks } = useSelector(networksSelector);

    useEffect(() => {
        if (selectedNetwork !== "Select a network") {
                  // @ts-expect-error
         dispatch(_loadValsAsync(selectedNetwork.chain_id));
        //          // @ts-expect-error
        //  dispatch(_loadExistingValsAsync(networkAddress, selectedNetwork.chain_id))
        }
      }, [selectedNetwork])


      useEffect(() => {
        if(params.zone && params.address) {
            props.handleClickOpen();
            if(selectedNetwork === "Select a network") {
                if(networks !== [] && isQSWalletConnected) {
                    console.log('Networks', networks)
                let network = networks.find((y:any) => y.value.chain_id === params.zone); 
                console.log(network);
                     // @ts-expect-error 
                     dispatch(setSelectedNetworkFunc(network))
                     console.log('heyyy')
                        // @ts-expect-error 
                     dispatch(setStakingStep(4))
                }
            }
         
           
        }
      },[networks, isQSWalletConnected])


 


    const activeStep = useSelector(stakingActiveStep);
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
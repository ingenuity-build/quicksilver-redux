import React, {useEffect} from 'react';
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import './Stake.css';
import { useSelector , useDispatch} from 'react-redux'
import {stakingActiveStep} from '../../../slices/stakingActiveStep';
import LogoWhite from '../../../assets/icons/logo-whitestroke.svg';
import LogoGray from '../../../assets/icons/logo-graystroke.png';
import { useLocation} from "react-router-dom";
import { selectedNetworkSelector} from "../../../slices/selectedNetwork";
import { _loadValsAsync } from "../../../slices/validatorList";
import env from "react-dotenv";


export default function Stake() {
  const dispatch = useDispatch();

  const activeStep = useSelector(stakingActiveStep);
  const location = useLocation();
  const {selectedNetwork} = useSelector(selectedNetworkSelector);
  useEffect(() => {
    if (selectedNetwork !== "Select a network") {
        console.log(selectedNetwork.chain_id)
              // @ts-expect-error
     dispatch(_loadValsAsync(selectedNetwork.chain_id));
    //          // @ts-expect-error
    //  dispatch(_loadExistingValsAsync(networkAddress, selectedNetwork.chain_id))
    }
  }, [selectedNetwork])

    return  (
        <>
            <p className="unbonding-message"> The Unbonding feature will be enabled early January 2023. Any assets you stake to the protocol will remain locked until that time.</p>
            <div className="staking-interface row mx-0">
            
            <div className="content">
            <div className="mt-5 stake-options d-flex justify-content-center">
        <Link to="delegate"  className={`${location.pathname === '/stake/delegate'  ? 'active-link mx-3 px-2' : 'mx-3 px-2 link'}`}>Delegate</Link>

        {process.env.REACT_APP_ENABLE_SET_INTENT == 'true' && <Link to="redelegate" className={`${location.pathname === '/stake/redelegate'  ? 'active-link mx-3 px-2' : 'mx-3 px-2 link'}`} >Set Intent</Link>}
        <Link to="undelegate" className={`${location.pathname === '/stake/undelegate'  ? 'active-link mx-3 px-2' : 'mx-3 px-2 link'}`} >Undelegate</Link>
        </div>

        
            <Outlet/>

                </div>

            </div>
        </>

    )
}
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
import Docs from '../../../assets/icons/docs.svg';
import YT from '../../../assets/icons/youtube.svg';


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
                     <p className="unbonding-message"> Unbonding will be enabled soon for assets deposited into the Quicksilver Protocol. Until unbonding is enabled, exit a position by migrating qAssets to Osmosis and swapping in the relevant qAsset pool.</p>
            <div className="staking-interface row mx-0">
            {/* <div className="stepper col-2 d-flex flex-column ">
          
             {location.pathname === '/stake/delegate' && <div className="steps-container">
              <div className="step d-flex mt-5 ml-4 mb-1">
      <div className="d-flex flex-column pr-4 align-items-center">
     <img className="logo" alt="Quicksilver logo" src={LogoWhite}/>
        <div className="line h-100"></div>
      </div>
      <div>
        <h6 className="step-text-bold">Connect Wallet</h6>
      </div>
    </div>
    <div className="step d-flex ml-4 mb-1">
      <div className="d-flex flex-column pr-4 align-items-center">
     <img alt="Quicksilver logo"  className="logo" src={activeStep >=2 ? LogoWhite : LogoGray}/>
        <div className="line h-100"></div>
      </div>
      <div>
      <h6 className={( activeStep >= 2 ? " step-text-bold" : "step-text-gray")}> Choose Network</h6>
      </div>
    </div>
    <div className="step d-flex ml-4 mb-1">
      <div className="d-flex flex-column pr-4 align-items-center">
      <img alt="Quicksilver logo"  className="logo" src={activeStep >=3 ? LogoWhite : LogoGray}/>
        <div className="line h-100"></div>
      </div>
      <div>
        <h6 className={( activeStep >= 3 ? " step-text-bold" : "step-text-gray")}>Allocate Stake</h6>
      </div>
    </div>
    <div className="step d-flex ml-4 mb-1">
      <div className="d-flex flex-column pr-4 align-items-center">
      <img  alt="Quicksilver logo" className="logo" src={activeStep === 5 || activeStep === 7 ? LogoWhite : LogoGray}/>
      </div>
      <div>
        <h6 className={( activeStep === 5 || activeStep === 7 ? " step-text-bold" : "step-text-gray")}>Stake</h6>
      </div>
     
    </div>
    <div className="social-media-icons mt-5 col-2">
        <a href="https://t.me/quicksilverzone" target="_blank" rel="nofollow noopener" title="Telegram">
									<span className="icon-telegram mx-2"></span>
								</a>
								<a href="https://twitter.com/quicksilverzone" target="_blank" rel="nofollow noopener" title="Twitter">
									<span className="icon-twitter mx-2"></span>
								</a>
								<a href="https://discord.com/invite/xrSmYMDVrQ" target="_blank" rel="nofollow noopener" title="Discord">
									<span className="icon-discord mx-2"></span>
								</a>
								<a href="https://medium.com/quicksilverzone" target="_blank" rel="nofollow noopener" title="Medium">
									<span className="icon-medium mx-2"></span>
								</a>
                <a href="https://www.youtube.com/channel/UCFHGQ7SAtIyAlNHewNNVU1A " target="_blank" rel="nofollow noopener" title="Youtube">
											<img className="icon-yt" src={YT}/>
								</a>
								<a href="https://docs.quicksilver.zone/ " target="_blank" rel="nofollow noopener" title="Docs">
									<img className="icon-docs"	 src={Docs}/>
                  </a>
        </div>
              
              </div>}
            </div> */}
   
            <div className="content col-12">
            <div className="mt-5 stake-options d-flex justify-content-center">
        <Link to="delegate"  className={`${location.pathname.includes('/stake/delegate')  ? 'active-link mx-3 px-2' : 'mx-3 px-2 link'}`}>Delegate</Link>

        {process.env.REACT_APP_ENABLE_SET_INTENT == 'true' && <Link to="redelegate" className={`${location.pathname === '/stake/redelegate'  ? 'active-link mx-3 px-2' : 'mx-3 px-2 link'}`} >Set Intent</Link>}
        <Link to="undelegate" className={`${location.pathname === '/stake/undelegate'  ? 'active-link mx-3 px-2' : 'mx-3 px-2 link'}`} >Undelegate</Link>
        </div>

        
            <Outlet/>

                </div>

            </div>
        </>

    )
}

import React from 'react';
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import './Stake.css';
import { useSelector } from 'react-redux'
import {stakingActiveStep} from '../../../slices/stakingActiveStep';
import LogoWhite from '../../../assets/icons/logo-whitestroke.svg';
import LogoGray from '../../../assets/icons/logo-graystroke.png';



export default function Stake() {
  const activeStep = useSelector(stakingActiveStep);
  console.log('active step', activeStep)
    return  (
        <>
     
            <div className="staking-interface row mx-0">
            <div className="stepper col-2 d-flex flex-column ">
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
      <h6 className={( activeStep >= 2 ? " step-text-bold" : "step-text-gray")}>Choose Network</h6>
      </div>
    </div>
    <div className="step d-flex ml-4 mb-1">
      <div className="d-flex flex-column pr-4 align-items-center">
      <img alt="Quicksilver logo"  className="logo" src={activeStep >=3 ? LogoWhite : LogoGray}/>
        <div className="line h-100"></div>
      </div>
      <div>
        <h6 className={( activeStep >= 3 ? " step-text-bold" : "step-text-gray")}>Choose</h6>
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
    <div className="social-media-icons mt-5">
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
        </div>
              
            </div>
            <div className="content col-10">
            <div className="mt-5 stake-options d-flex justify-content-center">
        <Link to="delegate" className="mx-3 px-2 link">Delegate</Link>
        <Link to="redelegate" className="mx-3  px-2 link" onClick={ (event) => event.preventDefault()}>Redelegate</Link>
        <Link to="undelegate" className="mx-3 px-2 link">Undelegate</Link>
        </div>

        
            <Outlet/>

                </div>
            </div>
        </>

    )
}
import { useEffect, useState } from "react";
import React from 'react';
import './Airdrops.css';
import { useSelector, useDispatch } from 'react-redux'
import {airdropsSelector, fetchStargazeAirdropAllocation} from '../../slices/airdrops';

export default function Airdrop() {
  const [address, setAddress] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const handleChange = (e) => setAddress(e.target.value);
  const [unbondingSum, setUnbondingSum] = useState(0);
  const dispatch = useDispatch();
    const { amount, error } = useSelector(airdropsSelector);


  const fetchAllocation = () => {
          // @ts-expect-error
    dispatch(fetchStargazeAirdropAllocation(address))
    setShowMessage(true)
  }

    return (
        <>
          <div className="assets-interface row mx-0">
        
      
     <div className="col-12 max-auto mt-5">
      <div className="mt-5 d-flex flex-column justify-content-center align-items-center">
      <h3 className="text-center mt-5"> STARGAZE Airdrop </h3>
      <p className="text-center coming-soon"> Coming Soon</p>
      <div className="w-50 mt-4 text-center airdrop-container">
        <h5 className="airdrop-text">
        Enter your Stargaze address and check your airdrop allocation.
Eligible addresses will receive QCK tokens airdropped to their 
Quicksilver wallet on airdrop day.
        </h5>
        <input placeholder="starsxxx..." value={address} onChange={handleChange}  className="mt-4 input-box" type="text"/>
        <button disabled={!address} className="next-button mx-3" onClick={fetchAllocation} >Next</button>
       {showMessage && amount !== '0' && !error && <h5 className="mt-4">You will receive <span className="font-bold">{+(amount/100000)} </span> QCK tokens</h5>}
       {showMessage && amount === '0' &&  !error && <h5 className="mt-4">This address is not eligible for this airdrop. Please provide another address.</h5>}
       {showMessage && amount === '0' &&  error && <h5 className="mt-4">Error: {error.charAt(0).toUpperCase() + error.slice(1)}</h5>}
   

        </div>
        
      </div>
      </div>
      
      </div>
      </>
      )
}
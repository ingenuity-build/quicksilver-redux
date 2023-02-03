import React from 'react';
import './ConnectWallet.css';
import {  setModalOpen } from '../../../slices/connectWalletModal';
import { useDispatch, useSelector } from 'react-redux'

export default function ConnectWallet() {
  const dispatch = useDispatch()
  const onButtonClick = () => {
    // @ts-expect-error
  dispatch(setModalOpen());

}

  return (
    <>
        <div className="connect-wallet-pane d-flex flex-column align-items-center ">
                <h1 className=" sub-heading"> Connect Your Wallet To Get Started! </h1>
                <button  onClick={onButtonClick} className="connect-wallet-button mt-5"> Connect Wallet </button> 
                {/* <h4 className="sub-heading"> Deposits will be enabled soon. Stay tuned. </h4> */}
                </div>
    </>
  )
}
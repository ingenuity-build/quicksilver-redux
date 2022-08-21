import React from 'react';
import './ConnectWallet.css';

export default function ConnectWallet() {
  return (
    <>
        <div className="connect-wallet-pane d-flex flex-column align-items-center ">
                <h4 className="sub-heading"> Hey there! </h4>
                <h1 className="mt-3"> Connect your wallet to get started! </h1>
                <button  className="connect-wallet-button mt-5"> Connect Wallet </button> 
                </div>
    </>
  )
}
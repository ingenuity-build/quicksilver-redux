import React , {useEffect} from 'react';
import './ConnectWallet.css';
import {  setModalOpen } from '../../../slices/connectWalletModal';
import { useDispatch, useSelector } from 'react-redux';
import { ethToEvmos } from '@evmos/address-converter'
import { generateEndpointAccount } from '@evmos/provider'
let { bech32 } = require('bech32');



export default  function  ConnectWallet() {

useEffect(() => {
fetch2();
}, [])
async function fetch2(): Promise<any> {
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }
  

    let addrRawData = await fetch(
      `https://lcd.evmos-9000-1.dev.quicksilver.zone${generateEndpointAccount('evmos14n06x2pc93gs7x8y0yy6t6wvy77qwfp2e3e23l')}`,
      options,
    )
  
  
  // NOTE: the node returns status code 400 if the wallet doesn't exist, catch that error
  
  let addrData = await addrRawData.json()
  console.log('addr', addrData)
}
  const dispatch = useDispatch()
  const onButtonClick = () => {
    // @ts-expect-error
  dispatch(setModalOpen());
  let destination;

    destination = ethToEvmos('evmos14n06x2pc93gs7x8y0yy6t6wvy77qwfp2e3e23l')

  // console.log('destination', destination)
  
}

  return (
    <>
        <div className="connect-wallet-pane d-flex flex-column align-items-center ">
                <h4 className="sub-heading"> Hey there! </h4>
                <h1 className="mt-3"> Connect your wallet to get started! </h1>
                <button  onClick={onButtonClick} className="connect-wallet-button mt-5"> Connect Wallet </button> 
                </div>
    </>
  )
}
import React, {useState} from 'react';
import { selectedNetworkWalletSelector } from '../../../slices/selectedNetworkWallet';
import { useSelector, useDispatch } from 'react-redux'
import {quicksilverSelector} from '../../../slices/quicksilver';
import {  setModalOpen } from '../../../slices/connectWalletModal';
import { selectedNetworkSelector } from "../../../slices/selectedNetwork";


import './Undelegate.css';
export default function Undelegate() {
    const {networkAddress, client} = useSelector(selectedNetworkWalletSelector);
    const {isQSWalletConnected} = useSelector(quicksilverSelector);
    const {selectedNetwork} = useSelector(selectedNetworkSelector);
    const [unstakingAmount, setUnstakingAmount] = useState(0);
    const dispatch = useDispatch();
    const onButtonClick = () => {
      // @ts-expect-error
    dispatch(setModalOpen());
  
  }

      const changeAmount = (e: any) => {
        
        if ( e.target.value.match(/^\d{1,}(\.\d{0,6})?$/) ){
                    setUnstakingAmount(e.target.value);


        }
    
    
    
    }
    const onBond = async (e: any) => {

        let msg = {
          typeUrl: "quicksilver/MsgRequestRedemption",
          value: {
            destination_address: networkAddress,
            from_address: "quick104p28ww3lry6ww74r3atggpq0sptsdnax4zax0",
            amount: {
              "amount": unstakingAmount,
              "denom": "qmuon"
            },
          }
        }
    
        const broadcastResult = await client.signAndBroadcast(
          networkAddress,
          [msg],
          {
            "gas": "100000",
            "amount": [
                {
                    "denom": "umuon",
                    "amount": "300"
                  }
            ]
          },
          'Unbonding'
        );
        console.log(broadcastResult);
      }
    return (
        <> 
        {!isQSWalletConnected && <div>
          <div className="connect-wallet-pane d-flex flex-column align-items-center ">
                <h4 className="sub-heading"> Hey there! </h4>
                <h1 className="mt-3"> Connect your wallet to get started! </h1>
                <button  onClick={onButtonClick} className="connect-wallet-button mt-5"> Connect Wallet </button> 
                </div>
        </div>}
        {isQSWalletConnected && selectedNetwork === "Select a network" && <div className='text-center'>
        <h2 className="mt-4">Choose your network </h2>
        <p className="mt-2">Choose the network from the dropdown in the Navbar</p> 
          </div>}
        {isQSWalletConnected && selectedNetwork !== "Select a network" && <div className='unbonding-interface'>
        <div className='mt-5'>
        <h3 className="mt-5 mb-5 text-center">Unbond your qAtom tokens in exchange for Atom </h3>
        <h5 className='text-center mt-4'> Available qAtoms: <span> 2343 qAtoms</span></h5>
        </div>
        <div className="d-flex mt-3 align-items-center justify-content-center">
                    <p className="m-0 mx-3"> Number of qAtoms you want to unbond:</p>
                    <input className="mx-3" type="text" value={unstakingAmount} onChange={ changeAmount}/>
                    {/* <button className="mx-3 p-1 max-button"> MAX </button>  */}
                

                </div>
                <div className="d-flex justify-content-center">
        <button className="unbond text-center mt-5 " onClick={onBond}> UNBOND </button>
        </div>
        </div>}
        </>
    )
}
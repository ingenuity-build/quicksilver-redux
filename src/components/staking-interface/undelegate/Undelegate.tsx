import React from 'react';
import { selectedNetworkWalletSelector } from '../../../slices/selectedNetworkWallet';
import { useSelector, useDispatch } from 'react-redux'
export default function Undelegate() {
    const {networkAddress, client} = useSelector(selectedNetworkWalletSelector);
    const onBond = async (e: any) => {

        let msg = {
          typeUrl: "/quicksilver.interchainstaking.v1.MsgRequestRedemption",
          value: {
            destination_address: networkAddress,
            from_address: "quick104p28ww3lry6ww74r3atggpq0sptsdnax4zax0",
            amount: {
              "amount": 100000,
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
        <h1>Unbond your qAtom tokens in exchange for Atom </h1>
        <button className="unbond" onClick={onBond}> UNBOND </button>
        </>
    )
}
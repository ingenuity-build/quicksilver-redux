import React , { useEffect } from "react"
// import the redux hook

import { useDispatch, useSelector } from 'react-redux'



// import our recipes selector
import { networksSelector, fetchNetworks } from '../../../slices/networks'	;
import { selectedNetworkSelector, setSelectedNetwork, setSelectedNetworkFunc } from "../../../slices/selectedNetwork";
import { setNetworkAddress, setNetworkWallet, setNetworkBalance, balancesNetworkSelector, addressNetworkSelector } from "../../../slices/selectedNetworkWallet";
import { _loadValsAsync } from "../../../slices/validatorList";
import Select from "react-select";
import { initKeplrWithNetwork } from "../../../utils/chains";
import { SigningStargateClient } from "@cosmjs/stargate";
import { getKeplrFromWindow } from '@keplr-wallet/stores';

export default function NetworkSelection() {
    const dispatch = useDispatch()
    const { networks, loading, hasErrors } = useSelector(networksSelector);
    const {selectedNetwork} = useSelector(selectedNetworkSelector)

    useEffect(() => {

      // @ts-expect-error
        dispatch(fetchNetworks())
        // // @ts-expect-error
        // dispatch(setSelectedNetworkFunc('Apple'));

      }, [dispatch])

      useEffect(() => {
        if (selectedNetwork !== "Select a network") {
          connectNetwork(selectedNetwork.chain_id);
        }
      }, [selectedNetwork])

    
    
      const connectNetwork = async (network: string) => {

        initKeplrWithNetwork(async (key: string, val: SigningStargateClient) => {
         // @ts-expect-error
         dispatch(setNetworkWallet(key, val))

    
          let keplr = await getKeplrFromWindow();
          let chainId = await val.getChainId();
          let pubkey = await keplr?.getKey(chainId);
          let bech32 = pubkey?.bech32Address;
          // props.setNetworkAddress(bech32);
     // @ts-expect-error
          dispatch(setNetworkAddress(bech32))
          if (bech32) {
            let roBalance = await val.getAllBalances(bech32);
                  // @ts-expect-error
              dispatch(setNetworkBalance(roBalance));
          }
        }, network);
      }
    

   
    // console.log('Networks: ', networks);	


  let handleNetworkChange = (selected: any) => {
    console.log(selected);
    // @ts-expect-error
        dispatch(setSelectedNetworkFunc(selected));
        
  }

  let fetchValidators = (chainId: string) => {

    // @ts-expect-error
        dispatch(_loadValsAsync(chainId));
        
  }
    return (
        <>
    <h1>Network Selection </h1> 
    <Select className="custom-class mb-3"
        //   defaultValue={{ label: selectedNetwork.account_prefix ? selectedNetwork.account_prefix?.charAt(0).toUpperCase() + selectedNetwork.account_prefix?.slice(1) : '' }}
          options={networks}
          onChange={handleNetworkChange}

        />
        <p>{selectedNetwork.local_denom}</p>
        <p>{selectedNetwork.base_denom}</p>
        <button onClick={() => fetchValidators(selectedNetwork.chain_id)}> LOAD VALIDATOR LIST </button>
    </>

    )
}
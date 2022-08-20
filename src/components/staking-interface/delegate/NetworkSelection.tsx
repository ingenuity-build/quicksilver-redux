import React , { useEffect } from "react"
// import the redux hook

import { useDispatch, useSelector } from 'react-redux'	

// import our recipes selector
import { networksSelector, fetchNetworks } from '../../../slices/networks'	;
import { selectedNetworkSelector, setSelectedNetwork, setSelectedNetworkFunc } from "../../../slices/selectedNetwork";
import Select from "react-select";

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

   
    // console.log('Networks: ', networks);	


  let handleNetworkChange = (selected: any) => {
    console.log(selected);
    // @ts-expect-error
        dispatch(setSelectedNetworkFunc(selected));
        
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
    </>

    )
}
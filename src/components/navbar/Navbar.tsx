import React from 'react';
import { Link } from "react-router-dom";
import { useLocation} from "react-router-dom";
import { initKeplrWithQuickSilver } from "../../utils/chains";
import { SigningStargateClient } from "@cosmjs/stargate"
import { getKeplrFromWindow } from '@keplr-wallet/stores';
import { setQSWallet, walletQSSelector, setQSBalance, balancesQSSelector } from '../../slices/quicksilver';

import { useDispatch, useSelector } from 'react-redux'

export default function Navbar() {
  const dispatch = useDispatch()
  const balances = useSelector(balancesQSSelector);
  const connectKeplr = async () => {

    initKeplrWithQuickSilver(async(key: string, val: SigningStargateClient) => {
      // @ts-expect-error
      dispatch(setQSWallet(key, val))
      // setWallets(new Map<string, SigningStargateClient>(wallets.set(key, val)));
      // setWalletConnection(true);
      let keplr = await getKeplrFromWindow();
      let chainId = await val.getChainId();
      let pubkey = await keplr?.getKey(chainId);
      let bech32 = pubkey?.bech32Address;
      console.log(bech32);
      if (bech32) {
        let roBalance = await val.getAllBalances(bech32);
              // @ts-expect-error
          dispatch(setQSBalance(roBalance));
      }
    });
 
  }

    return (
        <>
         <Link  to="/stake/delegate">STAKE</Link> 
         <Link  to="/pools">POOLS</Link> 
         <Link  to="/airdrop">AIRDROP</Link> 
         <Link  to="/claims">ASSETS</Link> 

         <button onClick={connectKeplr}> Connect Keplr </button>
         
         </>
       
    )
}
import { Link } from "react-router-dom";
import './Landing.css';
 import Logo from '../../assets/quicksilver-logo.png';
 import { GasPrice, calculateFee } from "@cosmjs/stargate";
import { useEffect, useState } from "react";
import { AccountData } from "@cosmjs/amino";
import type { OfflineSigner } from "@cosmjs/proto-signing";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { getOfflineSigner } from "@cosmostation/cosmos-client";

export default function Landing() {
    const CHAIN_ID = "juno-1";
    const [client, setClient] = useState<SigningCosmWasmClient>();
    const [offlineSigner, setOfflineSigner] = useState<OfflineSigner>();
    const [accounts, setAccounts] = useState<readonly AccountData[]>();
    const [balance, setBalance] = useState("");
    const [values, setValues] = useState({
      value: "",
    });
    const { value } = values;

  async function connect() {
    console.log('hey')
    const offlineSigner = await getOfflineSigner(CHAIN_ID);
    // const rpcEndpoint = "https://rpc-juno.itastakers.com/";
    // const client = await SigningCosmWasmClient.connectWithSigner(
    //   rpcEndpoint,
    //   offlineSigner
    // );
    // setOfflineSigner(offlineSigner);
    // setClient(client);
  }

  async function getAccount() {
    if (offlineSigner == null || client == null) {
      return;
    }

    const accounts = await offlineSigner.getAccounts();
    setAccounts(accounts);

    let address = accounts[0].address;
    let result = await client.queryContractSmart(
      "juno1j78x93aq7fmu44vdg35uf8wgvdy3guevef4347",
      { balance: { address } }
    );
    setBalance(result.balance);
  }

  useEffect(() => {
    if (client !== undefined) {
      getAccount();
    }
  }, [client]);

  useEffect(() => {
    connect();
  }, []);

    return    (
        <div className="landing-page">
            <div className="w-80 d-flex align-items-center justify-content-center flex-column">
                <div className="landing-page-content text-center">
             <img alt="Quicksilver Logo" className="logo" src={Logo}/>
             <h2 className="my-3"> QUICKSILVER</h2>
             <p className="mb-5">THE COSMOS LIQUID STAKING ZONE</p> 
        <Link className="px-5 py-3  mt-5" to="/stake/delegate">Get Started</Link> 
        </div>
        <div className="social-media-icons mt-5">
        <a href="https://t.me/quicksilverzone" target="_blank" rel="nofollow noreferrer" title="Telegram">
									<span className="icon-telegram mx-2"></span>
								</a>
								<a href="https://twitter.com/quicksilverzone" target="_blank" rel="nofollow noreferrer" title="Twitter">
									<span className="icon-twitter mx-2"></span>
								</a>
								<a href="https://discord.com/invite/xrSmYMDVrQ" target="_blank" rel="nofollow noreferrer" title="Discord">
									<span className="icon-discord mx-2"></span>
								</a>
								<a href="https://medium.com/quicksilverzone" target="_blank" rel="nofollow noreferrer" title="Medium">
									<span className="icon-medium mx-2"></span>
								</a>
        </div>
        <button onClick={() => connect()}> Connect to  Cosmostation</button>
        </div>
  
        </div>
    
    )
}
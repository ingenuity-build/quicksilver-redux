import { ChainInfo } from "@keplr-wallet/types";
import { getKeplrFromWindow } from '@keplr-wallet/stores';
import { getSigningQuicksilverClient } from "quicksilverjs";
import { SigningStargateClient } from "@cosmjs/stargate"
import { options } from './options';
import { Keplr } from "@keplr-wallet/types";

import { ProdQuickSilverChainInfo, ProdChainInfos } from './chains/prod'
import { TestQuickSilverChainInfo, TestChainInfos } from './chains/test'
import { DevQuickSilverChainInfo, DevChainInfos } from './chains/dev'

import env from "react-dotenv";



const QuickSilverChains : { [index:string] : ChainInfo } = {
  "prod": ProdQuickSilverChainInfo,
  "test": TestQuickSilverChainInfo,
  "dev": DevQuickSilverChainInfo,
}

const Chains : { [index:string] : ChainInfo[] } = {
  "prod": ProdChainInfos,
  "test": TestChainInfos,
  "dev": DevChainInfos,
}   

export const QuickSilverChainInfo : ChainInfo =  QuickSilverChains[env.NODE_ENV] 

const ChainInfos: ChainInfo[] =  Chains[env.NODE_ENV] 

export const initWallet = async (fn: Function, provider: Keplr|undefined):Promise<void> => { 
    if (provider) {
        ChainInfos.forEach((val) => { 
            provider
            .enable(val.chainId)
            .then(async () => { 
                let signer = provider.getOfflineSignerOnlyAmino(val.chainId); 
                let offlineSigner = await SigningStargateClient.connectWithSigner(val.rpc, signer, options)
                fn(val.chainId, offlineSigner)
                console.log("Enabled for chainid " + val.chainId)
            }, (reason) => { 
                provider.experimentalSuggestChain(val).then(async () => { 
                    let signer = provider.getOfflineSignerOnlyAmino(val.chainId); 
                    let offlineSigner = await SigningStargateClient.connectWithSigner(val.rpc, signer, options);
                    fn(val.chainId, offlineSigner)
                    console.log("Added to Keplr for chainid " + val.chainId) 
                }) 
            })
        })
    } 
}

export const initWalletWithQuickSilver = async (fn: Function, provider: Keplr|undefined):Promise<void> => { 
    console.log("debug0")
        if (provider) {
            console.log("debug1")
            provider
            .enable(QuickSilverChainInfo.chainId)
            .then(async () => { 
            console.log("debug2")

                let signer = provider.getOfflineSignerOnlyAmino(QuickSilverChainInfo.chainId); 
                let offlineSigner = await getSigningQuicksilverClient({rpcEndpoint: QuickSilverChainInfo.rpc, signer: signer});
            console.log("debug3")

                fn(QuickSilverChainInfo.chainId, offlineSigner)
                console.log("Enabled for chainid " + QuickSilverChainInfo.chainId)
            }, (reason: any) => { 
                provider.experimentalSuggestChain(QuickSilverChainInfo).then(async () => { 
                    let signer = provider.getOfflineSignerOnlyAmino(QuickSilverChainInfo.chainId); 
                    let offlineSigner = await getSigningQuicksilverClient({rpcEndpoint: QuickSilverChainInfo.rpc, signer: signer});
                    fn(QuickSilverChainInfo.chainId, offlineSigner)
                    console.log("Added to Keplr for chainid " + QuickSilverChainInfo.chainId) 
                }) 
            })
        }
    
   
}

export const initWalletWithNetwork = async (fn: Function, provider: Keplr|undefined, network?: string):Promise<void> => { 
    console.log(network);
    if (provider && network) {
           // @ts-expect-error
        const chain : ChainInfo  = ChainInfos.find( function(el) { return el.chainId === network})
        provider
            .enable(chain?.chainId)
            .then(async () => { 
                let signer = provider.getOfflineSignerOnlyAmino(chain?.chainId); 
                let offlineSigner = await SigningStargateClient.connectWithSigner(chain?.rpc, signer, options)
                fn(chain?.chainId, offlineSigner)
                console.log("Enabled for chainid " + chain?.chainId)
                console.log('Offline Signer 1', offlineSigner);
         
            }, (reason: any) => { 
                provider.experimentalSuggestChain(chain).then(async () => { 
                    let signer = provider.getOfflineSignerOnlyAmino(chain?.chainId); 
                    let offlineSigner = await SigningStargateClient.connectWithSigner(chain?.rpc, signer, options)
                fn(chain?.chainId, offlineSigner)
                    console.log("Added to Keplr for chainid " + chain?.chainId) 
                    console.log('Offline Signer 2', offlineSigner);
                }) 
            })
        }
}

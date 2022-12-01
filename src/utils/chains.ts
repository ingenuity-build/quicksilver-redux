import { ChainInfo } from "@keplr-wallet/types";
import { getKeplrFromWindow } from '@keplr-wallet/stores';
import { getSigningQuicksilverClient } from "quicksilverjs";
import { SigningStargateClient } from "@cosmjs/stargate"
import { options } from './options';

import { ProdQuickSilverChainInfo, ProdChainInfos } from './chains/prod'
import { TestQuickSilverChainInfo, TestChainInfos } from './chains/test'
import { DevQuickSilverChainInfo, DevChainInfos } from './chains/dev'

import env from "@ludovicm67/react-dotenv";



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

export const initKeplr = async (fn: Function):Promise<void> => { 
    const keplr = await getKeplrFromWindow();
    if (keplr) {
        ChainInfos.forEach((val) => { 
            keplr
            .enable(val.chainId)
            .then(async () => { 
                let signer = keplr.getOfflineSignerOnlyAmino(val.chainId); 
                let offlineSigner = await SigningStargateClient.connectWithSigner(val.rpc, signer, options)
                fn(val.chainId, offlineSigner)
                console.log("Enabled for chainid " + val.chainId)
            }, (reason) => { 
                keplr.experimentalSuggestChain(val).then(async () => { 
                    let signer = keplr.getOfflineSignerOnlyAmino(val.chainId); 
                    let offlineSigner = await SigningStargateClient.connectWithSigner(val.rpc, signer, options);
                    fn(val.chainId, offlineSigner)
                    console.log("Added to Keplr for chainid " + val.chainId) 
                }) 
            })
        })
    } 
}

export const initKeplrWithQuickSilver = async (fn: Function):Promise<void> => { 
    console.log(env)
    const keplr = await getKeplrFromWindow();
    if (keplr) {

            keplr
            .enable(QuickSilverChainInfo.chainId)
            .then(async () => { 
                let signer = keplr.getOfflineSignerOnlyAmino(QuickSilverChainInfo.chainId); 
                let offlineSigner = await getSigningQuicksilverClient({rpcEndpoint: QuickSilverChainInfo.rpc, signer: signer});
                fn(QuickSilverChainInfo.chainId, offlineSigner)
                console.log("Enabled for chainid " + QuickSilverChainInfo.chainId)
            }, (reason: any) => { 
                keplr.experimentalSuggestChain(QuickSilverChainInfo).then(async () => { 
                    let signer = keplr.getOfflineSignerOnlyAmino(QuickSilverChainInfo.chainId); 
                    let offlineSigner = await getSigningQuicksilverClient({rpcEndpoint: QuickSilverChainInfo.rpc, signer: signer});
                    fn(QuickSilverChainInfo.chainId, offlineSigner)
                    console.log("Added to Keplr for chainid " + QuickSilverChainInfo.chainId) 
                }) 
            })
        }
}

export const initKeplrWithNetwork = async (fn: Function, network?: string):Promise<void> => { 
    const keplr = await getKeplrFromWindow();
    console.log(network);
    if (keplr && network) {
           // @ts-expect-error
        const chain : ChainInfo  = ChainInfos.find( function(el) { return el.chainId === network})
            keplr
            .enable(chain?.chainId)
            .then(async () => { 
                let signer = keplr.getOfflineSignerOnlyAmino(chain?.chainId); 
                let offlineSigner = await SigningStargateClient.connectWithSigner(chain?.rpc, signer, options)
                fn(chain?.chainId, offlineSigner)
                console.log("Enabled for chainid " + chain?.chainId)
                console.log('Offline Signer 1', offlineSigner);
         
            }, (reason: any) => { 
                keplr.experimentalSuggestChain(chain).then(async () => { 
                    let signer = keplr.getOfflineSignerOnlyAmino(chain?.chainId); 
                    let offlineSigner = await SigningStargateClient.connectWithSigner(chain?.rpc, signer, options)
                fn(chain?.chainId, offlineSigner)
                    console.log("Added to Keplr for chainid " + chain?.chainId) 
                    console.log('Offline Signer 2', offlineSigner);
                }) 
            })
        }
}

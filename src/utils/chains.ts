import { ChainInfo } from "@keplr-wallet/types";
import { getKeplrFromWindow } from '@keplr-wallet/stores';
import { getSigningQuicksilverClient } from "quicksilverjs";
import { SigningStargateClient } from "@cosmjs/stargate"
import { options } from './options';

import { ProdQuickSilverChainInfo, ProdChainInfos } from './chains/prod'
import { TestQuickSilverChainInfo, TestChainInfos } from './chains/test'
import { DevQuickSilverChainInfo, DevChainInfos } from './chains/dev'

import env from "react-dotenv";
import quicksilver from "../slices/quicksilver";



const QuickSilverChains  = {
"preprod": ProdQuickSilverChainInfo,
  "prod": ProdQuickSilverChainInfo,
  "test": TestQuickSilverChainInfo,
  "dev": DevQuickSilverChainInfo,
}

const Chains  = {
"preprod" : ProdChainInfos,
  "prod": ProdChainInfos,
  "test": TestChainInfos,
  "dev": DevChainInfos,
}   

export const QuickSilverChainInfo =  QuickSilverChains[env.NODE_ENV] 

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
    // const keplr = await getKeplrFromWindow();
    // console.log(keplr?.getKey(QuickSilverChainInfo.chainId));
    // @ts-expect-error
    window.cosmostation.providers.keplr
            .enable(QuickSilverChainInfo.chainId)
            .then(async () => { 
                    // @ts-expect-error
                let signer =  window.cosmostation.providers.keplr.getOfflineSignerOnlyAmino(QuickSilverChainInfo.chainId); 
                 let offlineSigner = await getSigningQuicksilverClient({rpcEndpoint: QuickSilverChainInfo.rpc, signer: signer});
                fn(QuickSilverChainInfo.chainId, offlineSigner)
                console.log("Enabled for chainid " + QuickSilverChainInfo.chainId);
                  // @ts-expect-error
                  await window.cosmostation.cosmos.request({
                    method: "cos_addChain",
                    params: {
                      chainId: QuickSilverChainInfo.chainId,
                      chainName: QuickSilverChainInfo.chainName ,
                      addressPrefix: TestQuickSilverChainInfo.bech32Config.bech32PrefixAccAddr,
                      baseDenom: QuickSilverChainInfo.currencies[0].coinMinimalDenom,
                      displayDenom: QuickSilverChainInfo.currencies[0].coinDenom,
                      restURL: QuickSilverChainInfo.rest,
                      coinType: "118", // optional (default: '118')
                      decimals: 6, // optional (default: 6)
                      gasRate: {
                        // optional (default: { average: '0.025', low: '0.0025', tiny: '0.00025' })
                        average: "0.2",
                        low: "0.02",
                        tiny: "0.002",
                      }
                    },
                  });
            }, (reason: any) => { 
                    // @ts-expect-error
                window.cosmostation.providers.keplr.experimentalSuggestChain(QuickSilverChainInfo).then(async () => { 
                        // @ts-expect-error
                    let signer =  window.cosmostation.providers.keplr.getOfflineSignerOnlyAmino(QuickSilverChainInfo.chainId); 
                    let offlineSigner = await getSigningQuicksilverClient({rpcEndpoint: QuickSilverChainInfo.rpc, signer: signer});
                    fn(QuickSilverChainInfo.chainId, offlineSigner)
                    console.log("Added to Keplr for chainid " + QuickSilverChainInfo.chainId) 
                  // @ts-expect-error
                  await window.cosmostation.cosmos.request({
                    method: "cos_addChain",
                    params: {
                      chainId: QuickSilverChainInfo.chainId,
                      chainName: QuickSilverChainInfo.chainName ,
                      addressPrefix: TestQuickSilverChainInfo.bech32Config.bech32PrefixAccAddr,
                      baseDenom: QuickSilverChainInfo.currencies[0].coinMinimalDenom,
                      displayDenom: QuickSilverChainInfo.currencies[0].coinDenom,
                      restURL: QuickSilverChainInfo.rest,
                      coinType: "118", // optional (default: '118')
                      decimals: 6, // optional (default: 6)
                      gasRate: {
                        // optional (default: { average: '0.025', low: '0.0025', tiny: '0.00025' })
                        average: "0.2",
                        low: "0.02",
                        tiny: "0.002",
                      }
                    },
                  });
                // await window.cosmostation.cosmos.request({
                //     method: "cos_addChain",
                //     params: {
                //       chainId: QuickSilverChainInfo.chainId,
                //       chainName: QuickSilverChainInfo.chainName,
                //       addressPrefix: QuickSilverChainInfo.addressPrefix,
                //       baseDenom: QuickSilverChainInfo.baseDenom,
                //       displayDenom: QuickSilverChainInfo.displayDenom,
                //       restURL: QuickSilverChainInfo.restURL,
                //       coinType: "118", // optional (default: '118')
                //       decimals: 6, // optional (default: 6)
                //       gasRate: {
                //         // optional (default: { average: '0.025', low: '0.0025', tiny: '0.00025' })
                //         average: "0.2",
                //         low: "0.02",
                //         tiny: "0.002",
                //       }
                //     },
                //   });
                }) 
            })
        
    
   
}

export const initKeplrWithNetwork = async (fn: Function, network?: string):Promise<void> => { 
    const keplr = await getKeplrFromWindow();
    console.log(network);
           // @ts-expect-error
        const chain : ChainInfo  = ChainInfos.find( function(el) { return el.chainId === network})
              // @ts-expect-error
    window.cosmostation.providers.keplr
            .enable(chain?.chainId)
            .then(async () => { 
                        // @ts-expect-error
                let signer = window.cosmostation.providers.keplr.getOfflineSignerOnlyAmino(chain?.chainId); 
                let offlineSigner = await SigningStargateClient.connectWithSigner(chain?.rpc, signer, options)
                fn(chain?.chainId, offlineSigner)
                console.log("Enabled for chainid " + chain?.chainId)
                console.log('Offline Signer 1', offlineSigner);
                 // @ts-expect-error
                 await window.cosmostation.cosmos.request({
                    method: "cos_addChain",
                    params: {
                      chainId: chain.chainId,
                      chainName: chain.chainName ,
                      addressPrefix: chain.bech32Config.bech32PrefixAccAddr,
                      baseDenom: chain.currencies[0].coinMinimalDenom,
                      displayDenom: chain.currencies[0].coinDenom,
                      restURL: chain.rest,
                      coinType: "118", // optional (default: '118')
                      decimals: 6, // optional (default: 6)
                      gasRate: {
                        // optional (default: { average: '0.025', low: '0.0025', tiny: '0.00025' })
                        average: "0.2",
                        low: "0.02",
                        tiny: "0.002",
                      }
                    },
                  });
            }, (reason: any) => { 
                 // @ts-expect-error
                window.cosmostation.providers.keplr.experimentalSuggestChain(chain).then(async () => { 
                     // @ts-expect-error
                    let signer = window.cosmostation.providers.keplr.getOfflineSignerOnlyAmino(chain?.chainId); 
                    let offlineSigner = await SigningStargateClient.connectWithSigner(chain?.rpc, signer, options)
                fn(chain?.chainId, offlineSigner)
                    console.log("Added to Keplr for chainid " + chain?.chainId) 
                    console.log('Offline Signer 2', offlineSigner);
                      // @ts-expect-error
                 await window.cosmostation.cosmos.request({
                    method: "cos_addChain",
                    params: {
                      chainId: chain.chainId,
                      chainName: chain.chainName ,
                      addressPrefix: chain.bech32Config.bech32PrefixAccAddr,
                      baseDenom: chain.currencies[0].coinMinimalDenom,
                      displayDenom: chain.currencies[0].coinDenom,
                      restURL: chain.rest,
                      coinType: "118", // optional (default: '118')
                      decimals: 6, // optional (default: 6)
                      gasRate: {
                        // optional (default: { average: '0.025', low: '0.0025', tiny: '0.00025' })
                        average: "0.2",
                        low: "0.02",
                        tiny: "0.002",
                      }
                    },
                  });
                }) 
            })
        }


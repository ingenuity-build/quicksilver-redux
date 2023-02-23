import { ChainInfo } from "@keplr-wallet/types";
import { getKeplrFromWindow } from '@keplr-wallet/stores';
import { getSigningQuicksilverClient } from "quicksilverjs";
import { SigningStargateClient } from "@cosmjs/stargate"
import { options } from './options';

import { ProdQuickSilverChainInfo, ProdChainInfos } from './chains/prod'
import { TestQuickSilverChainInfo, TestChainInfos } from './chains/test'
import { DevQuickSilverChainInfo, DevChainInfos } from './chains/dev'


import env from "react-dotenv";



const QuickSilverChains : { [index:string] : ChainInfo } = {
"preprod": ProdQuickSilverChainInfo,
  "prod": ProdQuickSilverChainInfo,
  "test": TestQuickSilverChainInfo,
  "dev": DevQuickSilverChainInfo,
}

const Chains : { [index:string] : ChainInfo[] } = {
"preprod" : ProdChainInfos,
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

export const initKeplrWithQuickSilver = async (fn: Function, walletType: string):Promise<void> => { 
    if(walletType === 'keplr') {
    const keplr = await getKeplrFromWindow();
    // console.log(keplr?.getKey(QuickSilverChainInfo.chainId));
        if (keplr) {
            keplr
            .enable(QuickSilverChainInfo.chainId)
            .then(async () => { 
                let signer = keplr.getOfflineSignerOnlyAmino(QuickSilverChainInfo.chainId); 
                let offlineSigner = await getSigningQuicksilverClient({rpcEndpoint: QuickSilverChainInfo.rpc, signer: signer});
                fn(QuickSilverChainInfo.chainId, offlineSigner)
                localStorage.setItem( 'ChainId', JSON.stringify(QuickSilverChainInfo.chainId) );
                console.log("Enabled for chainid " + QuickSilverChainInfo.chainId)
            }, (reason: any) => { 
                keplr.experimentalSuggestChain(QuickSilverChainInfo).then(async () => { 
                    let signer = keplr.getOfflineSignerOnlyAmino(QuickSilverChainInfo.chainId); 
                    let offlineSigner = await getSigningQuicksilverClient({rpcEndpoint: QuickSilverChainInfo.rpc, signer: signer});
                    fn(QuickSilverChainInfo.chainId, offlineSigner)
                    localStorage.setItem( 'ChainId', JSON.stringify(QuickSilverChainInfo.chainId) );
                    console.log("Added to Keplr for chainid " + QuickSilverChainInfo.chainId) 
                }) 
            })
        }
    
   
} else if(walletType === 'leap') {



        // @ts-expect-error
            window.leap
            .enable(QuickSilverChainInfo.chainId)
            .then(async () => { 
                      // @ts-expect-error
                let signer = window.leap.getOfflineSignerOnlyAmino(QuickSilverChainInfo.chainId); 
                let offlineSigner = await getSigningQuicksilverClient({rpcEndpoint: QuickSilverChainInfo.rpc, signer: signer});
                fn(QuickSilverChainInfo.chainId, offlineSigner)
                localStorage.setItem( 'ChainId', JSON.stringify(QuickSilverChainInfo.chainId) );
                console.log("Enabled for chainid LEAP" + QuickSilverChainInfo.chainId)
            }, (reason: any) => { 
                      // @ts-expect-error
                window.leap.experimentalSuggestChain(QuickSilverChainInfo).then(async () => { 
                          // @ts-expect-error
                    let signer = window.leap.getOfflineSignerOnlyAmino(QuickSilverChainInfo.chainId); 
                    let offlineSigner = await getSigningQuicksilverClient({rpcEndpoint: QuickSilverChainInfo.rpc, signer: signer});
                    fn(QuickSilverChainInfo.chainId, offlineSigner)
                    localStorage.setItem( 'ChainId', JSON.stringify(QuickSilverChainInfo.chainId) );
                    console.log("Added to Leap for chainid " + QuickSilverChainInfo.chainId) 
                }) 
            })
        
    
   
} else if(walletType === 'cosmostation') {
   // @ts-expect-error
   window.cosmostation.providers.keplr
   .enable(QuickSilverChainInfo.chainId)
   .then(async () => { 
           // @ts-expect-error
       let signer =  window.cosmostation.providers.keplr.getOfflineSignerOnlyAmino(QuickSilverChainInfo.chainId); 
        let offlineSigner = await getSigningQuicksilverClient({rpcEndpoint: QuickSilverChainInfo.rpc, signer: signer});
       fn(QuickSilverChainInfo.chainId, offlineSigner)
       localStorage.setItem( 'ChainId', JSON.stringify(QuickSilverChainInfo.chainId) );
       console.log("Enabled for chainid cosmostation" + QuickSilverChainInfo.chainId);
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
           console.log("Added to Keplr for chainid cosmostation" + QuickSilverChainInfo.chainId) 
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

       }) 
   })


}
}
        

export const initKeplrWithNetwork = async (fn: Function, walletType: string, network?: string):Promise<void> => { 
    const keplr = await getKeplrFromWindow();
    console.log(network);
    if (keplr && network && walletType === 'keplr') {
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
        } else if(network && walletType === 'leap') {

            // @ts-expect-error
         const chain : ChainInfo  = ChainInfos.find( function(el) { return el.chainId === network})
                 // @ts-expect-error
             window.leap
             .enable(chain?.chainId)
             .then(async () => { 
                // @ts-expect-error
                 let signer = window.leap.getOfflineSignerOnlyAmino(chain?.chainId); 
                 let offlineSigner = await SigningStargateClient.connectWithSigner(chain?.rpc, signer, options)
                 fn(chain?.chainId, offlineSigner)
                 console.log("Enabled for chainid " + chain?.chainId)
                 console.log('Offline Signer 1', offlineSigner);
          
             }, (reason: any) => { 
                 // @ts-expect-error
                 window.leap.experimentalSuggestChain(chain).then(async () => { 
                     // @ts-expect-error
                     let signer = window.leap.getOfflineSignerOnlyAmino(chain?.chainId); 
                     let offlineSigner = await SigningStargateClient.connectWithSigner(chain?.rpc, signer, options)
                 fn(chain?.chainId, offlineSigner)
                     console.log("Added to Keplr for chainid " + chain?.chainId) 
                     console.log('Offline Signer 2', offlineSigner);
                 }) 
             })
         
        } else if(network && walletType === 'cosmostation') {
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
              console.log("Added to cosmostation for chainid " + chain?.chainId) 
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
}

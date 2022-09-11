import { ChainInfo } from "@keplr-wallet/types";

export const ProdQuickSilverChainInfo : ChainInfo = {
    chainId: "quicksilver-1",
    chainName: "Quicksilver",
    rpc: "https://rpc.quicksilver.zone",
    rest: "https://lcd.quicksilver.zone",
    bip44: {
        coinType: 118,
    },
    bech32Config: {
        bech32PrefixAccAddr: "quick",
        bech32PrefixAccPub: "quickpub",
        bech32PrefixValAddr: "quickvaloper",
        bech32PrefixValPub: "quickvaloperpub",
        bech32PrefixConsAddr: "quickvalcons",
        bech32PrefixConsPub: "quickvalconspub",
    },
    currencies: [
        {
            coinDenom: "QCK",
            coinMinimalDenom: "uqck",
            coinDecimals: 6,
            coinGeckoId: "quicksilver",
        },
        {
            coinDenom: "qATOM",
            coinMinimalDenom: "uqatom",
            coinDecimals: 6,
            coinGeckoId: "cosmos",
        },
        {
            coinDenom: "qOSMO",
            coinMinimalDenom: "uqosmo",
            coinDecimals: 6,
            coinGeckoId: "osmosis",
        },
        {
            coinDenom: "qSTARS",
            coinMinimalDenom: "uqstars",
            coinDecimals: 6,
            coinGeckoId: "stargaze",
        },
        {
            coinDenom: "qJUNO",
            coinMinimalDenom: "uqjuno",
            coinDecimals: 6,
            coinGeckoId: "juno",
        },
    ],
    feeCurrencies: [
        {
            coinDenom: "QCK",
            coinMinimalDenom: "uqck",
            coinDecimals: 6,
            coinGeckoId: "quicksilver",
        },
    ],
    stakeCurrency: {
        coinDenom: "QCK",
        coinMinimalDenom: "uqck",
        coinDecimals: 6,
        coinGeckoId: "quicksilver",
    },
    coinType: 118,
    gasPriceStep: {
        low: 0.00,
        average: 0.015,
        high: 0.03,
},
}

export const ProdChainInfos: ChainInfo[] = [
    ProdQuickSilverChainInfo,
{
    chainId: "cosmoshub-4",
    chainName: "Cosmos",
    rpc: "https://rpc.test.quicksilver.zone",
    rest: "https://lcd.fauxgaia-1.test.quicksilver.zone",
    
    bip44: {
        coinType: 118,
    },
    bech32Config: {
        bech32PrefixAccAddr: "cosmos",
        bech32PrefixAccPub: "cosmospub",
        bech32PrefixValAddr: "cosmosvaloper",
        bech32PrefixValPub: "cosmosvaloperpub",
        bech32PrefixConsAddr: "cosmosvalcons",
        bech32PrefixConsPub: "cosmosvalconspub",
    },
    currencies: [
        {
            coinDenom: "ATOM",
            coinMinimalDenom: "uatom",
            coinDecimals: 6,
            coinGeckoId: "cosmos",
        },
    ],
    feeCurrencies: [
        {
            coinDenom: "ATOM",
            coinMinimalDenom: "uatom",
            coinDecimals: 6,
            coinGeckoId: "cosmos",
        },
    ],
    stakeCurrency: {
        coinDenom: "ATOM",
        coinMinimalDenom: "uatom",
        coinDecimals: 6,
        coinGeckoId: "cosmos",
    },
    coinType: 118,
    gasPriceStep: {
        low: 0.00,
        average: 0.015,
        high: 0.03,
    },
  }
//   ,{
//     chainId: "qsosmo-2",
//     chainName: "Osmosis Test",
//     rpc: "https://rpc.qsosmo-2.quicksilver.zone",
//     rest: "https://lcd.qsosmo-2.quicksilver.zone",
//     bip44: {
//         coinType: 118,
//     },
//     bech32Config: {
//         bech32PrefixAccAddr: "osmo",
//         bech32PrefixAccPub: "osmopub",
//         bech32PrefixValAddr: "osmovaloper",
//         bech32PrefixValPub: "osmovaloperpub",
//         bech32PrefixConsAddr: "osmovalcons",
//         bech32PrefixConsPub: "osmovalconspub",
//     },
//     currencies: [
//         {
//             coinDenom: "OSMO",
//             coinMinimalDenom: "uosmo",
//             coinDecimals: 6,
//             coinGeckoId: "osmosis",
//         },
//     ],
//     feeCurrencies: [
//         {
//             coinDenom: "OSMO",
//             coinMinimalDenom: "uosmo",
//             coinDecimals: 6,
//             coinGeckoId: "osmosis",
//         },
//     ],
//     stakeCurrency: {
//         coinDenom: "OSMO",
//         coinMinimalDenom: "uosmo",
//         coinDecimals: 6,
//         coinGeckoId: "osmosis",
//     },
//     coinType: 118,
//     gasPriceStep: {
//         low: 0.00,
//         average: 0.015,
//         high: 0.03,
//     },
//   }
]


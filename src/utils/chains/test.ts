import { ChainInfo } from "@keplr-wallet/types";

export const TestQuickSilverChainInfo : ChainInfo = {
    chainId: "innuendo-3",
    chainName: "Quicksilver Test",
    rpc: "https://rpc.test.quicksilver.zone",
    rest: "https://lcd.test.quicksilver.zone",
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
            coinDenom: "qMUON",
            coinMinimalDenom: "uqmuon",
            coinDecimals: 6,
            coinGeckoId: "cosmos",
        },
        {
            coinDenom: "qOSMO",
            coinMinimalDenom: "uqosmo",
            coinDecimals: 6,
            coinGeckoId: "osmosis",
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

export const TestChainInfos: ChainInfo[] = [
    TestQuickSilverChainInfo,
{
    chainId: "fauxgaia-1",
    chainName: "FauxGaia Test",
    rpc: "https://rpc.fauxgaia-1.test.quicksilver.zone",
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
            coinDenom: "MUON",
            coinMinimalDenom: "umuon",
            coinDecimals: 6,
            coinGeckoId: "cosmos",
        },
    ],
    feeCurrencies: [
        {
            coinDenom: "MUON",
            coinMinimalDenom: "umuon",
            coinDecimals: 6,
            coinGeckoId: "cosmos",
        },
    ],
    stakeCurrency: {
        coinDenom: "MUON",
        coinMinimalDenom: "umuon",
        coinDecimals: 6,
        coinGeckoId: "cosmos",
    },
    coinType: 118,
    gasPriceStep: {
        low: 0.00,
        average: 0.015,
        high: 0.03,
    },
  },
  {
    chainId: "osmo-test-4",
    chainName: "Quicksilver OSMO Test",
    rpc: "https://rpc.osmo-test-4.dev.quicksilver.zone",
    rest: "https://lcd.osmo-test-4.dev.quicksilver.zone",
    
    bip44: {
        coinType: 118,
    },
    bech32Config: {
        bech32PrefixAccAddr: "osmo",
        bech32PrefixAccPub: "osmopub",
        bech32PrefixValAddr: "osmovaloper",
        bech32PrefixValPub: "osmovaloperpub",
        bech32PrefixConsAddr: "osmovalcons",
        bech32PrefixConsPub: "osmovalconspub",
    },
    currencies: [
        {
            coinDenom: "OSMOSIS",
            coinMinimalDenom: "uosmo",
            coinDecimals: 6,
            coinGeckoId: "osmosis",
        },
    ],
    feeCurrencies: [
        {
            coinDenom: "OSMOSIS",
            coinMinimalDenom: "uosmo",
            coinDecimals: 6,
            coinGeckoId: "osmosis",
        },
    ],
    stakeCurrency: {
        
        coinDenom: "OSMOSIS",
        coinMinimalDenom: "uosmo",
        coinDecimals: 6,
        coinGeckoId: "osmosis",
    },
    coinType: 118,
    gasPriceStep: {
        low: 0.00,
        average: 0.015,
        high: 0.03,
    },
  }
]


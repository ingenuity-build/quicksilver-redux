// import { ReactNode } from 'react';
// // import { SigningStargateClient } from "@cosmjs/stargate"
// // import { Data } from "../components/panes/3_ValidatorListPane";

// export type WithChildren<T = any> = T & { children?: ReactNode };
// export type WithClassName<T = any> = T & { className?: string };
// // export type Nullable<T> = T | null;
// // export type Maybe<T> = Optional<Nullable<T>>;

// export type WithId = { id: string };


// export interface StepperProps {
//     callback?(val: any): void,
//     chainId?: string,
//     // validators: Array<Data>
//     allocations: Map<string, number>
//     balances: Map<string, Map<string, number>>
//     stakeAmount: number,
//     setStakeAmount(val: number): void,
//     children?: ReactNode;
// }

// export interface QsPageProps {
//     walletModal(): void,
//     wallets: Map<string, SigningStargateClient>,
//     balances: Map<string, Map<string,number>>
//     children?: ReactNode,
// }

export interface QsPageProps {
    
}

// export const format = (amount: number | undefined, denom: string): string => {
//     if (amount === undefined) {
//         return "0.00 " + denom.toUpperCase()
//     }
//     const fixed = (amount/1e6).toFixed(2)
//     return fixed + " " + denom.toUpperCase()
// }
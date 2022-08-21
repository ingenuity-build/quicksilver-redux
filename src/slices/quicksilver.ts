
import { SigningStargateClient } from "@cosmjs/stargate"
import { createSlice } from '@reduxjs/toolkit'
export const initialState = {
  isQSWalletConnected: false,
//   balancesQS: new Map<string, Map<string, number>>(),
//   walletQS: new Map<string, SigningStargateClient>(),
balances: new Map<string, Map<string, number>>(),
walletQS: new Map<string, SigningStargateClient>(),
  loading: false
}
const quicksilverNetworkSlice = createSlice({
  name: 'quicksilver-wallet',
  initialState,
  reducers: {
    setIsQSWalletConnected: state => {
      state.loading = true
    },
    setIsQSWalletConnectedSuccees: state => {
        state.isQSWalletConnected = true;
        state.loading = false;
    },
    setBalancesQSSuccess : (state, { payload }) => {
        state.balances = payload
    },
    setWalletQSSuccess: (state, { payload }) => {
        state.walletQS = payload
    }
  },
})
export const { setIsQSWalletConnected, setIsQSWalletConnectedSuccees, setBalancesQSSuccess, setWalletQSSuccess } = quicksilverNetworkSlice.actions
export const balancesQSSelector = (state:any)  => state.balancesQS;
export const walletQSSelector = (state: any) => state.walletQS;
// The reducer
export default quicksilverNetworkSlice.reducer;
export function setQSWalletConnected() {
    return async (dispatch: any) => {
        dispatch(setIsQSWalletConnected)
        try {
            dispatch(setIsQSWalletConnectedSuccees())
          } catch (error) {
          }
        }
    }
    export function setQSWallet(key: String, val: SigningStargateClient) {
        return async (dispatch: any) => {
            try {
                dispatch(setWalletQSSuccess(val))
              } catch (error) {
              }
            }
        }
        export function setQSBalance(val: any) {
            return async (dispatch: any) => {
                try {
                    dispatch(setBalancesQSSuccess(val))
                  } catch (error) {
                  }
                }
            }
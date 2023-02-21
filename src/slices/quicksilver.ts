
import { SigningStargateClient } from  "@cosmjs/stargate";
import { createSlice } from '@reduxjs/toolkit'
export const initialState = {
  isQSWalletConnected: false,
//   balancesQS: new Map<string, Map<string, number>>(),
//   walletQS: new Map<string, SigningStargateClient>(),
// balances: new Map<string, Map<string, number>>(),
balances: [],
walletQS: new Map<string, SigningStargateClient>(),
  loading: false,
  quicksilverClient: {},
  quicksilverAddress: '',
  walletType: ''
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
    setISQSWalletDisconnectedSuccess: state => {
      state.isQSWalletConnected = false;
      state.loading = false;
    },
    setBalancesQSSuccess : (state, { payload }) => {
        state.balances = payload
    },
    setWalletQSSuccess: (state, { payload }) => {
        state.walletQS = payload
    },
    setClientSuccess: (state, { payload }) => {
      state.quicksilverClient = payload
    },
    setQuicksilverAddressSuccess :  (state, { payload }) => {
      state.quicksilverAddress = payload
},
setWalletTypeSuccess :  (state, { payload }) => {
  state.walletType = payload
},
  },
})
export const { setIsQSWalletConnected, setISQSWalletDisconnectedSuccess, setWalletTypeSuccess, setQuicksilverAddressSuccess, setClientSuccess, setIsQSWalletConnectedSuccees, setBalancesQSSuccess, setWalletQSSuccess } = quicksilverNetworkSlice.actions
export const quicksilverSelector = (state:any)  => state.quicksilver;

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
    export function setQSWalletDisconnected() {
      return async (dispatch: any) => {

          try {
              dispatch(setISQSWalletDisconnectedSuccess())
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
            export function setQSClient(val: any) {
              return async (dispatch: any) => {
                  try {
                      dispatch(setClientSuccess(val))
                    } catch (error) {
                    }
                  }
              }


              export function setQuicksilverAddress(val: any) {
                return async (dispatch: any) => {
                    try {
                        dispatch(setQuicksilverAddressSuccess(val))
                      } catch (error) {
                      }
                    }
                }

                export function setWalletType(wallet: any) {
                  return async (dispatch: any) => {
                      try {
                          dispatch(setWalletTypeSuccess(wallet))
                        } catch (error) {
                        }
                      }
                  }
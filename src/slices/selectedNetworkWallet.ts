
import { SigningStargateClient } from "@cosmjs/stargate"
import { createSlice } from '@reduxjs/toolkit'
export const initialState = {
  isNetworkWalletConnected: false,
//   balancesQS: new Map<string, Map<string, number>>(),
//   walletQS: new Map<string, SigningStargateClient>(),
networkBalances: [],
networkWallet: new Map<string, SigningStargateClient>(),
networkAddress: '',
  loading: false,
  client: {}
}
const selectedNetworkWalletSlice = createSlice({
  name: 'selected-network-wallet',
  initialState,
  reducers: {
    setIsNetworkWalletConnected: state => {
      state.loading = true
    },
    setIsQSWalletConnectedSuccees: state => {
        state.isNetworkWalletConnected = true;
        state.loading = false;
    },
    setBalancesNetworkSuccess : (state, { payload }) => {
        state.networkBalances = payload
    },
    setWalletNetworkSuccess: (state, { payload }) => {
        state.networkWallet = payload
    },
    setNetworkAddressSuccess :  (state, { payload }) => {
        state.networkAddress = payload
  },
  setClientSuccess: (state, { payload }) => {
    state.client = payload
  }

}
})
export const { setIsNetworkWalletConnected,  setClientSuccess, setIsQSWalletConnectedSuccees, setBalancesNetworkSuccess, setWalletNetworkSuccess , setNetworkAddressSuccess} = selectedNetworkWalletSlice.actions
// export const balancesNetworkSelector = (state:any)  => state.networkBalances;
// export const walletNetworkSelector = (state: any) => state.networkWallet;
// export const addressNetworkSelector = (state:any) => state.selectedNetworkWallet.networkAddress;
export const selectedNetworkWalletSelector = (state: any) => state.selectedNetworkWallet;


// The reducer
export default selectedNetworkWalletSlice.reducer;
export function setQSWalletConnected() {
    return async (dispatch: any) => {
        dispatch(setIsNetworkWalletConnected)
        try {
            dispatch(setIsQSWalletConnectedSuccees())
          } catch (error) {
          }
        }
    }
    export function setNetworkWallet(key: String, val: SigningStargateClient) {
        return async (dispatch: any) => {
            try {
                dispatch(setWalletNetworkSuccess(val))
              } catch (error) {
              }
            }
        }
 export function setNetworkBalance(val: any) {
            return async (dispatch: any) => {
                try {
                    dispatch(setBalancesNetworkSuccess(val))
                  } catch (error) {
                  }
                }
            }

    export function setNetworkAddress(val: any) {
                return async (dispatch: any) => {
                    try {
                        dispatch(setNetworkAddressSuccess(val))
                      } catch (error) {
                      }
                    }
                }


                export function setClient(val: any) {
                  return async (dispatch: any) => {
                      try {
                          dispatch(setClientSuccess(val))
                        } catch (error) {
                        }
                      }
                  }
  
              
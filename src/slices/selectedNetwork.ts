import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  loading: false,
  hasErrors: false,
  selectedNetwork: "Please select a network",
}

const selectedNetworkSlice = createSlice({
  name: 'selectedNetwork',
  initialState,
  reducers: {
    setSelectedNetwork: state => {
      state.loading = true
    },
    setSelectedNetworkSuccess: (state, { payload }) => {
      state.selectedNetwork = payload
      state.loading = false
      state.hasErrors = false
    },
    setSelectedNetworksFailure: state => {
      state.loading = false
      state.hasErrors = true
    },
  },
})

export const { setSelectedNetwork, setSelectedNetworkSuccess, setSelectedNetworksFailure } = selectedNetworkSlice.actions

export const selectedNetworkSelector = (state:any)  => state.selectedNetwork

// The reducer
export default selectedNetworkSlice.reducer;


export function setSelectedNetworkFunc(val: any) {
    return async (dispatch: any) => {
  
      try {
        dispatch(setSelectedNetworkSuccess(val.value))
      } catch (error) {
        dispatch(setSelectedNetworksFailure())
      }
    }
  }
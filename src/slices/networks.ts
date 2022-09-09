import { createSlice } from '@reduxjs/toolkit'
import Cosmos from '../assets/Cosmos.png';

export const initialState = {
  loading: false,
  hasErrors: false,
  networks: [],
}

const networksSlice = createSlice({
  name: 'networks',
  initialState,
  reducers: {
    getNetworks: state => {
      state.loading = true
    },
    getNetworksSuccess: (state, { payload }) => {
      state.networks = payload
      state.loading = false
      state.hasErrors = false
    },
    getNetworksFailure: state => {
      state.loading = false
      state.hasErrors = true
    },
  },
})

export const { getNetworks, getNetworksSuccess, getNetworksFailure } = networksSlice.actions

export const networksSelector = (state:any)  => state.networks

// The reducer
export default networksSlice.reducer;

export function fetchNetworks() {
  return async (dispatch: any) => {
    dispatch(getNetworks())

    try {
      const response = await fetch('https://lcd.test.quicksilver.zone/quicksilver/interchainstaking/v1/zones')
      const data = await response.json()

      dispatch(getNetworksSuccess(manipulateData(data.zones)))
    } catch (error) {
      dispatch(getNetworksFailure())
    }
  }
}

const manipulateData = (zones: any) => {
  //    @ts-expect-error
   return zones.filter((zone: any) => zone.deposit_address !== null).map((zone: any) => { return { label: zone.account_prefix.charAt(0).toUpperCase() + zone.account_prefix.slice(1), value: zone, image: images[zone.chain_id]}})
}

const images = {
  'fauxgaia-1' : Cosmos,
}


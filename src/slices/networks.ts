import { createSlice } from '@reduxjs/toolkit'
import env from "react-dotenv";
import Cosmos from '../assets/Cosmos.png';
import Osmosis from '../assets/Osmosis.png';
import Stargaze from '../assets/Stargaze.png';
import Juno from '../assets/Juno.png';

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
      const response = await fetch(`${env.QUICKSILVER_API}/quicksilver/interchainstaking/v1/zones`)
      const data = await response.json()

      dispatch(getNetworksSuccess(manipulateData(data.zones)))
    } catch (error) {
      dispatch(getNetworksFailure())
    }
  }
}

const manipulateData = (zones: any) => {
  let whitelistedZones =  zones.filter((zone: any) => zone.deposit_address !== null).filter((zone: any) => env.WHITELISTED_ZONES.split(",").includes(zone.chain_id)).map((zone: any) => { return { label: zone.account_prefix.toUpperCase() , value: zone, image: images[zone.local_denom]}})
   console.log('zones', whitelistedZones);

   return whitelistedZones;
  //  return zones.filter((zone: any) => zone.deposit_address !== null).map((zone: any) => { return { label: zone.account_prefix.toUpperCase() , value: zone, image: images[zone.local_denom]}})
  }


const images = {
  'uqatom' : Cosmos,
  'uqosmo' : Osmosis,
  'uqstars' : Stargaze,
  'uqjunox' : Juno

}
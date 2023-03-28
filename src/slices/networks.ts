import { createSlice } from '@reduxjs/toolkit'
import env from "react-dotenv";
import Cosmos from '../assets/Cosmos.png';
import Osmosis from '../assets/Osmosis.png';
import Stargaze from '../assets/Stargaze.png';
import Juno from '../assets/Juno.png';
import Regen from '../assets/Regen.png'

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
      const cosmos = await fetch(`https://chains.cosmos.directory/cosmoshub `)
      const cosmosData = await cosmos.json()
      let cosmosAPY =  cosmosData.chain.params.estimated_apr;
      const regen = await fetch(`https://chains.cosmos.directory/regen `)
      const regenData = await regen.json()
      let regenAPY =  regenData.chain.params.estimated_apr;
      const osmosis = await fetch(`https://chains.cosmos.directory/osmosis `)
      const osmosisData = await osmosis.json()
      let osmosisAPY =  osmosisData.chain.params.estimated_apr;
      const stargaze = await fetch(`https://chains.cosmos.directory/stargaze `)
      const stargazeData = await stargaze.json()
      let stargazeAPY =  stargazeData.chain.params.estimated_apr;
      const juno = await fetch(`https://chains.cosmos.directory/juno `)
      const junoData = await juno.json()
      let junoAPY =  junoData.chain.params.estimated_apr;
      const APY = {
        'uqatom' : cosmosAPY,
        'uqosmo' : osmosisAPY,
        'uqstars' : stargazeAPY,
        'uqjunox' : junoAPY,
        'uqregen': regenAPY
      }
      console.log('APY', APY);
      let zones = manipulateData(data.zones);
      console.log('zones', zones)
      let zonesAPY = zones.map(obj => ({ ...obj, apy: ( (1+ (APY[obj.value.local_denom])/121.66)**121.66 ) - 1 }))
      // let zonesAPY =  zones.filter((zone: any) => { return { label: zone.account_prefix.toUpperCase() , value: zone, image: images[zone.local_denom], apy: APY[zone.local_denom]}});
       console.log('zonesAPY', zonesAPY)
       dispatch(getNetworksSuccess(zonesAPY))
    } catch (error) {
      dispatch(getNetworksFailure())
    }
  }
}

const manipulateData = (zones: any) => {



  let whitelistedZones =  zones.filter((zone: any) => zone.deposit_address !== null).filter((zone: any) => env.REACT_APP_WHITELISTED_ZONES.split(",").includes(zone.chain_id)).map((zone: any) => { return { label: zone.account_prefix.toUpperCase() , value: zone, image: images[zone.local_denom]}})
  //  console.log('zones', whitelistedZones);

   return whitelistedZones;
  //  return zones.filter((zone: any) => zone.deposit_address !== null).map((zone: any) => { return { label: zone.account_prefix.toUpperCase() , value: zone, image: images[zone.local_denom]}})
  }


const images = {
  'uqatom' : Cosmos,
  'uqosmo' : Osmosis,
  'uqstars' : Stargaze,
  'uqjunox' : Juno,
  'uqregen': Regen
}


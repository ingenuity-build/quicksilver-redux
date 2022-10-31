import { createSlice } from '@reduxjs/toolkit'
import env from "react-dotenv";

export const initialState = {
  loading: false,
  hasErrors: false,
  previousEpochClaims: {},
  currentEpochAssets: []
}

const claimsSlice = createSlice({
  name: 'claims',
  initialState,
  reducers: {
    getPreviousEpochClaims: state => {
      state.loading = true
    },
    getPreviousEpochClaimsSuccess: (state, { payload }) => {
      state.previousEpochClaims = payload
      state.loading = false
      state.hasErrors = false
    },
    getPreviousEpochClaimsFailure: state => {
      state.loading = false
      state.hasErrors = true
    },
    getCurrentEpochAssetsSuccess: (state, { payload }) => {
        state.currentEpochAssets = payload;
    }
  },
})


        export const { getPreviousEpochClaims, getPreviousEpochClaimsSuccess, getPreviousEpochClaimsFailure , getCurrentEpochAssetsSuccess} = claimsSlice.actions

export const claimsSelector = (state:any)  => state.claims

// The reducer
export default claimsSlice.reducer;

export function fetchClaims(quicksilverAddress) {
  return async (dispatch: any) => {
    dispatch(getPreviousEpochClaims())

    try {
      
      const response = await fetch(`https://claim.${env.ZONE_URL}/${quicksilverAddress}/epoch`)
      const data = await response.json()
      dispatch(getPreviousEpochClaimsSuccess(data))

      const assetsResponse = await fetch(`https://claim.${env.ZONE_URL}/${quicksilverAddress}/current`)
      const assets = await response.json();
      dispatch(getCurrentEpochAssetsSuccess(assets.assets))
    } catch (error) {
      dispatch(getPreviousEpochClaimsFailure())
    }
}
}
    
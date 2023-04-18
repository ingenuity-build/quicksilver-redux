import { createSlice } from '@reduxjs/toolkit'
import env from "react-dotenv";

export const initialState = {
  loading: false,
  hasErrors: false,
  previousEpochMessages: [],
  currentEpochAssets: {},
  previousEpochAssets: {},
  existingClaims: []
}

const claimsSlice = createSlice({
  name: 'claims',
  initialState,
  reducers: {
    getPreviousEpochClaims: state => {
      state.loading = true
    },
    getPreviousEpochMessagesSuccess: (state, { payload }) => {
      state.previousEpochMessages = payload
      state.loading = false
      state.hasErrors = false
    },
    getPreviousEpochClaimsFailure: state => {
      state.loading = false
      state.hasErrors = true
    },
    getCurrentEpochAssetsSuccess: (state, { payload }) => {
        state.currentEpochAssets = payload;
    },
    getPreviousEpochAssetsSuccess: (state, { payload }) => {
      state.previousEpochAssets = payload;
  },
  getExistingClaimsSuccess: (state, { payload }) => {
    state.existingClaims = payload;
},
  },
})


        export const { getPreviousEpochClaims, getPreviousEpochMessagesSuccess,getExistingClaimsSuccess,  getPreviousEpochClaimsFailure , getPreviousEpochAssetsSuccess, getCurrentEpochAssetsSuccess} = claimsSlice.actions

export const claimsSelector = (state:any)  => state.claims

// The reducer
export default claimsSlice.reducer;

export function fetchClaims(quicksilverAddress) {
  return async (dispatch: any) => {
    dispatch(getPreviousEpochClaims())

    try {

      const response = await fetch(`https://claim.${env.ZONE_URL}/${quicksilverAddress}/epoch`)
      const data = await response.json()
      dispatch(getPreviousEpochMessagesSuccess(data.messages))
      dispatch(getPreviousEpochAssetsSuccess(data.assets))

      const assetsResponse = await fetch(`https://claim.${env.ZONE_URL}/${quicksilverAddress}/current`)
      const assets = await assetsResponse.json();
      dispatch(getCurrentEpochAssetsSuccess(assets.assets))
      const claimsResponse = await fetch(`${env.QUICKSILVER_API}/quicksilver/claimsmanager/v1/user/${quicksilverAddress}/claims`);
      const claimsData = await claimsResponse.json()
      dispatch(getExistingClaimsSuccess(claimsData.claims))
    } catch (error) {
      dispatch(getPreviousEpochClaimsFailure())
    }
}
}
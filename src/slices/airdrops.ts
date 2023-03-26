import { createSlice } from '@reduxjs/toolkit'
import env from "react-dotenv";


export const initialState = {
  amount: "0",
  error: ""
}

const airdropsSlice = createSlice({
  name: 'airdrops',
  initialState,
  reducers: {

    getStargazeAirdropSuccess: (state, { payload }) => {
      state.amount = payload
    },
    getStargazeAirdropAddressErrorMessage: (state, { payload }) => {
        state.error = payload
      },
  },
})

export const { getStargazeAirdropSuccess, getStargazeAirdropAddressErrorMessage} = airdropsSlice.actions

export const airdropsSelector = (state:any)  => state.airdrops

// The reducer
export default airdropsSlice.reducer;

export function fetchStargazeAirdropAllocation(address: string) {
  return async (dispatch: any) => {


    try {
      const response = await fetch(`https://airdrop.${env.ZONE_URL}/${address}`)
      const data = await response.json()
      dispatch(getStargazeAirdropSuccess(data.amount))
      dispatch(getStargazeAirdropAddressErrorMessage(data.error))
    } catch (error) {
    }
  }
}


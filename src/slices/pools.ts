import { createSlice } from '@reduxjs/toolkit'
import env from "@ludovicm67/react-dotenv";

export const initialState = {
  loading: false,
  hasErrors: false,
  osmosisPools: [],
}

const networksSlice = createSlice({
  name: 'networks',
  initialState,
  reducers: {
    getOsmosisPools: state => {
      state.loading = true
    },
    getOsmosisPoolsSuccess: (state, { payload }) => {
      state.osmosisPools = payload
      state.loading = false
      state.hasErrors = false
    },
    getOsmosisPoolsFailure: state => {
      state.loading = false
      state.hasErrors = true
    },
  },
})

export const { getOsmosisPools, getOsmosisPoolsSuccess, getOsmosisPoolsFailure } = networksSlice.actions

export const poolsSelector = (state:any)  => state.osmosisPools

// The reducer
export default networksSlice.reducer;

export function fetchOsmosisPools() {
  return async (dispatch: any) => {
    dispatch(getOsmosisPools())

    try {
      const response = await fetch('https://qchzc6iq5k.execute-api.us-east-2.amazonaws.com/api/pool?returnPeriod=yearly&bondingPeriod=14')
      const data = await response.json()

      dispatch(getOsmosisPoolsSuccess(data))
    } catch (error) {
      dispatch(getOsmosisPoolsFailure())
    }
  }
}


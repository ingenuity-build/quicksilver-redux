import { createSlice } from '@reduxjs/toolkit'
import env from "@ludovicm67/react-dotenv";

export const initialState = {
    loading: false,
    hasErrors: false,
    epochs: [],
  }

  const epochsSlice = createSlice({
    name: 'epochs',
    initialState,
    reducers: {
      getEpochs: state => {
        state.loading = true
      },
      getEpochsSuccess: (state, { payload }) => {
        state.epochs = payload
        state.loading = false
        state.hasErrors = false
      },
      getEpochsFailure: state => {
        state.loading = false
        state.hasErrors = true
      },
    },
  })

  export const { getEpochs, getEpochsSuccess, getEpochsFailure } = epochsSlice.actions

  export const epochsSelector = (state:any)  => state.epochs


// The reducer
export default epochsSlice.reducer;

export function fetchEpoch() {
  return async (dispatch: any) => {
    dispatch(getEpochs())

    try {
      const response = await fetch(`${env.QUICKSILVER_API}/quicksilver/epochs/v1/epochs`)
      const data = await response.json();
      dispatch(getEpochsSuccess(data.epochs));
    } catch (error) {
      dispatch(getEpochsFailure())
    }
  }
}
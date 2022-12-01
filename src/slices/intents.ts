import { createSlice } from '@reduxjs/toolkit'
import env from "@ludovicm67/react-dotenv";

export const initialState = {
  loading: false,
  hasErrors: false,
  intents: [],
}

const intentsSlice = createSlice({
  name: 'intents',
  initialState,
  reducers: {
    getIntent: state => {
      state.loading = true
    },
    getIntentSuccess: (state, { payload }) => {
      state.intents = payload
      state.loading = false
      state.hasErrors = false
    },
    getIntentsFailure: state => {
      state.loading = false
      state.hasErrors = true
    },
  },
})

export const { getIntent, getIntentSuccess, getIntentsFailure } = intentsSlice.actions

export const intentsSelector = (state:any)  => state.intents

// The reducer
export default intentsSlice.reducer;

export function fetchIntents(network: any, quicksilverAddress: any) {
  // return async (dispatch: any) => {
  //     console.log('heyy')
  //     const response = await fetch(`${env.QUICKSILVER_API}/quicksilver/interchainstaking/v1/zones/${network}/delegator_intent/${quicksilverAddress}`)
  //     const data = await response.json()
  //     console.log(data);
  //     dispatch(getIntentSuccess(data.intent.intents))
    
  // }
  return async (dispatch: any) => {
    console.log('HEY')
      const response = await fetch(`${env.QUICKSILVER_API}/quicksilver/interchainstaking/v1/zones/${network}/delegator_intent/${quicksilverAddress}`)
      const data = await response.json()

      dispatch(getIntentSuccess(data.intent.intents))
     
  }
}


import { createSlice } from '@reduxjs/toolkit'
import env from "@ludovicm67/react-dotenv";
import { useSelector, useDispatch } from 'react-redux'

export const initialState = {
    loading: false,
    hasErrors: false,
    withdrawals: [],
  }

  const unbondingsSlice = createSlice({
    name: 'unbondings',
    initialState,
    reducers: {
      getWithdrawals: state => {
        state.loading = true
      },
      getWithdrawalsSuccess: (state, { payload }) => {
        state.withdrawals = payload
        state.loading = false
        state.hasErrors = false
      },
      getWithdrawalsFailure: state => {
        state.loading = false
        state.hasErrors = true
      },
    },
  })

  export const { getWithdrawals, getWithdrawalsSuccess, getWithdrawalsFailure } = unbondingsSlice.actions

  export const unbondingsSelector = (state:any)  => state.unbondings


// The reducer
export default unbondingsSlice.reducer;

export function fetchUnbondings(chainId: any, quicksilverAddress: any) {
  return async (dispatch: any) => {
    dispatch(getWithdrawals())

    try {
      const response = await fetch(`${env.QUICKSILVER_API}/quicksilver/interchainstaking/v1/zones/${chainId}/withdrawal_records/${quicksilverAddress}`)
      const data = await response.json();
      dispatch(getWithdrawalsSuccess(data.withdrawals));
    } catch (error) {
      dispatch(getWithdrawalsFailure())
    }
  }
}
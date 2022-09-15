import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  stakingAmount: 1,
  stakingAllocationProp: {}
}

const stakingAllocationSlice = createSlice({
  name: 'staking-allocation',
  initialState,
  reducers: {

    setStakingAmountSuccess: (state, { payload }) => {
      state.stakingAmount = payload

    },
    setStakingAllocationPropSuccess: (state, { payload }) => {
        state.stakingAllocationProp = payload
    },
  },
})

export const { setStakingAmountSuccess, setStakingAllocationPropSuccess } = stakingAllocationSlice.actions

export const stakingAllocationSelector = (state:any)  => state.stakingAllocation

// The reducer
export default stakingAllocationSlice.reducer;


export function setStakingAmount(val: any) {
    return async (dispatch: any) => {
  
      try {
        dispatch(setStakingAmountSuccess(val))
      } catch (error) {
      }
    }
  }


export function setStakingAllocationProp(val: any) {
    return async (dispatch: any) => {
  
      try {
        dispatch(setStakingAllocationPropSuccess(val))
      } catch (error) {
      }
    }
  }
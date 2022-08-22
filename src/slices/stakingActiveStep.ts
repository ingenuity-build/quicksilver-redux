import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  stakingActiveStep : 2
}

const stakingActiveStepSlice = createSlice({
    name: 'staking-active-step',
    initialState,
    reducers: {
      increaseStep: state => {
        state.stakingActiveStep = state.stakingActiveStep + 1
      },
      decreaseStep: state => {
        state.stakingActiveStep = state.stakingActiveStep - 1
      },
 
    },
  })

  export const { increaseStep, decreaseStep } = stakingActiveStepSlice.actions

export const stakingActiveStep = (state:any)  => state.stakingActiveStep.stakingActiveStep

// The reducer
export default stakingActiveStepSlice.reducer;

export function increaseStakingStep() {
    return async (dispatch: any) => {

  
      try {  
        dispatch(increaseStep());
      } catch (error) {
      }
    }
  }


  export function decreaseStakingStep() {
    return async (dispatch: any) => {

  
      try {  
        dispatch(decreaseStep());
      } catch (error) {
      }
    }
  }
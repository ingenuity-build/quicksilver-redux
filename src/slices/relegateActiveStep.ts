import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  redelegateActiveStep : 1
}

const reledegateActiveStepSlice = createSlice({
    name: 'redelegate-active-step',
    initialState,
    reducers: {
      increaseStep: state => {
        state.redelegateActiveStep = state.redelegateActiveStep + 1
      },
      decreaseStep: state => {
        state.redelegateActiveStep = state.redelegateActiveStep - 1
      },
      setActiveStep: (state, { payload }) => {
        state.redelegateActiveStep = payload
      },
    }
  }
)

  export const { increaseStep, decreaseStep, setActiveStep } = reledegateActiveStepSlice.actions

export const redelegateActiveStep = (state:any)  => state.redelegateActiveStep.redelegateActiveStep

// The reducer
export default reledegateActiveStepSlice.reducer;

export function increaseRedelegateStep() {
    return async (dispatch: any) => {

  
      try {  
        dispatch(increaseStep());
      } catch (error) {
      }
    }
  }


  export function decreaseRedelegateStep() {
    return async (dispatch: any) => {

  
      try {  
        dispatch(decreaseStep());
      } catch (error) {
      
    }
  }
  }

  export function setRedelegateStep(val: number) {
    return async (dispatch: any) => {

  
      try {  
        dispatch(setActiveStep(val));
      } catch (error) {
      }
    }

  }
  

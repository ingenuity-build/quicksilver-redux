import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  isInactiveValsModalOpen : false
}

const inactiveValsModalSlice = createSlice({
    name: 'inactive-validators-modal',
    initialState,
    reducers: {
      setModalOpenSuccess: state => {
        state.isInactiveValsModalOpen = true
      },
      setModalCloseSuccess: state => {
        state.isInactiveValsModalOpen = false
      },
 
    },
  })

  export const { setModalOpenSuccess, setModalCloseSuccess } = inactiveValsModalSlice.actions

export const inactiveValidatorsModalSelector = (state:any)  => state.inactiveValidatorsModal

// The reducer
export default inactiveValsModalSlice.reducer;

export function setModalOpen() {
    return async (dispatch: any) => {

  
      try {  
        dispatch(setModalOpenSuccess());
      } catch (error) {
      }
    }
  }


  export function setModalClose() {
    return async (dispatch: any) => {

  
      try {  
        dispatch(setModalCloseSuccess());
      } catch (error) {
      }
    }
  }
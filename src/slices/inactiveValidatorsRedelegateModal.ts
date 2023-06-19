import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  isInactiveValsRedelegateModalOpen : false
}

const inactiveValsRedelegateModalSlice = createSlice({
    name: 'inactive-validators-redelegate-modal',
    initialState,
    reducers: {
      setModalOpenSuccess: state => {
        state.isInactiveValsRedelegateModalOpen = true
      },
      setModalCloseSuccess: state => {
        state.isInactiveValsRedelegateModalOpen = false
      },
 
    },
  })

  export const { setModalOpenSuccess, setModalCloseSuccess } = inactiveValsRedelegateModalSlice.actions

export const inactiveValidatorsRedelegateModalSelector = (state:any)  => state.inactiveValidatorsRedelegateModal

// The reducer
export default inactiveValsRedelegateModalSlice.reducer;

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
import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  isPoolModalOpen : false
}

const poolModalSlice = createSlice({
    name: 'pool-modal',
    initialState,
    reducers: {
      setModalOpenSuccess: state => {
        state.isPoolModalOpen = true
      },
      setModalCloseSuccess: state => {
        state.isPoolModalOpen = false
      },
 
    },
  })

  export const { setModalOpenSuccess, setModalCloseSuccess } = poolModalSlice.actions

export const poolModalSelector = (state:any)  => state.poolModal

// The reducer
export default poolModalSlice.reducer;

export function setPoolModalOpen() {
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
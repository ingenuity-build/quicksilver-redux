import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  isModalOpen : false
}

const claimRewardModalSlice = createSlice({
    name: 'claim-reward-modal',
    initialState,
    reducers: {
      setModalOpenSuccess: state => {
        state.isModalOpen = true
      },
      setModalCloseSuccess: state => {
        state.isModalOpen = false
      },
 
    },
  })

  export const { setModalOpenSuccess, setModalCloseSuccess } = claimRewardModalSlice.actions

export const claimRewardModalSelector = (state:any)  => state.claimRewardModal

// The reducer
export default claimRewardModalSlice.reducer;

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
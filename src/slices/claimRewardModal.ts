import { createSlice } from '@reduxjs/toolkit'


export const initialState = {
  isClaimModalOpen : false
}


const claimRewardModalSlice = createSlice({
    name: 'claim-reward-modal',
    initialState,
    reducers: {
      setClaimModalOpenSuccess: state => {
        state.isClaimModalOpen = true
      },
      setClaimModalCloseSuccess: state => {
        state.isClaimModalOpen = false
      },


    },
  })


  export const { setClaimModalOpenSuccess, setClaimModalCloseSuccess } = claimRewardModalSlice.actions


export const claimRewardModalSelector = (state:any)  => state.claimRewardModal


// The reducer
export default claimRewardModalSlice.reducer;


export function setClaimModalOpen() {
    return async (dispatch: any) => {




      try {  
        dispatch(setClaimModalOpenSuccess());
      } catch (error) {
      }
    }
  }




  export function setModalClose() {
    return async (dispatch: any) => {




      try {  
        dispatch(setClaimModalCloseSuccess());
      } catch (error) {
      }
    }
  }
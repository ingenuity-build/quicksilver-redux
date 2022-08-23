import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  isModalOpen : false
}

const connectWalletModalSlice = createSlice({
    name: 'connect-wallet-modal',
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

  export const { setModalOpenSuccess, setModalCloseSuccess } = connectWalletModalSlice.actions

export const connectWalletModalSelector = (state:any)  => state.connectWalletModal

// The reducer
export default connectWalletModalSlice.reducer;

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
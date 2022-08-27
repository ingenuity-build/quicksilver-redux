import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  existingDelegations: [],
  selectedExistingDelegations: []
}

const existingDelegationsSlice = createSlice({
  name: 'existing-delegations',
  initialState,
  reducers: {

    setExistingDelegationsSuccess: (state, { payload }) => {
      state.existingDelegations = payload

    },
    setSelectedExistingDelegationsSuccess : (state, { payload }) => {
      state.selectedExistingDelegations = payload;
    },

  },
})

export const { setExistingDelegationsSuccess, setSelectedExistingDelegationsSuccess } = existingDelegationsSlice.actions


export const existingDelegationsSelector = (state:any)  => state.existingDelegations;

// The reducer
export default existingDelegationsSlice.reducer;

export function setSelectedExistingDelegations(val: any) {
    return async (dispatch: any) => {
  
      try {
        dispatch(setSelectedExistingDelegationsSuccess(val))
      } catch (error) {

      }
    }
  }

  export function _loadExistingValsAsync  (networkAddress: string, chainId: number) {
    return async (dispatch: any) => {
    loadExistingDelegations(networkAddress, chainId).then(
      (response) => { dispatch(setExistingDelegationsSuccess(response?.data?.action_delegation.delegations))},
  

    );

    
}
  }



   const loadExistingDelegations = async (networkAddress: string, chainId: number): Promise<any> => {
    const result = await fetch(
        `https://data.${chainId}.test.quicksilver.zone/v1/graphql`,
        {
          method: "POST",
          body: JSON.stringify({
            query: MyQuery,
            variables: { address: networkAddress },
          })
        }
      );
       console.log(result.json);
      return await result.json();


}

const MyQuery =  `query MyQuery($address: String!) {
    action_delegation(address: $address) {
      delegations
    }
  }`;
import { createSlice } from '@reduxjs/toolkit'
import env from "react-dotenv";


export const initialState = {
  loading: false,
  hasErrors: false,
  validatorList: [],
  selectedValidatorList: [],
  redelegateValidatorList: []
}

const validatorListSlice = createSlice({
  name: 'validator-list',
  initialState,
  reducers: {
    getValidatorList: state => {
      state.loading = true
    },
    getValidatorListSuccess: (state, { payload }) => {
      state.validatorList = payload
      state.loading = false
      state.hasErrors = false
    },
    setSelectedValidatorListSuccess : (state, { payload }) => {
      state.selectedValidatorList = payload;
    },
    setRedelegateValidatorListSuccess : (state, { payload }) => {
      state.redelegateValidatorList = payload;
    },
    getValidatorListFailure: state => {
      state.loading = false
      state.hasErrors = true
    },
  },
})

export const { getValidatorList, getValidatorListSuccess, setSelectedValidatorListSuccess, setRedelegateValidatorListSuccess, getValidatorListFailure } = validatorListSlice.actions


export const validatorListSelector = (state:any)  => state.validatorList;
// export const selectedValidatorListSelector = (state: any) => state.selectedValidatorList;
// The reducer
export default validatorListSlice.reducer;

const loadValData = async (chainId: string): Promise<any> => {
 let chain = chainId.replaceAll('_', '-');
  console.log('chain', chain)
    const result = await fetch(`https://data.${env.ZONE_URL}/validatorList/${chain}`)
    return await result.json();

}

type ValResponse = {
    data: {
        validator_status: Array<Validator>
    }
}

type VotingPowers = {
    voting_power: number
}

type Commissions = {
    commission: number
}

type Descriptions = {
    avatar_url: string | null,
    details: string | null,
    identity: string | null,
    moniker: string,
    security_contact: string | null,
    website: string | null
}

type Validator = {
      operator_address: string;
      jailed: boolean;
      status: string;
    tokens: string;
    commission: {
      commission_rates: {
        rate: number;
      }
    };
    description: {
    moniker: string;
    }

}


export function _loadValsAsync(chainId: string)  {
    return async (dispatch: any) => {
      loadValData(chainId).then(
        externalData => {
           let vals: Array<Data> = externalData.validators
           .filter((line: Validator) => { return !line.jailed || (line.commission.commission_rates.rate > 0.8) || line.status != "BOND_STATUS_BONDED" }) 
           .map((line: Validator, index: number): Data => {          // map to Data objects
            
            return {
                rank: 0, 
                voting_power: line.tokens,
                name: line.description.moniker.length > 0 ? line.description.moniker : 'NO_NAME_SET' ,
                commission: line.commission.commission_rates.rate.toString(),
                address : line.operator_address,
                logo: "",
              }});
              
              dispatch(getValidatorListSuccess(vals))
        }).catch(
          dispatch(getValidatorListFailure())
        );
    }
    

}


const valListQuery = `
query ValidatorList {
  validator_status(where: {jailed: {}}) {
    validator {
      validator_voting_powers {
        voting_power
      }
      validator_info {
        operator_address
        validator {
          validator_commissions {
            commission
          }
          validator_descriptions {
            avatar_url
            details
            identity
            moniker
            security_contact
            website
          }
        }
      }
    }
    jailed
  }
}
`;

export interface Data {
    voting_power: string;
    rank: number;
    commission: string;
    name: string;
    address: string;
    logo: string;
  }

  export function setSelectedValidatorList(val: any) {
    return async (dispatch: any) => {
  
      try {
        dispatch(setSelectedValidatorListSuccess(val))
      } catch (error) {

      }
    }
  }

  export function setRedelegateValidatorList(val: any) {
    return async (dispatch: any) => {
  
      try {
        dispatch(setRedelegateValidatorListSuccess(val))
      } catch (error) {

      }
    }
  }
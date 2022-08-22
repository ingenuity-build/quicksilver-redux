import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  loading: false,
  hasErrors: false,
  validatorList: [],
  selectedValidatorList: []
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
         state.loading = false
      state.hasErrors = false
    },
    getValidatorListFailure: state => {
      state.loading = false
      state.hasErrors = true
    },
  },
})

export const { getValidatorList, getValidatorListSuccess, setSelectedValidatorListSuccess, getValidatorListFailure } = validatorListSlice.actions


export const validatorListSelector = (state:any)  => state.validatorList;
export const selectedValidatorListSelector = (state: any) => state.selectedValidatorList;
// The reducer
export default validatorListSlice.reducer;

const loadValData = async (chainId: string): Promise<ValResponse> => {
    // fetch me from api
    //return [{rank: 1, name: 'Validator 1', voting_power: '15,394,433 OSMO', commission: '5%' },{rank: 2, name: 'Validator 2', voting_power: '15,394,433 OSMO', commission: '5%' }]

    // TODO - make chainId dynamic
    const result = await fetch(
        `https://data.${chainId}.quicksilver.zone/v1/graphql`,
        {
          method: "POST",
          body: JSON.stringify({
            query: valListQuery,
            variables: {},
            operationName: "ValidatorList"
          })
        }
      );
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
    validator: {
        validator_voting_powers: Array<VotingPowers>
        validator_info: {
            operator_address: string,
            validator: {
                validator_commissions: Array<Commissions>
                validator_descriptions: Array<Descriptions>
            }
        }
    },
    jailed: Boolean

}


export function _loadValsAsync(chainId: string)  {
    return async (dispatch: any) => {
        loadValData(chainId).then(
            externalData => {
               let vals: Array<Data> = externalData.data.validator_status
               .filter((line: Validator) => { return !line.jailed || (line.validator.validator_info.validator.validator_commissions.length > 0 && line.validator.validator_info.validator.validator_commissions[0].commission > 0.8)}) 
               .map((line: Validator, index: number): Data => {          // map to Data objects
                let moniker = "Unknown"
                let commission = "Unknown"
                if (line.validator.validator_info.validator.validator_descriptions.length > 0) {
                    moniker = line.validator.validator_info.validator.validator_descriptions[0].moniker
                }
                if (line.validator.validator_info.validator.validator_commissions.length > 0) {
                    commission = (line.validator.validator_info.validator.validator_commissions[0].commission * 100) + "%"
                }

                return {
                    rank: 0, 
                    voting_power: "" + line.validator.validator_voting_powers[0].voting_power,
                    name: moniker,
                    commission: commission,
                    address : line.validator.validator_info.operator_address,
                    logo: "",
                  }});
                  dispatch(getValidatorListSuccess(vals))
            }
        ).catch(

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
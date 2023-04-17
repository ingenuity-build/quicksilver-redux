import { combineReducers } from 'redux'

import networkReducer from './networks'
import selectedNetworkReducer from './selectedNetwork'
import quicksilverReducer from './quicksilver'
import selectedNetworkWalletReducer from './selectedNetworkWallet'
import validatorListReducer from './validatorList'
import stakingActiveStepReducer from './stakingActiveStep'
import redelegateActiveStepReducer from './relegateActiveStep'
import stakingAllocationReducer from './allocation';
import existingDelegationsReducer from './existingDelegations';
import connectWalletModalReducer from './connectWalletModal'
import poolsReducer from './pools'
import unbondingReducer from './unbonding';
import epochReducer from './epoch';
import intentReducer from './intents';
import  poolModalReducer from './poolsWarningModal'
import airdropsReducer from './airdrops';
import inactiveValidatorsModalReducer from './inactiveValidatorsModal'

export type RootState = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
  networks: networkReducer,
  selectedNetwork: selectedNetworkReducer,
  quicksilver: quicksilverReducer,
  selectedNetworkWallet: selectedNetworkWalletReducer,
  validatorList: validatorListReducer,
  stakingActiveStep: stakingActiveStepReducer,
  stakingAllocation: stakingAllocationReducer,
  existingDelegations: existingDelegationsReducer,
  connectWalletModal: connectWalletModalReducer,
  osmosisPools: poolsReducer,
  unbondings: unbondingReducer,
  epochs: epochReducer,
  redelegateActiveStep: redelegateActiveStepReducer,
  intents: intentReducer,
  poolModal: poolModalReducer,
  airdrops: airdropsReducer,
  inactiveValidatorsModal: inactiveValidatorsModalReducer
})

export default rootReducer;
import { combineReducers } from 'redux'

import networkReducer from './networks'
import selectedNetworkReducer from './selectedNetwork'
import quicksilverReducer from './quicksilver'
import selectedNetworkWalletReducer from './selectedNetworkWallet'

export type RootState = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
  networks: networkReducer,
  selectedNetwork: selectedNetworkReducer,
  quicksilver: quicksilverReducer,
  selectedNetworkWallet: selectedNetworkWalletReducer
})

export default rootReducer;
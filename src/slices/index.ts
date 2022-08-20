import { combineReducers } from 'redux'

export type RootState = ReturnType<typeof rootReducer>
import networkReducer from './networks'
import selectedNetworkReducer from './selectedNetwork'


const rootReducer = combineReducers({
  networks: networkReducer,
  selectedNetwork: selectedNetworkReducer
})

export default rootReducer;
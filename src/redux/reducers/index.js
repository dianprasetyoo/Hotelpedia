//combine all reducer
import { combineReducers } from 'redux';




import reducerRooms from './reducerRooms'
import reducerLogin from './reducerLogin'
import reducerCheckin from './reducerCheckin'
import reducerCustomer from './reducerCustomer'
import reducerRegister from './reducerRegister'

const appReducer = combineReducers({
  login: reducerLogin,
  rooms: reducerRooms,
  checkins: reducerCheckin,
  customers: reducerCustomer,
  auth : reducerRegister
})

export default appReducer
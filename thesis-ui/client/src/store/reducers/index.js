import { combineReducers } from "redux";


import dataReducers from './dataReducers'
import active_userReducers from './active_userReducers'

export default combineReducers({
  dataReducers,
  active_user : active_userReducers
})
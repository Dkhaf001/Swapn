import { combineReducers } from "redux";


import dataReducers from './dataReducers'
import active_userReducers from './active_userReducers'
import current_listReducers from './current_listReducers'

export default combineReducers({
  dataReducers,
  active_user : active_userReducers,
  current_list : current_listReducers
})
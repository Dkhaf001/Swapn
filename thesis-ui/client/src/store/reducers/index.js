import { combineReducers } from 'redux';

import dataReducers from './dataReducers';
import activeUserReducers from './active_userReducers';
import currentListReducers from './current_listReducers';
import currentPostReducers from './current_postReducers';
import currentProfileReducers from './current_profileReducers';

export default combineReducers({
  dataReducers,
  active_user: activeUserReducers,
  current_list: currentListReducers,
  current_post: currentPostReducers,
  current_profile: currentProfileReducers,
});

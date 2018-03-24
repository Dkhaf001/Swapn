import { combineReducers } from 'redux';

import dataReducers from './dataReducers';
import activeUserReducers from './active_userReducers';
import currentListReducers from './current_listReducers';
import currentPostReducers from './current_postReducers';
import currentProfileReducers from './current_profileReducers';
import currentFollowingReducers from './current_followingReducers';
import currentWatchingReducers from './current_watchingReducers';
import socketReducers from './socketReducers'
import current_roomId from './roomIdReducers'
import messages from './messagesReducers'

export default combineReducers({
  messages,
  dataReducers,
  active_user: activeUserReducers,
  current_list: currentListReducers,
  current_post: currentPostReducers,
  current_profile: currentProfileReducers,
  current_following: currentFollowingReducers,
  current_watching: currentWatchingReducers,
  socket: socketReducers,
  current_roomId: current_roomId
});

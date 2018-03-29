export const addDataToStore = data => ({
  type: 'WORD',
  payload: data,
});

export const addActiveUserToStore = user => ({
  type: 'ACTIVE_USER',
  payload: user,
});

export const addCurrentList = lists => ({
  type: 'CURRENT_LIST',
  payload: lists,
});

export const addCurrentPost = post => ({
  type: 'CURRENT_POST',
  payload: post,
});

export const addCurrentProfile = profile => ({
  type: 'CURRENT_PROFILE',
  payload: profile,
});

export const addCurrentFollowing = following => ({
  type: 'CURRENT_FOLLOWING',
  payload: following,
});

export const addCurrentWatching = watching => ({
  type: 'CURRENT_WATCHING',
  payload: watching,
});

export const addSocket = socket => ({
  type: 'SOCKET',
  payload: socket,
});

export const addCurrentRoomId = id => ({
  type: 'ROOMID',
  payload: id,
});

export const addMessages = messages => ({
  type: 'MESSAGES',
  payload: messages,
});

export const getLocation = position => ({
  type: 'Position',
  payload: position,
});

export const addImages = position => ({
  type: 'IMAGES',
  payload: position,
});

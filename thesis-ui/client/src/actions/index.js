export const addDataToStore = data => ({
  type: 'WORD',
  payload: data
});

export const addActiveUserToStore = user => ({
  type: 'ACTIVE_USER',
  payload: user
});

export const addCurrentList = lists => ({
  type: 'CURRENT_LIST',
  payload: lists
});

export const addCurrentPost = post => ({
  type: 'CURRENT_POST',
  payload: post
});

export const addCurrentProfile = profile => ({
  type: 'CURRENT_PROFILE',
  payload: profile
});

export const addCurrentFollowing = profile => ({
  type: 'CURRENT_FOLLOWING',
  payload: following
});

export const addDataToStore = data => ({
  type: 'WORD',
  payload: data,
});

export const addActiveUserToStore = user => ({
  type: 'ACTIVE_USER',
  payload: user
})

export default (state = null, action) => {
  switch (action.type) {
    case 'FOLLOWING_LIST':
      return action.payload;
      break;
  }
  return state;
};

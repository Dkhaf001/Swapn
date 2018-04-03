export default (state = null, action) => {
  switch (action.type) {
    case 'CURRENT_SEARCH':
      return action.payload;
      break;
  }
  return state;
};

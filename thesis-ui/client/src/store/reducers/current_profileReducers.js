export default (state = null, action) => {
  switch (action.type) {
    case 'CURRENT_PROFILE':
      return action.payload;
      break;
  }
  return state;
};

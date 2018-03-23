export default (state = null, action) => {
  switch (action.type) {
    case 'CURRENT_FOLLOWING':
      return action.payload;
      break;
  }
  return state;
};

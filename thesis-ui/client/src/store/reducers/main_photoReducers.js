export default (state = null, action) => {
  switch (action.type) {
    case 'MAIN_PHOTO':
      return action.payload;
      break;
  }
  return state;
};

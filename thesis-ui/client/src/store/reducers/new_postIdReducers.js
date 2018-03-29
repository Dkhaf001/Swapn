export default (state = null, action) => {
  switch (action.type) {
    case 'NEW_POST_ID':
      return action.payload;
      break;
  }
  return state;
};

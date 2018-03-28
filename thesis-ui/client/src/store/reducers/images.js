export default (state = null, action) => {
  switch (action.type) {
    case 'IMAGES':
      return action.payload;
      break;
  }
  return state;
};

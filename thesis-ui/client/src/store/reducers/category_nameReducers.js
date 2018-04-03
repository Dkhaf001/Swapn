export default (state = null, action) => {
  switch (action.type) {
    case 'CATEGORY_NAME':
      return action.payload;
      break;
  }
  return state;
};

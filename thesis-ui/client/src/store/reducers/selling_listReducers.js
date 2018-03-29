export default (state = null, action) => {
  switch (action.type) {
    case 'SELLING_LIST':
      return action.payload;
      break;
  }
  return state;
};

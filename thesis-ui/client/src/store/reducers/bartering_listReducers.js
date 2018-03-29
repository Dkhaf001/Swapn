export default (state = null, action) => {
  switch (action.type) {
    case 'BARTERING_LIST':
      return action.payload;
      break;
  }
  return state;
};

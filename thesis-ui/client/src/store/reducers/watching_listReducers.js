export default (state = null, action) => {
  switch (action.type) {
    case 'WATCHING_LIST':
      return action.payload;
      break;
  }
  return state;
};

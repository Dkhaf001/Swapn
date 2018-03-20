export default (state = null, action) => {
  switch (action.type) {
    case 'CURRENT_POST':
      return action.payload;
      break;
  }
  return state;
};

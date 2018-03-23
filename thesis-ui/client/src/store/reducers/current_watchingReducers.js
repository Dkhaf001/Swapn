export default (state = null, action) => {
  switch (action.type) {
    case 'CURRENT_WATCHER':
      return action.payload;
      break;
  }
  return state;
};

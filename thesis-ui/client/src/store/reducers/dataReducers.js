export default (state = null, action) => {
  switch(action.type) {
    case 'WORD':
    return action.payload;
    break;
  }
  return state
}
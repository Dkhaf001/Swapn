export default (state=null, action) => {
  switch(action.type) {
    case 'CURRENT_LIST':
    return action.payload;
    break;
  }
  return state
}
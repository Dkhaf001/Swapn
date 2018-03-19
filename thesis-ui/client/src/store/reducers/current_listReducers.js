export default (state=null, action) => {
  switch(active.type) {
    case 'CURRENT_LIST':
    return action.payload;
    break;
  }
  return state
}
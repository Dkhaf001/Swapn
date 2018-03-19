export default (state=null, action) => {
  switch(active.type) {
    case 'ACTIVE_USER':
    return action.payload;
    break;
  }
  return state
}
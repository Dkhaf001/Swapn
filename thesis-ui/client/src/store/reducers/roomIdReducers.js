export default (state=null, action) => {
  switch(action.type) {
    case "ROOMID":
    return action.payload;
    break;
  }
  return state
}
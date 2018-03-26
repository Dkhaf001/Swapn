export default (state=null, action) => {
  switch(action.type) {
    case "Position":
    return action.payload;
    break;
  }
  return state
}
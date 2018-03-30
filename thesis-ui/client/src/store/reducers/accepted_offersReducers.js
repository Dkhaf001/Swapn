export default (state=null, action) => {
  switch(action.type) {
    case "ACCEPTED_OFFERS":
    return action.payload;
    break;
  }
  return state
}
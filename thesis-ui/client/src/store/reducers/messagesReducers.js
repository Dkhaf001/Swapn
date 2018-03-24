export default (state=null, action) => {
  switch(action.type){
    case "MESSAGES":
    return action.payload;
    break;
  }
  return state
}
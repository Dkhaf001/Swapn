export default (state=null, action) => {
  switch(action.type) {
    case "SOCKET": 
    return action.payload;
    break;
  }
  return state;
}
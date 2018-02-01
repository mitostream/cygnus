const initState = {
  default: 'eur',
}
export default function (state=initState, action) {
  switch (action.type) {
    case 'SET_CURRENCY':
      state = {...state, default: action.payload}
      break;
    case 'LOG_OUT':
      state = initState
      break;
    default:
      break;
  }
  return state
}
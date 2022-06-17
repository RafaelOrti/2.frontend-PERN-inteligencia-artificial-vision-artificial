import {
  EMOTIONS
} from '../actions'

const initialState = {
  timer: 0,
  emotion: {}
}

const busquedaEmotionsReducer = (state = initialState, action) => {
  switch (action.type) {
    // GUARDO EN EL ESTADO LOS DATOS DEL USUARIO LOGUEADO
    case EMOTIONS:
      // console.log("action.payload", state)
      if (action.payload) {
        return {
          ...state,
          emotion: action.payload,
          timer: state.timer++
        }
      } else {
        return state
      }
    default:
      return state
  }
}

export default busquedaEmotionsReducer

import {
  combineReducers
} from 'redux'

import credentials from './datosLogin.reducer'
import search from './busquedaFilms.reducer'
import hideFooter from './hideFooter.reducer'
import emotions from './emociones.reducer'

const rootReducer = combineReducers({
  credentials,
  search,
  hideFooter,
  emotions
})

export default rootReducer

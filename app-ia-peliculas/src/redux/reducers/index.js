
import {combineReducers} from 'redux';

import credentials from './datosLogin-reducer';
import search from './busquedaFilms-reducer';
import hideFooter from './hideFooter-reducer';

const rootReducer = combineReducers({
    credentials,
    search,
    hideFooter
});

export default rootReducer;
import {EMOTIONS} from '../actions';

const initialState = {
    emotion:{}
};

const busquedaEmotionsReducer = (state = initialState, action) => {
    switch(action.type){
        //GUARDO EN EL ESTADO LOS DATOS DEL USUARIO LOGUEADO
        case EMOTIONS :
            console.log("action.payload")
            console.timeLog()
            console.log(action.payload)
            return {...state, emotion: action.payload};

        default :
            return state
    }
}

export default busquedaEmotionsReducer;
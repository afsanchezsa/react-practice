import { COMMENTS } from '../shared/comments'
import * as ActionTypes from './ActionTypes';//el state=COMMENTS quiere decir que ese es su valor por defecto
export const Comments = (state = {
    errMess: null,
    comments: []
}, action) => {//Comments es un reducer es decir una funcion que recibe una accion y el estado actual y retorna un nuevo estado
    switch (action.type) {
        case ActionTypes.ADD_COMMENTS:
            return {...state,isLoading :false,errMess:null,comments: action.payload}
        case ActionTypes.COMMENTS_FAILED:
            return {...state,isLoading: false,errMess: action.payload,comments: []}

        case ActionTypes.ADD_COMMENT:
            var comment = action.payload;
            comment.id = state.comments.length;
            comment.date = new Date().toISOString();
            return {...state,comments:state.comments.concat(comment)};//es importante el concat pues es una operacion inmutable del estado (crea un nuevo estado y no lo modifica)


        default:
            return state;
    }
}
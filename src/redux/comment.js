import {COMMENTS} from '../shared/comments'
import * as ActionTypes from './ActionTypes';//el state=COMMENTS quiere decir que ese es su valor por defecto
export const Comments=(state=COMMENTS,action)=>{//Comments es un reducer es decir una funcion que recibe una accion y el estado actual y retorna un nuevo estado
    switch(action.type){
        case ActionTypes.ADD_COMMENT:
            var comment =action.payload;
            comment.id= state.length;
            comment.date=new Date().toISOString();
            return state.concat(comment);//es importante el concat pues es una operacion inmutable del estado (crea un nuevo estado y no lo modifica)

        
        default:
            return state;
    }
}
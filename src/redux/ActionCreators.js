import * as ActionTypes from './ActionTypes';
import { DISHES } from '../shared/dishes';

export const addComment = (dishId, rating, author, comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
});

export const fetchDishes = () => (dispatch) => {//este es un thunk (en ves de retornar un action retorna una funcion que recibe como parametro el dispatcher)

    dispatch(dishesLoading(true));
    setTimeout(() => {

        dispatch(addDishes(DISHES))
    }, 2000);
}
export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
})
export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
})
export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
})

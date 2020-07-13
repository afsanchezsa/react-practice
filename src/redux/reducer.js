import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';
//este archivo ya no es necesario pues separamos cada unidad(COMMENTS ...) en los otros archivos
export const initialState = {
    dishes: DISHES,
    comments: COMMENTS,
    promotions: PROMOTIONS,
    leaders: LEADERS
};
export const Reducer = (state = initialState, action) => {
    return state;
};
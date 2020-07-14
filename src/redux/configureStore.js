import {createStore,combineReducers,applyMiddleware} from 'redux';
import {Dishes} from './dishes'
import {Comments} from './comment'
import {Promotions} from './promotions'
import {Leaders} from './leader'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
export const ConfigureStore=()=>{
    const store=createStore(
       combineReducers({
        dishes:Dishes,//cada uno es un reducer con su estado inicial
        comments:Comments,
        promotions:Promotions,
        leaders: Leaders
       }),
       applyMiddleware(thunk,logger)
    )
    return store;
}
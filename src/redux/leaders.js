import {LEADERS} from '../shared/leaders'
import * as ActionTypes from './ActionTypes'

export const Leaders = (state = {
    isLoading: true,
    errMess: '',
    leaders: []
}, action) => {
    switch (action.type) {
        case ActionTypes.LEADERS_LOADING:
            return {...state, isLoading: true, errMess: '', leaders: []};
        case ActionTypes.LEADERS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, leaders: []};
        case ActionTypes.ADD_LEADERS:
            return {...state, isLoading: false, errMess: '', leaders: action.payload}

        default:
            return state;
    }
}
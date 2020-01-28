import {SET_ALERT,REMOVE_ALERT} from '../actions/types';
const initialState = [
    {
        id:1,
        msg:'Please '
    }
];

export default function(state =initialState,action){
    switch(type){
        case 'SET_ALERT':
            case SET_ALERT:
                return [...state,payload];
            case REMOVE_ALERT:
                return state.filter(alert => alert.id !==payload);
            default:
                return state;    
    }
}
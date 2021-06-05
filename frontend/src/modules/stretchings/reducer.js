import { combineReducers } from "redux";

import * as actionTypes from './actionsTypes';

const initialState = {
    stretching: null,
    stretchings:null
};

const stretching = (state = initialState.stretching, action) => {

    switch(action.type) {
        case actionTypes.ADD_STRETCHING_COMPLETED:
            return action.stretching;
        case actionTypes.ADD_STRETCHING_TO_PLAYER_COMPLETED:
            return state;
        case actionTypes.ADD_STRETCHING_TO_TRAINING_COMPLETED:
            return state;
        case actionTypes.ADD_STRETCHING_TO_GAME_COMPLETED:
            return state;
        case actionTypes.UPDATE_STRETCHING_COMPLETED:
            return action.stretching;
        case actionTypes.REMOVE_STRETCHING_COMPLETED:
            return state;
        case actionTypes.REMOVE_STRETCHING_TO_PLAYER_COMPLETED:
            return state;
        case actionTypes.REMOVE_STRETCHING_TO_TRAINING_COMPLETED:
            return state;
        case actionTypes.REMOVE_STRETCHING_TO_GAME_COMPLETED:
            return state;
        case actionTypes.FIND_STRETCHING_BY_ID_COMPLETED:
            return action.stretching;
        default:
            return state;
    }
}

const stretchings = (state = initialState.stretchings, action) => {

    switch (action.type) {
        
        case actionTypes.FIND_ALL_STRETCHINGS_COMPLETED:
            return action.stretchings;
        case actionTypes.FIND_STRETCHINGS_BY_PLAYER_ID_COMPLETED:
            return action.stretchings;
        case actionTypes.FIND_STRETCHINGS_BY_TRAINING_ID_COMPLETED:
            return action.stretchings;
        case actionTypes.FIND_STRETCHINGS_BY_GAME_ID_COMPLETED:
            return action.stretchings;
        case actionTypes.FIND_STRETCHINGS_BY_TYPE_COMPLETED:
            return action.stretchings;
        default:
            return state;
    }
}

const reducer = combineReducers({
    stretching,
    stretchings
});

export default reducer;
import * as actionTypes from './actionsTypes';
import backend from '../../backend';

const findLesionByIdCompleted = lesion => ({
    type: actionTypes.FIND_LESION_BY_ID_COMPLETED,
    lesion
});

export const findLesionById = (lesionId, onSuccess, onErrors) => dispatch => {
    backend.lesionService.findLesionById(lesionId,
        lesion => {
            dispatch(findLesionByIdCompleted(lesion));
            onSuccess();
        },
        onErrors);
}

const findAllLesionCompleted = lesions => ({
    type: actionTypes.FIND_ALL_LESION_COMPLETED,
    lesions
});

export const findAllLesion = (onSuccess, onErrors) => dispatch => {
    backend.lesionService.findAllLesion(
        lesions => {
            dispatch(findAllLesionCompleted(lesions));
            onSuccess();
        },
        onErrors);
}

const findLesionByTypeCompleted = lesions => ({
    type: actionTypes.FIND_LESION_BY_TYPE_COMPLETED,
    lesions
});

export const findLesionByType = (lesionType, onSuccess, onErrors) => dispatch => {
    backend.lesionService.findLesionByType(lesionType,
        lesions => {
            dispatch(findLesionByTypeCompleted(lesions));
            onSuccess();
        },
        onErrors);
}

const findLesionByPlayerCompleted = lesions => ({
    type: actionTypes.FIND_LESION_BY_PLAYER_COMPLETED,
    lesions
});

export const findLesionByPlayer = (playerId, onSuccess, onErrors) => dispatch => {
    backend.lesionService.findLesionByPlayer(playerId,
        lesions => {
            dispatch(findLesionByPlayerCompleted(lesions));
            onSuccess();
        },
        onErrors);
}

const addLesionCompleted = lesion => ({
    type: actionTypes.ADD_LESION_COMPLETED,
    lesion
});

export const addLesion = (lesionName, description, medication, lesionType, onSuccess, onErrors) => dispatch => {
    backend.lesionService.addLesion(lesionName, description, medication, lesionType,
        lesion => {
            dispatch(addLesionCompleted(lesion));
            onSuccess();
        },
        onErrors);
}

export const addLesionToPlayer = (playerId, lesionId, onSuccess, onErrors) => {
    backend.lesionService(playerId, lesionId, onSuccess, onErrors);
    return {type: actionTypes.ADD_LESION_TO_PLAYER_COMPLETED};
}

const updateLesionCompleted = lesion => ({
    type: actionTypes.UPDATE_LESION_COMPLETED,
    lesion
});

export const updateLesion = (lesionId, lesionName, description, medication, lesionType, onSuccess, onErrors) => dispatch => {
    backend.lesionService.updateLesion(lesionId, lesionName, description, medication, lesionType,
        lesion => {
            dispatch(updateLesionCompleted(lesion));
            onSuccess();
        },
        onErrors);
}

export const removeLesion = (lesionId, onSuccess, onErrors) => {
    backend.lesionService.removeLesion(lesionId, onSuccess, onErrors);
    return {type: actionTypes.REMOVE_LESION_COMPLETED};
}

export const removeLesionToPlayer = (playerId, lesionId, onSuccess, onErrors) => {
    backend.lesionService.removeLesionToPlayer(playerId, lesionId, onSuccess, onErrors);
    return {type: actionTypes.REMOVE_LESION_TO_PLAYER_COMPLETED};
}
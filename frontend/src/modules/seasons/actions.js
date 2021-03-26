import * as actionTypes from './actionsTypes';
import backend from '../../backend';


const findAllSeaonsCompleted = seasons => ({
    typeo: actionTypes.FIND_ALL_SEASONS_COMPLETED,
    seasons
});

export const findAllSeasons = () => dispatch => {
    backend.seasonService.findAllSeasons(
        seasons => dispatch(findAllSeaonsCompleted(seasons))
    );
}

const findSeasonByIdCompleted = season => ({
    type: actionTypes.FIND_SEASON_BY_ID_COMPLETED,
    season
});

export const findSeasonById = (id, onSuccess) => dispatch => {
    backend.seasonService.findSeasonById(id,
        season => {dispatch(findSeasonByIdCompleted(season));
        onSuccess();
        }
    );
}

const findSeasonsBetweenTwoDatesCompleted = seasons => ({
    type: actionTypes.FIND_SEASONS_BETWEEN_TWO_DATES_COMPLETED,
    seasons
});

export const findSeasonsBetweenTwoDates = (startDate, endDate, onSucces, onErrors) => dispatch => {
    backend.seasonService.findSeasonsBetweenTwoDates(startDate, endDate,
        seasons => {dispatch(findSeasonsBetweenTwoDatesCompleted(seasons));
        onSucces();
        },
    onErrors);
}

const updateSeasonCompleted = season => ({
    type: actionTypes.UPDATE_SEASON_COMPLETED,
    season
});

export const updateSeason =  (season, onSuccess, onErrors) => dispatch =>{
    backend.seasonService.updateSeason(season,
        season => {
            dispatch(updateSeasonCompleted(season));
            onSuccess();
        },
        onErrors);
}

const addSeasonCompleted = season => ({
    type: actionTypes.ADD_SEASON_COMPLETED,
    season
});

export const addSeason =  (season, onSuccess, onErrors) => dispatch =>{
    backend.seasonService.addSeason(season,
        season => {
            dispatch(addSeasonCompleted(season));
            onSuccess();
        },
        onErrors);
}

export const removeSeason = (id, onSuccess, onErrors) => {
    backend.seasonService.removeSeason(id, onSuccess, onErrors);
    return {type: actionTypes.REMOVE_SEASON_COMPLETED};
}

//findSeasonsToTeam
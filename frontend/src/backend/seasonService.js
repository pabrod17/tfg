import {config, appFetch} from './appFetch';

export const findAllSeasons = (onSuccess) =>
    appFetch('/seasons', config('GET'), onSuccess);

export const findSeasonById = (id, onSuccess) =>
    appFetch(`/seasons/season/${id}`, config('GET'), onSuccess);

export const findSeasonsBetweenTwoDates = (startDate, endDate, onSuccess, onErrors) =>
    appFetch(`/seasons/betweenDates?startDate=${startDate}?endDate=${endDate}`, config('GET'), onSuccess, onErrors);

export const addSeason = (season, onSuccess, onErrors) =>
    appFetch('/seasons/addSeason/', config('POST', season), onSuccess, onErrors);

export const updateSeason = (season, onSuccess, onErrors) =>
    appFetch(`/seasons/update/${season.id}`, config('PUT', season), onSuccess, onErrors);

export const removeSeason = (id, onSuccess, onErrors) =>
    appFetch(`/seasons/remove/${id}`, config('DELETE'), onSuccess, onErrors);

//findSeasonsToTeam
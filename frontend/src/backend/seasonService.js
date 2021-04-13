import {config, appFetch} from './appFetch';

export const findAllSeasons = (onSuccess) =>
    appFetch('/seasons', config('GET'), onSuccess);

export const findSeasonById = (id, onSuccess) =>
    appFetch(`/seasons/season/${id}`, config('GET'), onSuccess);

export const findSeasonsBetweenTwoDates = (startDate, endDate, onSuccess, onErrors) =>
    appFetch(`/seasons/betweenDates?startDate=${startDate}&endDate=${endDate}`, config('GET'), onSuccess, onErrors);

export const addSeason = (startDate, endDate, calendario, onSuccess, onErrors) =>
    appFetch(`/seasons/addSeason/?startDate=${startDate}&endDate=${endDate}&calendario=${calendario}`, config('POST'), onSuccess, onErrors);

export const updateSeason = (id, startDate, endDate, calendario, onSuccess, onErrors) =>
    appFetch(`/seasons/update/${id}?startDate=${startDate}&endDate=${endDate}&calendario=${calendario}`, config('PUT'), onSuccess, onErrors);

export const removeSeason = (id, onSuccess, onErrors) =>
    appFetch(`/seasons/remove/${id}`, config('DELETE'), onSuccess, onErrors);

export const findSeasonsToTeam = (teamId, onSuccess, onErrors) => 
    appFetch(`/seasons/toTeam/${teamId}`, config('GET'), onSuccess, onErrors);

import {config, appFetch} from './appFetch';

export const findAllTeams = (onSuccess) =>
    appFetch('/teams/all', config('GET'), onSuccess);

export const findTeamById = (id, onSuccess) =>
    appFetch(`/teams/find/${id}`, config('GET'), onSuccess);

export const findTeamByName = (name, onSuccess) =>{
    appFetch(`/teams/${name}`, config('GET'), onSuccess);
}

export const addTeam = (team, onSuccess, onErrors) =>
    appFetch('/teams/new/', config('POST', team), onSuccess, onErrors);

export const updateTeam = (team, onSuccess, onErrors) =>
    appFetch(`/teams/update/${team.id}`, config('PUT', team), onSuccess, onErrors);

export const removeTeam = (id, onSuccess, onErrors) =>{
    appFetch(`/teams/remove/${id}`, config('DELETE'), onSuccess, onErrors);
}
//FALTA addTeamToSeason
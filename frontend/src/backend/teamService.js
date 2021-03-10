import {config, appFetch} from './appFetch';

export const findAllTeams = (onSuccess) =>
    appFetch('/teams/all', config('GET'), onSuccess);

export const findTeamById = (id, onSuccess) =>
    appFetch(`/teams/find/${id}`, config('GET'), onSuccess);

export const findTeamByName = (name, onSuccess) =>{

    appFetch(`/teams/${name}`, config('GET'), onSuccess);
}

export const addTeam = (id, teamName, onSuccess) =>
    appFetch('/teams/new/', config('POST', {id, teamName}), onSuccess);

export const updateTeam = (id, teamName, onSuccess) =>
    appFetch(`/teams/update/${id}`, config('PUT', {id, teamName}), onSuccess);

export const removeTeam = (id, onSuccess, onErrors) =>{
    console.log('servicio ' + id);
    appFetch(`/teams/remove/${id}`, config('DELETE'), onSuccess, onErrors);
}
//FALTA addTeamToSeason
import {config, appFetch} from './appFetch';

export const findAllTeams = (onSuccess) =>
    appFetch('/teams', config('GET'), onSuccess);

export const findTeamById = (id, onSuccess) =>
    appFetch(`/teams/team/${id}`, config('GET'), onSuccess);

export const findTeamByName = (name, onSuccess) =>{
    appFetch(`/teams/name/${name}`, config('GET'), onSuccess);
}

export const addTeam = (name, onSuccess, onErrors) =>
    appFetch(`/teams/addTeam/?name=${name}`, config('POST'), onSuccess, onErrors);

export const updateTeam = (id, name, onSuccess, onErrors) =>
    appFetch(`/teams/update/${id}?name=${name}`, config('PUT'), onSuccess, onErrors);

export const removeTeam = (id, onSuccess, onErrors) =>{
    appFetch(`/teams/remove/${id}`, config('DELETE'), onSuccess, onErrors);
}

export const addTeamToSeason = (seasonId, teamId, onSuccess, onErrors) =>
    appFetch(`/teams/addTeamtoSeason/${seasonId}?teamId=${teamId}`, config('POST'), onSuccess, onErrors);

export const findTeamsToSeason = (seasonId, onSuccess, onErrors) => 
    appFetch(`/teams/toSeason/${seasonId}`, config('GET'), onSuccess, onErrors);


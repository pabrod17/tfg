import * as actionTypes from './actionsTypes';
import * as selectors from './selectors';
import backend from '../../backend';

const findAllTeamsCompleted = teams => ({
    type: actionTypes.FIND_ALL_TEAMS_COMPLETED,
    teams
});

export const findAllTeams = () => dispatch => {
    backend.teamService.findAllTeams(
        teams => dispatch(findAllTeamsCompleted(teams))
    );
}

const findTeamtByIdCompleted = team => ({
    type: actionTypes.FIND_TEAM_BY_ID_COMPLETED,
    team
});

export const findTeamById = teamId => dispatch => {
    backend.teamService.findTeamById(teamId,
        team => dispatch(findTeamtByIdCompleted(team)));
}

const findTeamtByNameCompleted = team => ({
    type: actionTypes.FIND_TEAM_BY_NAME_COMPLETED,
    team
});

export const findTeamByName = teamName => dispatch => {
    backend.teamService.findTeamByName(teamName,
        team => dispatch(findTeamtByNameCompleted(team)));
}

const updateTeamCompleted = team => ({
    type: actionTypes.UPDATE_TEAM_COMPLETED,
    team
});

export const updateTeam =  (team, onSuccess, onErrors) => dispatch =>{
    backend.teamService.updateTeam(team,
        team => {
            dispatch(updateTeamCompleted(team));
            onSuccess();
        },
        onErrors);
}

const addTeamCompleted = team => ({
    type: actionTypes.ADD_TEAM_COMPLETED,
    team
});

export const addTeam =  (team, onSuccess, onErrors) => dispatch =>{
    backend.teamService.addTeam(team,
        team => {
            dispatch(addTeamCompleted(team));
            onSuccess();
        },
        onErrors);
}

//falta removeTeam y addTeamToSeason

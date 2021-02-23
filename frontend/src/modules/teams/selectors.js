const getModuleState = state => state.teams;

export const getTeam = state =>
    getModuleState(state).team;

export const getAllTeams = state =>
    getModuleState(state).teams;

export const getTeamName = (teams, id) => {

    if (!teams) {
        return '';
    }

    const team = teams.find(team => team.teamId === id);

    if (!team) {
        return '';
    }

    return team.teamName;

}
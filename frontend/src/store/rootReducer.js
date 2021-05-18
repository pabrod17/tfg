import {combineReducers} from 'redux';

import app from '../modules/app';
import users from '../modules/users';
import teams from '../modules/teams';
import seasons from '../modules/seasons';
import players from '../modules/players';
import lesion from '../modules/lesion';

const rootReducer = combineReducers({
    app: app.reducer,
    users: users.reducer,
    teams: teams.reducer,
    seasons: seasons.reducer,
    players: players.reducer,
    lesion: lesion.reducer
});

export default rootReducer;

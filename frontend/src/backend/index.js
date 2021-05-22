import {init} from './appFetch';
import * as userService from './userService';
import * as teamService from './teamService';
import * as seasonService from './seasonService';
import * as playerService from './playerService';
import * as lesionService from './lesionService';
import * as noteService from './noteService';
import * as playService from './playService';

export {default as NetworkError} from "./NetworkError";

export default {init, userService, teamService, seasonService, playerService, lesionService, noteService, playService};

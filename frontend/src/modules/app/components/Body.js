import React from 'react';
import {useSelector} from 'react-redux';
import {Route, Switch} from 'react-router-dom';

import AppGlobalComponents from './AppGlobalComponents';
import Home from './Home';
import {Login, SignUp, UpdateProfile, ChangePassword, Logout} from '../../users';
import users from '../../users';
import {FindTeamsResult, FindTeams, RemoveTeam, AddTeam, UpdateTeam, TeamView} from '../../teams';
import video from './video-2.mp4';
import fondoCanasta from './fondoCanasta.jpg';
import FindTeamByName from '../../teams/components/FindTeamByName';
import FindTeamByNameResult from '../../teams/components/FindTeamByNameResult';
import FindSeasons from '../../seasons/components/FindSeasons';
import AddSeason from '../../seasons/components/AddSeason';
import FindSeasonsResult from '../../seasons/components/FindSeasonsResult';
import SeasonView from '../../seasons/components/SeasonView';
import UpdateSeason from '../../seasons/components/UpdateSeason';
import FindSeasonsBetweenTwoDates from '../../seasons/components/FindSeasonsBetweenTwoDates';
import FindSeasonsBetweenTwoDatesResult from '../../seasons/components/FindSeasonsBetweenTwoDatesResult';
import AddTeamToSeason from '../../teams/components/AddTeamToSeason';
import PlayersHome from '../../players/components/PlayersHome';
import UpdatePlayer from '../../players/components/UpdatePlayer';
import AddPlayer from '../../players/components/AddPlayer';
import PlayerView from '../../players/components/PlayerView';
import FindPlayerByDni from '../../players/components/FindPlayerByDni';
import FindPlayerByDniResult from '../../players/components/FindPlayerByDniResult';
import FindPlayersByCompletedName from '../../players/components/FindPlayersByCompletedName';
import FindPlayersByCompletedNameResult from '../../players/components/FindPlayersByCompletedNameResult';
import LesionHome from '../../lesion/components/LesionHome';
import AddLesion from '../../lesion/components/AddLesion';
import UpdateLesion from '../../lesion/components/UpdateLesion';
import LesionView from '../../lesion/components/LesionView';
import LesionHomeByPlayer from '../../lesion/components/LesionHomeByPlayer';
import AddNote from '../../notes/components/AddNote';
import NotesHome from '../../notes/components/NotesHome';
import UpdateNote from '../../notes/components/UpdateNote';
import NoteView from '../../notes/components/NoteView';
import PlaysHome from '../../plays/components/PlaysHome';
import AddPlay from '../../plays/components/AddPlay';
import UpdatePlay from '../../plays/components/UpdatePlay';
import PlayView from '../../plays/components/PlayView';
import TrainingHome from '../../trainings/components/TrainingHome';
import AddTraining from '../../trainings/components/AddTraining';
import TrainingView from '../../trainings/components/TrainingView';
import UpdateTraining from '../../trainings/components/UpdateTraining';
import FindPlayersByTraining from '../../players/components/FindPlayersByTraining';
import GamesHome from '../../games/components/GamesHome';
import AddGame from '../../games/components/AddGame';
import GameView from '../../games/components/GameView';
import UpdateGame from '../../games/components/UpdateGame';
import FindPlayersByGame from '../../players/components/FindPlayersByGame';
import AddGameStatistics from '../../statistics/components/AddGameStatistics';
import FindGameStatistics from '../../statistics/components/FindGameStatistics';
import UpdateGameStatistics from '../../statistics/components/UpdateGameStatistics';
import AddPlayerGameStatistics from '../../statistics/components/AddPlayerGameStatistics';
import FindPlayerGameStatistics from '../../statistics/components/FindPlayerGameStatistics';
import UpdatePlayerGameStatistics from '../../statistics/components/UpdatePlayerGameStatistics';
import StretchingsHome from '../../stretchings/components/StretchingsHome';
import StretchingView from '../../stretchings/components/StretchingView';
import AddStretching from '../../stretchings/components/AddStretching';
import UpdateStretching from '../../stretchings/components/UpdateStretching';
import StretchingsHomeByPlayer from '../../stretchings/components/StretchingsHomeByPlayer';
import StretchingsHomeByGame from '../../stretchings/components/StretchingsHomeByGame';
import StretchingsHomeByTraining from '../../stretchings/components/StretchingsHomeByTraining';
import ExercisesHome from '../../exercises/components/ExercisesHome';
import AddExercise from '../../exercises/components/AddExercise';
import UpdateExercise from '../../exercises/components/UpdateExercise';
import ExerciseView from '../../exercises/components/ExerciseView';
import ExercisesHomeByTraining from '../../exercises/components/ExercisesHomeByTraining';
import ExercisesHomeByGame from '../../exercises/components/ExercisesHomeByGame';

const Body = () => {

    const loggedIn = useSelector(users.selectors.isLoggedIn);
    
    return (

        <div className="hero-container">
            {/* <video src={video} autoPlay loop muted /> */}
            
            <br/>
            <AppGlobalComponents/>
            <Switch>
                <Route exact path="/"><Home/></Route>
                {loggedIn && <Route exact path="/teams/new"><AddTeam/></Route>}
                {loggedIn && <Route exact path="/teams/update"><UpdateTeam/></Route>}
                {loggedIn && <Route exact path="/teams/addTeamToSeason"><AddTeamToSeason/></Route>}
                {loggedIn && <Route exact path="/teams/view/:id"><TeamView/></Route>}
                {loggedIn && <Route exact path="/teams/all"><FindTeams/></Route>}
                {loggedIn && <Route exact path="/teams/all/result"><FindTeamsResult/></Route>}
                {loggedIn && <Route exact path="/teams/all/name"><FindTeamByName/></Route>}
                {loggedIn && <Route exact path="/teams/all/name/result/:teamName"><FindTeamByNameResult/></Route>}
                {loggedIn && <Route exact path="/seasons/all"><FindSeasons/></Route>}
                {loggedIn && <Route exact path="/seasons/new"><AddSeason/></Route>}
                {loggedIn && <Route exact path="/seasons/update"><UpdateSeason/></Route>}
                {loggedIn && <Route exact path="/seasons/all/result"><FindSeasonsResult/></Route>}
                {loggedIn && <Route exact path="/seasons/betweenDates"><FindSeasonsBetweenTwoDates/></Route>}
                {loggedIn && <Route exact path="/seasons/betweenDates/result/:startDate/:endDate"><FindSeasonsBetweenTwoDatesResult/></Route>}
                {loggedIn && <Route exact path="/seasons/view/:id"><SeasonView/></Route>}
                {loggedIn && <Route exact path="/players/home/training/:id:trainingId"><FindPlayersByTraining/></Route>}
                {loggedIn && <Route exact path="/players/home/game/:id:gameId"><FindPlayersByGame/></Route>}
                {loggedIn && <Route exact path="/players/home/:id"><PlayersHome/></Route>}
                {loggedIn && <Route exact path="/players/addPlayer/:id"><AddPlayer/></Route>}
                {loggedIn && <Route exact path="/players/update/:id"><UpdatePlayer/></Route>}
                {loggedIn && <Route exact path="/players/dni/:id"><FindPlayerByDni/></Route>}
                {loggedIn && <Route exact path="/players/completedName/:id"><FindPlayersByCompletedName/></Route>}
                {loggedIn && <Route exact path="/players/dni/result/:dni:id"><FindPlayerByDniResult/></Route>}
                {loggedIn && <Route exact path="/players/completedName/result/:id:playerName:primaryLastName:secondLastName"><FindPlayersByCompletedNameResult/></Route>}
                {loggedIn && <Route exact path="/players/home/:id"><PlayersHome/></Route>}
                {loggedIn && <Route exact path="/players/view/:id:playerId"><PlayerView/></Route>}
                {loggedIn && <Route exact path="/lesion/home"><LesionHome/></Route>}
                {loggedIn && <Route exact path="/lesion/home/player/:playerId"><LesionHomeByPlayer/></Route>}
                {loggedIn && <Route exact path="/lesion/addLesion"><AddLesion/></Route>}
                {loggedIn && <Route exact path="/lesion/update/:id"><UpdateLesion/></Route>}
                {loggedIn && <Route exact path="/lesion/view/:id"><LesionView/></Route>}
                {loggedIn && <Route exact path="/notes/addNote/:playerId"><AddNote/></Route>}
                {loggedIn && <Route exact path="/notes/home/:id:playerId"><NotesHome/></Route>}
                {loggedIn && <Route exact path="/notes/update/:id:noteId"><UpdateNote/></Route>}
                {loggedIn && <Route exact path="/notes/view/:noteId"><NoteView/></Route>}
                {loggedIn && <Route exact path="/plays/home/:id"><PlaysHome/></Route>}
                {loggedIn && <Route exact path="/plays/update/:id"><UpdatePlay/></Route>}
                {loggedIn && <Route exact path="/plays/addPlay/:id"><AddPlay/></Route>}
                {loggedIn && <Route exact path="/plays/view/:playId"><PlayView/></Route>}
                {loggedIn && <Route exact path="/trainings/home"><TrainingHome/></Route>}
                {loggedIn && <Route exact path="/trainings/addTraining"><AddTraining/></Route>}
                {loggedIn && <Route exact path="/trainings/view/:id"><TrainingView/></Route>}
                {loggedIn && <Route exact path="/trainings/update/:id"><UpdateTraining/></Route>}
                {loggedIn && <Route exact path="/games/home"><GamesHome/></Route>}
                {loggedIn && <Route exact path="/games/addGame"><AddGame/></Route>}
                {loggedIn && <Route exact path="/games/view/:id"><GameView/></Route>}
                {loggedIn && <Route exact path="/games/update/:id"><UpdateGame/></Route>}
                {loggedIn && <Route exact path="/statistics/addGameStatistics/:gameId"><AddGameStatistics/></Route>}
                {loggedIn && <Route exact path="/statistics/addPlayerGameStatistics/:playerId:gameId"><AddPlayerGameStatistics/></Route>}
                {loggedIn && <Route exact path="/statistics/game/:gameId"><FindGameStatistics/></Route>}
                {loggedIn && <Route exact path="/statistics/playerGame/:playerId:gameId"><FindPlayerGameStatistics/></Route>}
                {loggedIn && <Route exact path="/statistics/game/update/:gameId"><UpdateGameStatistics/></Route>}
                {loggedIn && <Route exact path="/statistics/playerGame/update/:playerId:gameId"><UpdatePlayerGameStatistics/></Route>}
                {loggedIn && <Route exact path="/stretchings/home"><StretchingsHome/></Route>}
                {loggedIn && <Route exact path="/stretchings/view/:id"><StretchingView/></Route>}
                {loggedIn && <Route exact path="/stretchings/addStretching"><AddStretching/></Route>}
                {loggedIn && <Route exact path="/stretchings/update/:id"><UpdateStretching/></Route>}
                {loggedIn && <Route exact path="/stretchings/home/player/:playerId"><StretchingsHomeByPlayer/></Route>}
                {loggedIn && <Route exact path="/stretchings/home/game/:gameId"><StretchingsHomeByGame/></Route>}
                {loggedIn && <Route exact path="/stretchings/home/training/:trainingId"><StretchingsHomeByTraining/></Route>}
                {loggedIn && <Route exact path="/exercises/home"><ExercisesHome/></Route>}
                {loggedIn && <Route exact path="/exercises/addExercise"><AddExercise/></Route>}
                {loggedIn && <Route exact path="/exercises/update/:id"><UpdateExercise/></Route>}
                {loggedIn && <Route exact path="/exercises/view/:id"><ExerciseView/></Route>}
                {loggedIn && <Route exact path="/exercises/home/training/:trainingId"><ExercisesHomeByTraining/></Route>}
                {loggedIn && <Route exact path="/exercises/home/game/:gameId"><ExercisesHomeByGame/></Route>}
                {loggedIn && <Route exact path="/users/update-profile"><UpdateProfile/></Route>}
                {loggedIn && <Route exact path="/users/change-password"><ChangePassword/></Route>}
                {loggedIn && <Route exact path="/users/logout"><Logout/></Route>}
                {!loggedIn && <Route exact path="/users/login"><Login/></Route>}
                {!loggedIn && <Route exact path="/users/signup"><SignUp/></Route>}
                <Route><Home/></Route>
            </Switch>
        </div>

    );

};

export default Body;

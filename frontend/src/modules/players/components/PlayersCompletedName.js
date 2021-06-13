import React from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import * as actions from '../actions';
import { useHistory } from 'react-router';
import Card from "react-bootstrap/Card";
import avatar from '../../players/components/avatar.jpg';
import {FormattedMessage} from 'react-intl';
import * as actionsTeams from '../../teams/actions';
import * as selectorsTeams from '../../teams/selectors';
import * as actionsNotes from '../../notes/actions';
import * as actionTrainings from '../../trainings/actions';
import * as actionsLesion from '../../lesion/actions';
import * as selectorsLesion from '../../lesion/selectors';
import * as selectorsTrainings from '../../trainings/selectors';
import * as actionGames from '../../games/actions';
import * as selectorsGames from '../../games/selectors';
import * as actionStretchings from '../../stretchings/actions';
import * as selectorsStretchings from '../../stretchings/selectors';

const handleFindTrainingsToPlayer = (playerId, dispatch, history) => {
  dispatch(actionTrainings.findTrainingsByPlayerId(playerId, () => history.push('/trainings/home')));
  // history.push('/trainings/home');
}

const handleFindGamesToPlayer = (playerId, id, dispatch, history) => {
  dispatch(actions.findPlayerByIdOfTeam(playerId,id, () => console.log(playerId)));
  dispatch(actionGames.findGamesByPlayerId(playerId, () => history.push('/games/home')));
  // history.push('/trainings/home');
}

const handleRemovePlayer = (playerId, id, dispatch, history) => {
    dispatch(actions.removePlayer(playerId, id, () => history.push(`/players/home/${id}`)));
    window.location.reload('true');
  }
  
  const handleUpdatePlayer = (playerId, id, dispatch, history) => {
    dispatch(actions.findPlayerByIdOfTeam(playerId, id, () => history.push(`/players/update/${id}`)));
  }
  
  const handleViewPlayer = (playerId, id, dispatch, history) => {
    dispatch(actions.findPlayerByIdOfTeam(playerId, id, () => history.push(`/players/view/${id}`)));
  }
  
  const handleChangeTeam = (playerId, id, dispatch, history) => {
    dispatch(actions.changePlayerToTeam(id, playerId, () => history.push(`/players/home/${id}`)));
    window.location.reload('true');
  }
  
  
  const handleAddLesionToPlayer = (playerId, lesionId, id, dispatch, history) => {
    dispatch(actionsLesion.addLesionToPlayer(playerId, lesionId, () => history.push(`/players/home/${id}`)));
  }

  const handleFindLesionByPlayer = (playerId, dispatch, history) => {
    dispatch(actionsLesion.findLesionByPlayer(playerId, () => history.push(`/lesion/home/player/${playerId}`)));
  }

  const handleFindNotesByPlayer = (playerId, id, dispatch, history) => {
    console.log("player(12) --> " + playerId);
    console.log("team(1) --> " + id);
    dispatch(actionsNotes.findNotesByPlayer(playerId, () => history.push(`/notes/home/${id}${playerId}`)));
  }

  const handleAddNewTrainingToPlayer = (playerId, trainingId, id, dispatch, history) => {
  dispatch(actionTrainings.addPlayerToTraining(playerId, trainingId, () => history.push(`/players/home/${id}`)));
}

const handleAddNewGameToPlayer = (playerId, gameId, id, dispatch, history) => {
  dispatch(actionGames.addPlayerToGame(playerId, gameId, () => history.push(`/players/home/${id}`)));
}

const handleFindStretchingsByPlayer = (playerId, dispatch, history) => {
  dispatch(actionStretchings.findStretchingsByPlayerId(playerId, () => history.push(`/stretchings/home/player/${playerId}`)));
}


const handleAddStretchingToPlayer = (playerId, stretchingId, id, dispatch, history) => {
  dispatch(actionStretchings.addStretchingToPlayer(playerId, stretchingId, () => history.push(`/players/home/${id}`)));
}


  function PlayersList({ items, stretchingsList, gamesList, trainingsList, lesionList, teamsList, id, playerName, primaryLastName, secondLastName, fallback, dispatch, history}) {
    if (!items || items.length === 0) {
        dispatch(actions.findPlayersByCompletedNameOfTeam(id, playerName, primaryLastName, secondLastName, () => history.push(`/players/completedName/result/${id}/${playerName.trim()}/${primaryLastName.trim()}/${secondLastName.trim()}`)));
    
        return fallback;
    } else {
        return items.map(item => {
          return <div className="images-teams" key={item.id}>
            
          <div class="">
            <div class="card hola playerjojo">
              <img src={avatar} alt="Person" class="card__image"></img>
              <p class="card__name">{item.playerName}</p>
              <div class="grid-container">
              </div>
              <ul class="social-icons">
                <li><a type="button" onClick={() => handleRemovePlayer(item.id, id, dispatch, history)}>
                <i class="fa fa-trash"></i></a></li>
                
                <li><a type="button" onClick={() => handleViewPlayer(item.id, id, dispatch, history)}>
                  <i class="fa fa-address-book"></i></a></li>
                <li><a type="button" onClick={() => handleUpdatePlayer(item.id, id, dispatch, history)}>
                  <i class="fa fa-wrench"></i></a></li>
                  {item.injured ?   
                      <i class="fa fa-wrench injured"></i>:  
                      ''}
              </ul>
              <button class="btn-player draw-border" onClick={() => history.push(`/notes/addNote/${item.id}`)}>Add Note</button>
              <div class="dropdown">
              <button class="btn-player draw-border">Add Lesion</button>
                <div class="dropdown-content">
                            {lesionList.map(lesion => 
                                        <a type="button" onClick={() => handleAddLesionToPlayer(item.id, lesion.id, id, dispatch, history)}> 
                                            {lesion.id} : {"  "}{lesion.lesionName}
                                        </a>)}
                  </div>
                  </div>

              <div class="dropdown">
              <button class="btn-player draw-border">Change Team</button>
                          <div class="dropdown-content">
                          {teamsList.map(team => 
                                      <a type="button" onClick={() => handleChangeTeam(item.id, team.id, dispatch, history)}> 
                                          {team.id} : {"  "}{team.teamName}
                                      </a>)}
                          </div>
              </div>
              <div class="dropdown">
                <button class="btn-player draw-border">Add Training</button>
                            <div class="dropdown-content">
                            {trainingsList.map(training => 
                                        <a type="button" onClick={() => handleAddNewTrainingToPlayer(item.id, training.id, id, dispatch, history)}> 
                                            {training.id} : {"  "}{training.objective}
                                        </a>)}
                            </div>
                </div>
                <div class="dropdown">
                <button class="btn-player draw-border">Add Game</button>
                            <div class="dropdown-content">
                            {gamesList.map(game => 
                                        <a type="button" onClick={() => handleAddNewGameToPlayer(item.id, game.id, id, dispatch, history)}> 
                                            {game.id} : {" Rival: "}{game.rival}
                                        </a>)}
                            </div>
                </div>
                <div class="dropdown">
                <button class="btn-player draw-border">Add Stretching</button>
                            <div class="dropdown-content">
                            {stretchingsList.map(stretching => 
                                        <a type="button" onClick={() => handleAddStretchingToPlayer(item.id, stretching.id, id, dispatch, history)}> 
                                            {stretching.id} : {" Rival: "}{stretching.stretchingName}
                                        </a>)}
                            </div>
                </div>
              <button class="btn-player draw-border" onClick={() => handleFindNotesByPlayer(item.id, id, dispatch, history)}>My Notes</button>
              <button class="btn-player draw-border" type="button" onClick={() => handleFindLesionByPlayer(item.id, dispatch, history)}>My Lesion</button>
              <button class="btn-player draw-border" type="button" onClick={() => handleFindTrainingsToPlayer(item.id, dispatch, history)}>My Trainings</button>
              <button class="btn-player draw-border" type="button" onClick={() => handleFindGamesToPlayer(item.id, id, dispatch, history)}>My Games</button>
              <button class="btn-player draw-border" type="button" onClick={() => handleFindStretchingsByPlayer(item.id, dispatch, history)}>My Stretchings</button>

            </div>
          </div>

        </div>;
      });
      }
}




const PlayersCompletedName =({players, id, playerName, primaryLastName, secondLastName}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const teams = useSelector(selectorsTeams.getAllTeams);
    const lesions = useSelector(selectorsLesion.getAllLesion);
    const trainings = useSelector(selectorsTrainings.getAllTrainings);
    const games = useSelector(selectorsGames.getAllGames);
    const stretchings = useSelector(selectorsStretchings.getAllStretchings);

    const stretchingsList = stretchings.stretchings;

    if(!stretchingsList) {
        dispatch(actionStretchings.findAllStretchings(() => history.push(`/players/home/${id}`)));
        return "Loading...";
    }
    
    const gamesList = games.games;

    if(!gamesList) {
        dispatch(actionGames.findGamesByTeamId(id, () => history.push(`/players/home/${id}`)));
        return "Loading...";
    }
    

    const trainingsList = trainings.trainings;

    if(!trainingsList) {
        dispatch(actionTrainings.findTrainingsByTeamId(id, () => history.push(`/players/home/${id}`)));
        return "Loading...";
    }

    const teamsList = teams.teams;

    if(!teamsList) {
        dispatch(actionsTeams.findAllTeams());
        return "Loading...";
    }

    const lesionList = lesions.lesions;

    if(!lesionList) {
        dispatch(actionsLesion.findAllLesion());
        return "Loading...";
    }

    return(
        <div className="card-group">
          <PlayersList items={players} stretchingsList={stretchingsList} gamesList={gamesList} trainingsList={trainingsList} lesionList={lesionList} teamsList={teamsList} id={id} playerName={playerName} primaryLastName={primaryLastName} secondLastName={secondLastName} fallback={"Loading..."} dispatch = {dispatch} history={history} />
        </div>
    )


};

PlayersCompletedName.propTypes = {
    PlayersCompletedName: PropTypes.array
};

export default PlayersCompletedName;
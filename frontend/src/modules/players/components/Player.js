import React from 'react';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import * as actions from '../actions';
import { useHistory } from 'react-router';
import avatar from '../../players/components/avatar.jpg';
import * as actionsTeams from '../../teams/actions';
import * as selectorsTeams from '../../teams/selectors';
import {FormattedMessage} from 'react-intl';
import * as actionsLesion from '../../lesion/actions';
import * as selectorsLesion from '../../lesion/selectors';
import * as actionTrainings from '../../trainings/actions';
import * as actionsNotes from '../../notes/actions';

const handleFindTrainingsToPlayer = (playerId, dispatch, history) => {
  dispatch(actionTrainings.findTrainingsByPlayerId(playerId, () => history.push('/trainings/home')));
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
    dispatch(actions.findPlayerByIdOfTeam(playerId, id, () => history.push(`/players/view/${id}${playerId}`)));
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

function PlayerByDni({player, lesionList, dni, teamsList, fallback, dispatch, history}) {
    if (!player) {
        dispatch(actions.findPlayerByDniOfTeam(player.teamId, dni,
            () => history.push(`/players/dni/result/${dni.trim()}`)
        ));
    
        return fallback;
    } else {
        return( <div className="images-teams" key={player.id}>

            <div class="">
              <div class="card hola">
                <img src={avatar} alt="Person" class="card__image"></img>
                <p class="card__name">{player.playerName}</p>
                <div class="grid-container">
                </div>
                <ul class="social-icons">
                  <li><a type="button" onClick={() => handleRemovePlayer(player.id, player.teamId, dispatch, history)}>
                  <i class="fa fa-trash"></i></a></li>
                  
                  <li><a type="button" onClick={() => handleViewPlayer(player.id, player.teamId, dispatch, history)}>
                    <i class="fa fa-address-book"></i></a></li>
                  <li><a type="button" onClick={() => handleUpdatePlayer(player.id, player.teamId, dispatch, history)}>
                    <i class="fa fa-wrench"></i></a></li>
                  <li><a href="#"><i class="fa fa-codepen"></i></a></li>
                </ul>
                <button class="btn-player draw-border">Add Note</button>
                <div class="dropdown">
                <button class="btn-player draw-border">Add Lesion</button>
                  <div class="dropdown-content">
                              {lesionList.map(lesion => 
                                          <a type="button" onClick={() => handleAddLesionToPlayer(player.id, lesion.id, player.teamId, dispatch, history)}> 
                                              {lesion.id} : {"  "}{lesion.lesionName}
                                          </a>)}
                    </div>
                    </div>                
                <div class="dropdown">
                <button class="btn-player draw-border">Change Team</button>
                            <div class="dropdown-content">
                            {teamsList.map(team => 
                                        <a type="button" onClick={() => handleChangeTeam(player.id, team.id, dispatch, history)}> 
                                            {team.id} : {"  "}{team.teamName}
                                        </a>)}
                            </div>
                </div>
                <button class="btn-player draw-border" onClick={() => handleFindNotesByPlayer(player.id, player.teamId, dispatch, history)}>My Notes</button>
                <button class="btn-player draw-border" type="button" onClick={() => handleFindLesionByPlayer(player.id, dispatch, history)}>My Lesion</button>
                <button class="btn-player draw-border" type="button" onClick={() => handleFindTrainingsToPlayer(player.id, dispatch, history)}>My Trainings</button>
              </div>
            </div>
            </div>
        );
      }
}



const Player = ({player, dni}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const teams = useSelector(selectorsTeams.getAllTeams);
    const lesions = useSelector(selectorsLesion.getAllLesion);

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
          <PlayerByDni player={player} lesionList={lesionList} dni={dni} teamsList={teamsList} fallback={"Loading..."} dispatch = {dispatch} history={history} />
        </div>
    )
}

export default Player;
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
import * as actionsLesion from '../../lesion/actions';
import * as selectorsLesion from '../../lesion/selectors';
//https://freefrontend.com/css-cards/

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

function PlayersList({ items, lesionList, teamsList, id, fallback, dispatch, history}) {
    if (!items || items.length === 0) {
        dispatch(actions.findAPlayersOfTeam(id, () => history.push(`/players/home/${id}`)));
    
        return fallback;
    } else {
        return items.map(item => {
          return <div className="images-teams" key={item.id}>
            
            <div class="">
              <div class="card hola">
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
                  <li><a href="#"><i class="fa fa-codepen"></i></a></li>
                </ul>
                <button class="btn-player draw-border">Notes</button>
                <div class="dropdown">
                <button class="btn-player draw-border">Lesion</button>
                  <div class="dropdown-content">
                              {lesionList.map(lesion => 
                                          <a type="button" onClick={() => handleAddLesionToPlayer(item.id, lesion.id, id, dispatch, history)}> 
                                              {lesion.id} : {"  "}{lesion.lesionName}
                                          </a>)}
                    </div>
                    </div>

                <div class="dropdown">
                <button class="btn-player draw-border">Team</button>
                            <div class="dropdown-content">
                            {teamsList.map(team => 
                                        <a type="button" onClick={() => handleChangeTeam(item.id, team.id, dispatch, history)}> 
                                            {team.id} : {"  "}{team.teamName}
                                        </a>)}
                            </div>
                        </div>

              </div>
            </div>

          </div>;
        });
      }
}

const Players = ({players, id}) => {
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
          <PlayersList items={players} lesionList={lesionList} teamsList={teamsList} id={id} fallback={"Loading..."} dispatch = {dispatch} history={history} />
        </div>
    )
};

Players.propTypes = {
    players: PropTypes.array
};


export default Players;




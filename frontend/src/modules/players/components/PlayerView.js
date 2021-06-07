import React from 'react';
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';

import * as actions from '../actions';
import * as actionsTeams from '../../teams/actions';
import * as selectors from '../selectors';
import {useParams} from 'react-router-dom';
import { useHistory } from 'react-router';
import avatar from '../../players/components/avatar.jpg';
import ballCancha from '../../players/components/ballCancha.jpg';
import libre from '../../players/components/libre.jpg';
import estira from '../../players/components/estira.gif';
import * as selectorsTeams from '../../teams/selectors';


const PlayerView = () => {
    const player = useSelector(selectors.getPlayer);
    const team = useSelector(selectorsTeams.getTeam);

    const {id, playerId} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    

    function PlayerViewFunction({player, dispatch}){
        if(player){

            if(!team) {
                dispatch(actionsTeams.findTeamById(id, () => history.push(`/players/view/${id}${playerId}`)));
                return(
                    <div className="spinner-border color-byTeamName" role="status">
                    <span className="visually-hidden">Loading...</span>
                    </div>        
                );
            }

            return (
                    <div class="card bg-dark text-white p-3" >
                        <div className="jijoneca">
                        <img className="holas  " src={avatar}/>

                        </div>

                        <div class="card-header text-center">Name: {player.playerName}</div>
                        <div class="card-body">
                            <p class="card-text">PrimaryLastName: </p>
                            <h5 class="card-title">{player.primaryLastName}</h5>

                        </div>
                        <div class="card-body">
                            <p class="card-text">SecondLastName: </p>
                            <h5 class="card-title">{player.secondLastName}</h5>
                            {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                        </div>
                        <div class="card-body">
                            <p class="card-text">Email: </p>
                            <h5 class="card-title">{player.email}</h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text">PhoneNumber: </p>
                            <h5 class="card-title">{player.phoneNumber}</h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text">Dni: </p>
                            <h5 class="card-title">{player.dni}</h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text">Position: </p>
                            <h5 class="card-title">{player.position}</h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text">Trends: </p>
                            <h5 class="card-title">{player.trends}</h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text">Team: </p>
                            <h5 class="card-title">{team.teamName}</h5>
                        </div>
                        <div class="card-footer bg-transparent border-success">Player</div>
                    </div>
            );


        }
        else{
            dispatch(actions.findPlayerByIdOfTeam(playerId, id, () => history.push(`/players/view/${id}${playerId}`)));
            dispatch(actionsTeams.findTeamById(id, () => history.push(`/players/view/${id}${playerId}`)));
            return(
                <div className="spinner-border color-byTeamName" role="status">
                <span className="visually-hidden">Loading...</span>
                </div>        
            );
        }
    }

    return(
        <div>
            <PlayerViewFunction player={player} dispatch={dispatch}/>
        </div>
    );
};

export default PlayerView;
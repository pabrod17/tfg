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
                    
                <div class="card-columns">


                    <div class="card bg-dark text-white p-3" >
                        <h2 class="card-header text-center">Statistics:</h2>
                        <div class="card-body">
                            <p class="card-text">Date: </p>
                            <h5 class="card-title">{player.primaryLastName}</h5>

                        </div>
                        <div class="card-body">
                            <p class="card-text">Rebounds: </p>
                            <h5 class="card-title"></h5>
                            {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                        </div>
                        <div class="card-body">
                            <p class="card-text">Total Rebounds: </p>
                            <h5 class="card-title"></h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text">Minutes: </p>
                            <h5 class="card-title"></h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text">Total Minutes: </p>
                            <h5 class="card-title"></h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text">Free Shots: </p>
                            <h5 class="card-title"></h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text">Total Free Shots: </p>
                            <h5 class="card-title"></h5>
                        </div>
                        <div class="card-body">
                            <p class="card-tdext">2 Point Shot: </p>
                            <h5 class="card-title"></h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text">Total 2 Point Shot: </p>
                            <h5 class="card-title"></h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text">3 Point Shot: </p>
                            <h5 class="card-title"></h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text">Total 3 Point Shot: </p>
                            <h5 class="card-title"></h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text">Assists: </p>
                            <h5 class="card-title"></h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text">Blocked Shot: </p>
                            <h5 class="card-title"></h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text">Technical Foul: </p>
                            <h5 class="card-title"></h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text">Total Technical Foul: </p>
                            <h5 class="card-title"></h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text">Personal Foul: </p>
                            <h5 class="card-title"></h5>
                        </div>
                            <div class="card-body">
                            <p class="card-text">Total Personal Foul: </p>
                            <h5 class="card-title"></h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text">Unsportsmanlike Foul: </p>
                            <h5 class="card-title"></h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text">Total Unsportsmanlike Foul: </p>
                            <h5 class="card-title"></h5>
                        </div>
                        <div class="card-footer bg-transparent border-success">Footer</div>
                    </div>





                    <div class="card bg-dark text-white " >
                        <img className="holas " src={avatar}/>
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
                        <div class="card-footer bg-transparent border-success">Footer</div>
                    </div>

                    <div class="card bg-dark text-white " >
                        <img className="second-hola" src={libre}/>
                        <h5 class="texto-encima">Training</h5>

                        <img className="second-hola" src={ballCancha}/>
                        <h5 class="texto-encima">Matches</h5>

                        <img className="second-hola" src={estira}/>
                        <h5 class="texto-encima">Stretching</h5>
                    </div>

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
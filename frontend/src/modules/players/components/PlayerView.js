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
    

    const handleClearTotalStatistics = (playerId, dispatch, history) => {
        dispatch(actions.clearTotalStatistics(playerId, () => history.push(`/players/view/${id}${playerId}`)));
        window.location.reload('true');
    }


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

            <div className="row">
                    <div class="card bg-dark text-white p-3" >

                        <div class="card-header text-center font-weight-bold">
                            <h1>Statistics</h1>
                            </div>
                        <div class="card-body">
                            <p class="card-text">Total Points: </p>
                            <h5 class="card-title">{player.totalPoints}</h5>

                        </div>
                        <div class="card-body">
                            <p class="card-text">Total Three Point Shots: </p>
                            <h5 class="card-title">{player.totalThreePointShots}</h5>
                            {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                        </div>
                        <div class="card-body">
                            <p class="card-text">Total Set Shots: </p>
                            <h5 class="card-title">{player.totalSetShots}</h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text">Total Free Shots: </p>
                            <h5 class="card-title">{player.totalFreeShots}</h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text">Total Fail Three Point Shots: </p>
                            <h5 class="card-title">{player.totalFailThreePointShots}</h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text">Total fail Set Shots: </p>
                            <h5 class="card-title">{player.totalfailSetShots}</h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text">Total fail Free Shots: </p>
                            <h5 class="card-title">{player.totalfailFreeShots}</h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text">Total Rebounds: </p>
                            <h5 class="card-title">{player.totalRebounds}</h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text">Total Blocked Shot: </p>
                            <h5 class="card-title">{player.totalBlockedShot}</h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text">Total Assists: </p>
                            <h5 class="card-title">{player.totalAssists}</h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text">Total Personal Fouls: </p>
                            <h5 class="card-title">{player.totalPersonalFouls}</h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text">Total Technical Fouls: </p>
                            <h5 class="card-title">{player.totalTechnicalFouls}</h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text">Total Unsportsmanlike Fouls: </p>
                            <h5 class="card-title">{player.totalUnsportsmanlikeFouls}</h5>
                        </div>
                        <div class="card-footer bg-transparent border-success">
                            <button type="button" onClick={() => handleClearTotalStatistics(player.id, dispatch, history)}>Clear</button>
                        </div>
                    </div>



                    <div class="card bg-dark text-white p-3 ml-5" >
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
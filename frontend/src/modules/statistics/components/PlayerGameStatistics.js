import React from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import * as actions from '../actions';
import { useHistory } from 'react-router';
import Card from "react-bootstrap/Card";
import avatar from '../../players/components/avatar.jpg';
import {FormattedMessage} from 'react-intl';
import lesionPierna from '../../lesion/components/lesionPierna.jpg';

const handleUpdatePlayerGameStatistics = (playerId, gameId, dispatch, history) => {
    dispatch(actions.findStatisticsByPlayerAndGame(playerId, gameId, () => history.push(`/statistics/playerGame/update/${playerId}${gameId}`)));
  }
  const handleRemovePlayerGameStatistics = (playerId, gameId, dispatch, history) => {
    dispatch(actions.removeStatisticsToPlayerOfGame(playerId, gameId, () => history.push(`/games/home`)));
    window.location.reload('true');
    }

function PlayerGameStatisticsFunction({playerGameStatistics, playerId, gameId, dispatch, history}){
    if(playerGameStatistics){

        return (
                

                <div class="card bg-dark text-white p-3" >
                    <h2 class="card-header text-center">Statistics:</h2>
                    <div class="card-body">
                        <h5 class="card-title">Total Points</h5>
                        <p class="card-text">{playerGameStatistics.totalPoints}</p>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Minutes</h5>
                        <p class="card-text">{playerGameStatistics.minutes}</p>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Three Point Shots</h5>
                        <p class="card-text">{playerGameStatistics.threePointShots}</p>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Set Shots</h5>
                        <p class="card-text">{playerGameStatistics.setShots}</p>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Free Shots</h5>
                        <p class="card-text">{playerGameStatistics.freeShots}</p>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Fail Three Point Shots</h5>
                        <p class="card-text">{playerGameStatistics.failThreePointShots}</p>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Fail Set Shots</h5>
                        <p class="card-text">{playerGameStatistics.failSetShots}</p>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Fail Free Shots</h5>
                        <p class="card-text">{playerGameStatistics.failFreeShots}</p>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Total Personal Fouls</h5>
                        <p class="card-text">{playerGameStatistics.totalPersonalFouls}</p>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Rebounds</h5>
                        <p class="card-text">{playerGameStatistics.rebounds}</p>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Blocked Shot</h5>
                        <p class="card-text">{playerGameStatistics.blockedShot}</p>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Assists</h5>
                        <p class="card-text">{playerGameStatistics.assists}</p>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Personal Fouls</h5>
                        <p class="card-text">{playerGameStatistics.personalFouls}</p>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Technical Fouls</h5>
                        <p class="card-text">{playerGameStatistics.technicalFouls}</p>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Unsportsmanlike Fouls</h5>
                        <p class="card-text">{playerGameStatistics.unsportsmanlikeFouls}</p>
                    </div>
                    

                    <div class="card-body">
                    <button className="btn-player draw-border" onClick={() => handleUpdatePlayerGameStatistics(playerId, gameId, dispatch, history)}>Update</button>
                    <a type="button" onClick={() => handleRemovePlayerGameStatistics(playerId, gameId, dispatch, history)}>
                  <i class="fa fa-trash"></i></a>
                    </div>
                </div>
        );
    }
    else{
        dispatch(actions.findStatisticsByPlayerAndGame(playerId, gameId, () => history.push(`/statistics/playerGame/${playerId}${gameId}`)));
        return(
            <div className="spinner-border color-byTeamName" role="status">
            <span className="visually-hidden">Loading...</span>
            </div>        
        );
    }
}














const PlayerGameStatistics = ({playerGameStatistics, playerId, gameId}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    return(
        <div className="card-group">
          <PlayerGameStatisticsFunction playerGameStatistics={playerGameStatistics} playerId={playerId} gameId={gameId} dispatch = {dispatch} history={history} />
        </div>
    )
}
export default PlayerGameStatistics;
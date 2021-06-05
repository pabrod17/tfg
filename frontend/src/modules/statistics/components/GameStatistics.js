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

const handleUpdateGameStatistics = (gameId, dispatch, history) => {
    dispatch(actions.findStatisticsByGame(gameId, () => history.push(`/statistics/game/update/${gameId}`)));
  }
  const handleRemoveGameStatistics = (gameId, dispatch, history) => {
    dispatch(actions.removeStatisticsToGame(gameId, () => history.push(`/games/home`)));
}

function GameStatisticsFunction({gameStatistics, gameId, dispatch, history}){
    if(gameStatistics){

        return (
                

                <div class="card bg-dark text-white p-3" >
                    <h2 class="card-header text-center">Statistics:</h2>
                    <div class="card-body">
                        <h5 class="card-title">Total Points</h5>
                        <p class="card-text">{gameStatistics.totalPoints}</p>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Duration Minutes</h5>
                        <p class="card-text">{gameStatistics.durationMinutes}</p>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Total Three Point Shots</h5>
                        <p class="card-text">{gameStatistics.totalThreePointShots}</p>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Total Set Shots</h5>
                        <p class="card-text">{gameStatistics.totalSetShots}</p>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Total Free Shots</h5>
                        <p class="card-text">{gameStatistics.totalFreeShots}</p>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Total Rebounds</h5>
                        <p class="card-text">{gameStatistics.totalRebounds}</p>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Total Blocked Shot</h5>
                        <p class="card-text">{gameStatistics.totalBlockedShot}</p>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Total Assists</h5>
                        <p class="card-text">{gameStatistics.totalAssists}</p>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Total Personal Fouls</h5>
                        <p class="card-text">{gameStatistics.totalPersonalFouls}</p>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Total Technical Fouls</h5>
                        <p class="card-text">{gameStatistics.totalTechnicalFouls}</p>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Total Unsportsmanlike Fouls</h5>
                        <p class="card-text">{gameStatistics.totalUnsportsmanlikeFouls}</p>
                    </div>






                    <div class="card-body">
                        <h5 class="card-title">Total Points Rival</h5>
                        <p class="card-text">{gameStatistics.totalPointsRival}</p>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Total Three Point Shots Rival</h5>
                        <p class="card-text">{gameStatistics.totalThreePointShotsRival}</p>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Total Set Shots Rival</h5>
                        <p class="card-text">{gameStatistics.totalSetShotsRival}</p>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Total Free Shots Rival</h5>
                        <p class="card-text">{gameStatistics.totalFreeShotsRival}</p>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Total Rebounds Rival</h5>
                        <p class="card-text">{gameStatistics.totalReboundsRival}</p>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Total Blocked Shots Rival</h5>
                        <p class="card-text">{gameStatistics.totalBlockedShotsRival}</p>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Total Assists Rival</h5>
                        <p class="card-text">{gameStatistics.totalAssistsRival}</p>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Total Personal Fouls Rival</h5>
                        <p class="card-text">{gameStatistics.totalPersonalFoulsRival}</p>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Total Technical Fouls Rival</h5>
                        <p class="card-text">{gameStatistics.totalTechnicalFoulsRival}</p>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Total Unsportsmanlike Fouls Rival</h5>
                        <p class="card-text">{gameStatistics.totalUnsportsmanlikeFoulsRival}</p>
                    </div>

                    <div class="card-body">
                    <button className="btn-player draw-border" onClick={() => handleUpdateGameStatistics(gameId, dispatch, history)}>Update</button>
                    <a type="button" onClick={() => handleRemoveGameStatistics(gameId, dispatch, history)}>
                  <i class="fa fa-trash"></i></a>
                    </div>
                </div>
        );
    }
    else{
        dispatch(actions.findStatisticsByGame(gameId, () => history.push(`/statistics/game/${gameId}`)));
        return(
            <div className="spinner-border color-byTeamName" role="status">
            <span className="visually-hidden">Loading...</span>
            </div>        
        );
    }
}


const GameStatistics = ({gameStatistics, gameId}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    return(
        <div className="card-group">
          <GameStatisticsFunction gameStatistics={gameStatistics} gameId={gameId} dispatch = {dispatch} history={history} />
        </div>
    )
}
export default GameStatistics;
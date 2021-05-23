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
import canchaAzul from '../../plays/components/canchaAzul.png';

const PlayView = () => {
    const play = useSelector(selectors.getPlay);
    const {playId} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();


    function PlayViewFunction({play, dispatch}){
        if(play){

            return (
                    
                <div class="">
                    <div class="card bg-dark text-white p-3" >
                        <div className="jijoneca">
                            <img className="canchazul  " src={canchaAzul}/>
                        </div>                        
                        <div class="card-header text-center">Name: {play.title}</div>
                        <div class="card-body">
                            <p class="card-text">Type: </p>
                            <h5 class="card-title">{play.playType}</h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text">Gesture: </p>
                            <h5 class="card-title">{play.gesture}</h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text">PointGuard Text: </p>
                            <h5 class="card-title">{play.pointGuardText}</h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text">ShootingGuard Text: </p>
                            <h5 class="card-title">{play.shootingGuardText}</h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text">SmallForward Text: </p>
                            <h5 class="card-title">{play.smallForwardText}</h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text">PowerForward Text: </p>
                            <h5 class="card-title">{play.powerForwardText}</h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text">Center Text: </p>
                            <h5 class="card-title">{play.centerText}</h5>
                        </div>
                        <div class="card-footer bg-transparent border-success">Play</div>
                    </div>
                </div>
            );


        }
        else{
            dispatch(actions.findPlayById(playId, () => history.push(`/plays/view/${playId}`)));
            return(
                <div className="spinner-border color-byTeamName" role="status">
                <span className="visually-hidden">Loading...</span>
                </div>        
            );
        }
    }


    return(
        <div>
            <PlayViewFunction play={play} dispatch={dispatch}/>
        </div>
    );
}

export default PlayView;
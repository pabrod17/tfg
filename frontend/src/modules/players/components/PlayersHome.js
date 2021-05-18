import React from 'react';
import {useSelector} from 'react-redux';
// import {useDispatch} from 'react-redux';
// import {FormattedMessage} from 'react-intl';
import {useHistory} from 'react-router-dom';
import * as actions from '../actions';
import {useDispatch} from 'react-redux';

import * as selectors from '../selectors';
import {useParams} from 'react-router-dom';
import Players from './Players';

const PlayersHome = () => {
    
    const players = useSelector(selectors.getAllPlayers);
    // const dispatch = useDispatch();
    const {id} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const pointGuard = "PointGuard";
    const shootingGuard = "ShootingGuard";
    const smallForward = "SmallForward";
    const powerForward = "PowerForward";
    const center = "Center";

    const handleSetPosition = (id, position, dispatch) => {
        dispatch(actions.findPlayersByPositionAndTeam(id, position));
    }


    return(
        <div>
            <div>
                <div className="btn-group white-space mx-auto">
                    <div class="btn-group mr-5 mb-5 " role="group" aria-label="First group">
                        <button className="btn addplayer" onClick={() => history.push(`/lesion/addLesion`)}>Add New Player</button>
                    </div>
                    <div class="btn-group mr-5 mb-5" role="group" aria-label="Fift group">
                        <div class="dropdown">
                            <button class="dropbtn lesion">Position 
                            <i class="fa fa-caret-down"></i>
                            </button>
                            <div class="dropdown-content lesion">
                            <a type="button" onClick={() => handleSetPosition(id, pointGuard, dispatch)}>PointGuard</a>
                            <a type="button" onClick={() => handleSetPosition(id, shootingGuard, dispatch)}>ShootingGuard</a>
                            <a type="button"  onClick={() => handleSetPosition(id, smallForward, dispatch)}>SmallForward</a>
                            <a type="button" onClick={() => handleSetPosition(id, powerForward, dispatch)}>PowerForward</a>
                            <a type="button" onClick={() => handleSetPosition(id, center, dispatch)}>Center </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Players players={players.players} id={id}/>
            </div>
        </div>

    );
}

export default PlayersHome;
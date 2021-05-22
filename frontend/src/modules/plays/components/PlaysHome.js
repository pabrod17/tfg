import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import * as actions from '../actions';
import {useDispatch} from 'react-redux';
import {FormattedMessage} from 'react-intl';

import * as selectors from '../selectors';
import {useParams} from 'react-router-dom';
import {Errors} from '../../common';
import Plays from './Plays';


const PlaysHome = () => {
    const {id} = useParams();
    const plays = useSelector(selectors.getPlays);
    const dispatch = useDispatch();
    const history = useHistory();

    const attack = "Attack";
    const defense = "Defense";

    const handleSetTypePlay = (id, playType, dispatch) => {
        dispatch(actions.findPlaysByTypeAndTeam(id, playType));
    }

    return(
        <div>
            <div>
                <div className="btn-group white-space mx-auto">
                    <div class="btn-group mr-5 mb-5 " role="group" aria-label="First group">
                        <button className="btn addplayer" onClick={() => history.push(`/plays/addPlay/${id}`)}>Add New Play</button>
                    </div>
                    <div class="btn-group mr-5 mb-5" role="group" aria-label="Fift group">
                        <div class="dropdown">
                            <button class="dropbtn lesion">Play Type
                            <i class="fa fa-caret-down"></i>
                            </button>
                            <div class="dropdown-content lesion">
                            <a type="button" onClick={() => handleSetTypePlay(attack, dispatch)}>Attack</a>
                            <a type="button" onClick={() => handleSetTypePlay(defense, dispatch)}>Defense</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Plays plays={plays.plays} id={id}/>
            </div>
        </div>

    );

}

export default PlaysHome;
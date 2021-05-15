import React from 'react';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {useHistory} from 'react-router-dom';

import * as selectors from '../selectors';
import {useParams} from 'react-router-dom';
import Players from './Players';

const PlayersHome = () => {
    
    const players = useSelector(selectors.getAllPlayers);
    const dispatch = useDispatch();
    const history = useHistory();
    const {id} = useParams();


    return(
        <div>
            <div>
                <div className="btn-group white-space mx-auto">
                    <div class="btn-group mr-5 mb-5 " role="group" aria-label="First group">
                        <button className="btn addplayer" onClick={() => history.push(`/players/addPlayer/${id}`)}>Add New Player</button>
                    </div>
                    <div class="btn-group mr-5 mb-5" role="group" aria-label="Second group">
                        <button className="button dni ">Dni</button>
                    </div>
                    <div class="btn-group mr-5 mb-5 btn" role="group" aria-label="Third group">
                        <button className="button dni">Name and Surnames</button>
                    </div>
                    <div class="btn-group mr-5 mb-5" role="group" aria-label="Fourth group">
                        <button className="button lesion">With lesion</button>
                    </div>
                    <div class="btn-group mr-5 mb-5" role="group" aria-label="Fift group">
                        <div class="dropdown">
                            <button class="dropbtn lesion">Lesion Type 
                            <i class="fa fa-caret-down"></i>
                            </button>
                            <div class="dropdown-content lesion">
                            <a type="button"  >Muscle</a>
                            <a type="button" >Tendon</a>
                            <a type="button"  >Joint</a>
                            <a type="button">Spine</a>
                            <a type="button">Psychological </a>
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
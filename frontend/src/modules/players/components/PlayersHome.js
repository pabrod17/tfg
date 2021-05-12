import React from 'react';
import {useSelector} from 'react-redux';

import * as selectors from '../selectors';
import {useParams} from 'react-router-dom';
import Players from './Players';

const PlayersHome = () => {
    
    const players = useSelector(selectors.getAllPlayers);
    const {id} = useParams();

    return(
        <div>
            <Players players={players.players} id={id}/>
        </div>
    );
}

export default PlayersHome;
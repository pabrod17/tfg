import React from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import * as actions from '../actions';
import {useDispatch} from 'react-redux';

import * as selectors from '../selectors';
import StretchingsByGame from './StretchingsByGame';
import {useParams} from 'react-router-dom';

const StretchingsHomeByGame = () => {

    const stretchings = useSelector(selectors.getAllStretchings);
    const dispatch = useDispatch();
    const history = useHistory();
    const {gameId} = useParams();

    const hamstrings = "Hamstrings";
    const buttocks = "Buttocks";
    const calf = "Calf";
    const adductors = "Adductors";
    const shoulder  = "Shoulder";
    const quadriceps = "Quadriceps";
    const back = "Back";
    const pectoral = "Pectoral";
    const crotch = "Crotch";
    const triceps  = "Triceps";


    return(
        <div>
            <div>
                <StretchingsByGame stretchings={stretchings.stretchings} gameId={gameId}/>
            </div>
        </div>
    );

}

export default StretchingsHomeByGame;
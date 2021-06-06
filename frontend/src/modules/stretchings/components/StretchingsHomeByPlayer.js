import React from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import * as actions from '../actions';
import {useDispatch} from 'react-redux';

import * as selectors from '../selectors';
import StretchingsByPlayer from './StretchingsByPlayer';
import {useParams} from 'react-router-dom';

const StretchingsHomeByPlayer = () => {

    const stretchings = useSelector(selectors.getAllStretchings);
    const dispatch = useDispatch();
    const history = useHistory();
    const {playerId} = useParams();

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
                <StretchingsByPlayer stretchings={stretchings.stretchings} playerId={playerId}/>
            </div>
        </div>
    );
}

export default StretchingsHomeByPlayer;
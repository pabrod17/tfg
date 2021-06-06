import React from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import * as actions from '../actions';
import {useDispatch} from 'react-redux';

import * as selectors from '../selectors';
import StretchingsByTraining from './StretchingsByTraining';
import {useParams} from 'react-router-dom';

const StretchingsHomeByTraining = () => {

    const stretchings = useSelector(selectors.getAllStretchings);
    const dispatch = useDispatch();
    const history = useHistory();
    const {trainingId} = useParams();

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
                <StretchingsByTraining stretchings={stretchings.stretchings} trainingId={trainingId}/>
            </div>
        </div>
    );
}

export default StretchingsHomeByTraining;
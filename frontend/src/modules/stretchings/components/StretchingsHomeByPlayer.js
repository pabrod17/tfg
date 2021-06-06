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

    const handleSetTypeStretching = (stretchingType, dispatch) => {
        dispatch(actions.findStretchingsByType(stretchingType));
    }

    return(
        <div>
            <div>
                <div className="btn-group white-space mx-auto">
                    <div class="btn-group mr-5 mb-5" role="group" aria-label="Fift group">
                        <div class="dropdown">
                            <button class="dropbtn lesion">Type Stretching 
                            <i class="fa fa-caret-down"></i>
                            </button>
                            <div class="dropdown-content lesion">
                            <a type="button" onClick={() => handleSetTypeStretching(hamstrings, dispatch)}>Hamstrings</a>
                            <a type="button" onClick={() => handleSetTypeStretching(buttocks, dispatch)}>Buttocks</a>
                            <a type="button"  onClick={() => handleSetTypeStretching(calf, dispatch)}>Calf</a>
                            <a type="button" onClick={() => handleSetTypeStretching(adductors, dispatch)}>Adductors</a>
                            <a type="button" onClick={() => handleSetTypeStretching(shoulder, dispatch)}>Shoulder</a>
                            <a type="button" onClick={() => handleSetTypeStretching(quadriceps, dispatch)}>Quadriceps</a>
                            <a type="button" onClick={() => handleSetTypeStretching(back, dispatch)}>Back</a>
                            <a type="button"  onClick={() => handleSetTypeStretching(pectoral, dispatch)}>Pectoral</a>
                            <a type="button" onClick={() => handleSetTypeStretching(crotch, dispatch)}>Crotch</a>
                            <a type="button" onClick={() => handleSetTypeStretching(triceps, dispatch)}>Triceps</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <StretchingsByPlayer stretchings={stretchings.stretchings} playerId={playerId}/>
            </div>
        </div>
    );
}

export default StretchingsHomeByPlayer;
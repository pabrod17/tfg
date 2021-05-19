import React from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import * as actions from '../actions';
import {useDispatch} from 'react-redux';

import * as selectors from '../selectors';
import Lesions from './Lesions';

const LesionHome = () => {

    const lesions = useSelector(selectors.getAllLesion);
    const dispatch = useDispatch();
    const history = useHistory();

    const muscle = "Muscle";
    const tendon = "Tendon";
    const joint = "Joint";
    const spine = "Spine";
    const psychological  = "Psychological";

    const handleSetTypeLesion = (lesionType, dispatch) => {
        dispatch(actions.findLesionByType(lesionType));
    }







    return(
        <div>
            <div>
                <div className="btn-group white-space mx-auto">
                    <div class="btn-group mr-5 mb-5 " role="group" aria-label="First group">
                        <button className="btn addplayer" onClick={() => history.push(`/lesion/addLesion`)}>Add New Lesion</button>
                    </div>
                    <div class="btn-group mr-5 mb-5" role="group" aria-label="Fift group">
                        <div class="dropdown">
                            <button class="dropbtn lesion">Type Lesion 
                            <i class="fa fa-caret-down"></i>
                            </button>
                            <div class="dropdown-content lesion">
                            <a type="button" onClick={() => handleSetTypeLesion(muscle, dispatch)}>Muscle</a>
                            <a type="button" onClick={() => handleSetTypeLesion(tendon, dispatch)}>Tendon</a>
                            <a type="button"  onClick={() => handleSetTypeLesion(joint, dispatch)}>Joint</a>
                            <a type="button" onClick={() => handleSetTypeLesion(spine, dispatch)}>Spine</a>
                            <a type="button" onClick={() => handleSetTypeLesion(psychological, dispatch)}>Psychological</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Lesions lesions={lesions.lesions}/>
            </div>
        </div>

    );

}

export default LesionHome;
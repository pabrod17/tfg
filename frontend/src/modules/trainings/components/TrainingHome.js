import React from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import * as actions from '../actions';
import {useDispatch} from 'react-redux';

import * as selectors from '../selectors';
import Trainings from './Trainings';

const TrainingHome = () => {

    const trainings = useSelector(selectors.getAllTrainings);
    const dispatch = useDispatch();
    const history = useHistory();

    return(
        <div>
            <div>
                <div className="btn-group white-space mx-auto">
                    <div class="btn-group mr-5 mb-5 " role="group" aria-label="First group">
                        <button className="btn addplayer" onClick={() => history.push(`/trainings/addTraining`)}>Add New Training</button>
                    </div>
                </div>
            </div>
            <div>
                <Trainings trainings={trainings.trainings}/>
            </div>
        </div>
    );
}

export default TrainingHome;
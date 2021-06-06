import React from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import * as actions from '../actions';
import { useHistory } from 'react-router';
import Card from "react-bootstrap/Card";
import avatar from '../../players/components/avatar.jpg';
import {FormattedMessage} from 'react-intl';
import lesionPierna from '../../lesion/components/lesionPierna.jpg';
import exercise from '../../app/components/exercise.jpg';

const handleRemoveExerciseToTraining = (id, trainingId, dispatch, history) => {
    dispatch(actions.removeExerciseToTraining(trainingId, id, () => history.push(`/exercises/home/training/${trainingId}`)));
    window.location.reload('true');
}

const handleUpdateExercise = (id, dispatch, history) => {
    dispatch(actions.findExerciseById(id, () => history.push(`/exercises/update/${id}`)));
}

const handleViewExercise = (id, dispatch, history) => {
    dispatch(actions.findExerciseById(id, () => history.push(`/exercises/view/${id}`)));
}

function ExercisesList({ items, trainingId, fallback, dispatch, history}) {
    if (!items || items.length === 0) {
        dispatch(actions.findExercisesByTrainingId(trainingId, () => history.push(`/exercises/home/training/${trainingId}`)));
        return fallback;
    } else {
        return items.map(item => {
          return <div className="images-teams" key={item.id}>
            
            <div class="">
              <div class="card hola pruebo">
                <img src={exercise} alt="Person" class="card__image lesionando"></img>
                <p class="card__name">{item.exerciseName}</p>
                <div class="grid-container">
                </div>
                <ul class="social-icons lesiongrande">
                <li><a type="button" onClick={() => handleRemoveExerciseToTraining(item.id, trainingId, dispatch, history)}>
                  <i class="fa fa-trash"></i></a></li>
                  
                  <li><a type="button" onClick={() => handleViewExercise(item.id, dispatch, history)}>
                    <i class="fa fa-address-book"></i></a></li>
                    <li><a type="button" onClick={() => handleUpdateExercise(item.id, dispatch, history)}>
                    <i class="fa fa-wrench"></i></a></li>
                  <li><a href="#"><i class="fa fa-codepen"></i></a></li>
                </ul>
                <button class="btn-player draw-border">{item.exerciseType}</button>
              </div>
            </div>
          </div>;
        });
      }
}

const ExercisesByTraining = ({exercises, trainingId}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    return(
        <div className="card-group">
          <ExercisesList items={exercises} trainingId={trainingId} fallback={"Loading..."} dispatch = {dispatch} history={history} />
        </div>
    )
};

export default ExercisesByTraining;
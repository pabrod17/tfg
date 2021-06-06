import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import * as actions from '../actions';
import * as selectors from '../selectors';
import {useParams} from 'react-router-dom';
import { useHistory } from 'react-router';
import avatar from '../../players/components/avatar.jpg';
import lesionPierna from '../../lesion/components/lesionPierna.jpg';

const ExerciseView = () => {
    const exercise = useSelector(selectors.getOneExercise);
    const {id} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    function ExerciseViewFunction({exercise, dispatch}){
        if(exercise){
            return (
                    <div class="card hola  text-center" >
                        <img className="holas" src={lesionPierna}/>
                        <div class="card-body">
                            <h5 class="card__name">{exercise.exerciseName}</h5>
                            <h5 class="card-title">Type: {exercise.exerciseType}</h5>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Objective</h5>
                            <p class="card-text">{exercise.objective}</p>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Description</h5>
                            <p class="card-text">{exercise.description}</p>
                        </div>
                        <div class="card-body">
                        </div>
                    </div>
            );
        }
        else{
            dispatch(actions.findExerciseById(id, () => history.push(`/exercises/view/${id}`)));
            return(
                <div className="spinner-border color-byTeamName" role="status">
                <span className="visually-hidden">Loading...</span>
                </div>        
            );
        }
    }

    return(
        <div>
            <ExerciseViewFunction exercise={exercise} dispatch={dispatch}/>
        </div>
    );
}

export default ExerciseView;
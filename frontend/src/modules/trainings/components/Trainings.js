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
import {FormattedDate} from 'react-intl';

const handleViewTraining = (id, dispatch, history) => {
    dispatch(actions.findTrainingById(id, () => history.push(`/trainings/view/${id}`)));
}

const handleRemoveTraining = (id, dispatch, history) => {
    dispatch(actions.removeTraining(id, () => history.push(`/trainings/home`)));
    window.location.reload('true');
}

const handleUpdateTraining = (id, dispatch, history) => {
    dispatch(actions.findTrainingById(id, () => history.push(`/trainings/update/${id}`)));
}

function TrainingsList({ items, fallback, dispatch, history}) {
    if (!items || items.length === 0) {
        dispatch(actions.findTrainingsByUserId(() => history.push('/trainings/home')));
        return fallback;
    } else {
        return items.map(item => {
          return <div className="images-teams" key={item.id}>
            
            <div class="">
              <div class="card hola pruebo">
                <img src={lesionPierna} alt="Person" class="card__image lesionando"></img>
                <p class="card__name">{item.objective}</p>
                <p class="card__name">                
                <FormattedDate
                    value={ item.trainingDate }
                    year="numeric"
                    month="long"
                    day="numeric"
                /> 
                </p>
                <div class="grid-container">
                </div>
                <ul class="social-icons lesiongrande">
                <li><a type="button" onClick={() => handleRemoveTraining(item.id, dispatch, history)}>
                  <i class="fa fa-trash"></i></a></li>
                  
                  <li><a type="button" onClick={() => handleViewTraining(item.id, dispatch, history)}>
                    <i class="fa fa-address-book"></i></a></li>
                    <li><a type="button" onClick={() => handleUpdateTraining(item.id, dispatch, history)}>
                    <i class="fa fa-wrench"></i></a></li>
                  <li><a href="#"><i class="fa fa-codepen"></i></a></li>
                </ul>
                <button class="btn-player draw-border">{item.description}</button>
              </div>
            </div>
          </div>;
        });
      }
}



const Trainings = ({trainings}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    
    return(
        <div className="card-group">
        <TrainingsList items={trainings} fallback={"Loading..."} dispatch = {dispatch} history={history} />
        </div>
    )
};

Trainings.propTypes = {
    trainings: PropTypes.array
};

export default Trainings;
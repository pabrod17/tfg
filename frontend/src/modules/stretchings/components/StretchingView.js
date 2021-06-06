import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import * as actions from '../actions';
import * as selectors from '../selectors';
import {useParams} from 'react-router-dom';
import { useHistory } from 'react-router';
import avatar from '../../players/components/avatar.jpg';
import lesionPierna from '../../lesion/components/lesionPierna.jpg';
import estiramientos from './estiramientos.jpg'; //1920x1200

const StretchingView = () => {

    const stretching = useSelector(selectors.getOneStretching);
    const {id} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();


    function StretchingViewFunction({stretching, dispatch}){
        if(stretching){
            return (
                    <div class="card hola  text-center" >
                        <img className="holas" src={estiramientos}/>
                        <div class="card-body">
                            <h5 class="card__name">{stretching.stretchingName}</h5>
                            <h5 class="card-title">Type: {stretching.stretchingType}</h5>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Description</h5>
                            <p class="card-text">{stretching.description}</p>
                        </div>
                        <div class="card-body">
                        </div>
                    </div>
            );
        }
        else{
            dispatch(actions.findStretchingById(id, () => history.push(`/stretchings/view/${id}`)));
            return(
                <div className="spinner-border color-byTeamName" role="status">
                <span className="visually-hidden">Loading...</span>
                </div>        
            );
        }
    }

    return(
        <div>
            <StretchingViewFunction stretching={stretching} dispatch={dispatch}/>
        </div>
    );
}

export default StretchingView;
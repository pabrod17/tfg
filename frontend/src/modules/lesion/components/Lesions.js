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

function LesionsList({ items, fallback, dispatch, history}) {
    if (!items || items.length === 0) {
        dispatch(actions.findAllLesion(() => history.push('/lesion/home')));
        return fallback;
    } else {
        return items.map(item => {
          return <div className="images-teams" key={item.id}>
            
            <div class="">
              <div class="card hola">
                <img src={lesionPierna} alt="Person" class="card__image"></img>
                <p class="card__name">{item.lesionName}</p>
                <div class="grid-container">
                </div>
                <ul class="social-icons">
                  <li><a type="button" >
                  <i class="fa fa-trash"></i></a></li>
                  
                  <li><a type="button" >
                    <i class="fa fa-address-book"></i></a></li>
                  <li><a type="button">
                    <i class="fa fa-wrench"></i></a></li>
                  <li><a href="#"><i class="fa fa-codepen"></i></a></li>
                </ul>
                <button class="btn-player draw-border">Notes</button>
                <button class="btn-player draw-border">Lesion</button>
              </div>
            </div>

          </div>;
        });
      }
}

const Lesions = ({lesions}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    
    return(
        <div className="card-group">
          <LesionsList items={lesions} fallback={"Loading..."} dispatch = {dispatch} history={history} />
        </div>
    )
};

Lesions.propTypes = {
    lesions: PropTypes.array
};

export default Lesions;
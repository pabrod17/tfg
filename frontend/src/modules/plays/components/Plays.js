import React from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import * as actions from '../actions';
import { useHistory } from 'react-router';
import Card from "react-bootstrap/Card";
import avatar from '../../players/components/avatar.jpg';
import {FormattedMessage} from 'react-intl';
import notaLapiz from '../../notes/components/notaLapiz.jpg';
import * as actionsPlayers from '../../players/actions';
import {FormattedDate} from 'react-intl';






function PlaysList({ items, id, fallback, dispatch, history}) {
    if (!items || items.length === 0) {
        dispatch(actions.findPlaysByTeamId(id, () => history.push(`/plays/home/${id}`)));
        return fallback;
    } else {
        return items.map(item => {
          return <div className="images-teams" key={item.id}>
            
            <div class="">
              <div class="card hola pruebo">
                <img src={notaLapiz} alt="Person" class="card__image"></img>
                <p class="card__name">{item.title}</p>
                <div class="grid-container">
                </div>
                <ul class="social-icons">
                <li><a type="button">
                  <i class="fa fa-trash"></i></a></li>
                  
                  <li><a type="button">
                    <i class="fa fa-address-book"></i></a></li>
                    <li><a type="button">
                    <i class="fa fa-wrench"></i></a></li>
                  <li><a href="#"><i class="fa fa-codepen"></i></a></li>
                </ul>
                <button class="btn-player draw-border">Player</button>
              </div>
            </div>
          </div>;
        });
      }
}





const Plays = ({plays, id}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    return(
        <div className="card-group">
          <PlaysList items={plays} id={id} fallback={"Loading..."} dispatch = {dispatch} history={history} />
        </div>
    )
}

Plays.propTypes = {
    plays: PropTypes.array
};

export default Plays;
import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import * as actions from '../actions';
import { useHistory } from 'react-router';

function List({ items, fallback, dispatch, history}) {
    if (!items || items.length === 0) {
        dispatch(actions.findAllTeams());

        return fallback;
    } else {
      return items.map(item => {
        return <a  key={item.id}>
                <ul className="menu">
                  <li>
                    <div className="encima">
                      <a  href="/" className=" color-byTeamName">
                        {"TEAM --> " + item.teamName}</a>
                    </div>
                    <div className="encima remove-team">
                        <button className="btn btn-primary" type="button" 
                          onClick={() => handleRemoveItem(item.id, dispatch, history)}>
                          <span className="fas fa-trash-alt"></span>
                        </button>
                    </div>
                    <div className="encima update-button">
                        <button className="btn btn-secondary" type="button" 
                          onClick={() => handleUpdateItem(item.id, dispatch, history)}>
                          <span className="fas fa-pencil-alt"></span>
                        </button>
                    </div>
                  </li>
                </ul>
              </a>;
      });
    }
  }

const handleRemoveItem = (id, dispatch, history) => {
  dispatch(actions.removeTeam(id, () => history.push('/teams/all/result')));
  window.location.reload('true');
}

const handleUpdateItem = (id, dispatch, history) => {
  dispatch(actions.findTeamById(id, () => history.push('/teams/update')));
}

const Teams = ({teams}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    return(
      <div>
                <List items={teams} fallback={"Loading..."} dispatch = {dispatch} history={history} />

      </div>
        )
    };

Teams.propTypes = {
    teams: PropTypes.array
};

export default Teams;
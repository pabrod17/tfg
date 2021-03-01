import React from 'react';
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../actions';
import logo22 from './logo22.png';

function List({ items, fallback, dispatch}) {
    if (!items || items.length === 0) {

        dispatch(actions.findAllTeams());

        return fallback;
    } else {
      return items.map(item => {
        return <a href="/" key={item.id}>
              <ul className="menu">
                 <li>
                   <a  className="encima">
                   {"TEAM --> " + item.teamName}</a>
                  </li>
              </ul>
              </a>;
      });
    }
  }

const Teams = ({teams}) => {
    const dispatch = useDispatch();
    return(
      <div>
                <List items={teams} fallback={"Loading..."} dispatch = {dispatch} />
      </div>
        )
    };

Teams.propTypes = {
    teams: PropTypes.array
};

export default Teams;
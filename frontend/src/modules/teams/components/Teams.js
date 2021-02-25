import React from 'react';
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../actions';

function List({ items, fallback, dispatch}) {
    if (!items || items.length === 0) {

        dispatch(actions.findAllTeams());

        return fallback;
    } else {
      return items.map(item => {
        return <div key={item.id}>{item.teamName}</div>;
      });
    }
  }

const Teams = ({teams}) => {
    const dispatch = useDispatch();
    return(
        <List items={teams} fallback={"Loading..."} dispatch = {dispatch} />
        )
    };

Teams.propTypes = {
    teams: PropTypes.array
};

export default Teams;